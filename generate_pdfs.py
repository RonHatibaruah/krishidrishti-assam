import os
import re
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image
)
from reportlab.pdfgen import canvas

base_dir = os.path.dirname(os.path.abspath(__file__))
img_dir = os.path.join(base_dir, 'assets', 'proposal_images')

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages after page 1)
        if self._pageNumber > 1:
            self.drawString(54, letter[1] - 36, "Government of Assam • Department of Agriculture & ASAMB • NESFIC-D-35")
            self.drawRightString(letter[0] - 54, letter[1] - 36, "KrishiDrishti (Assam Agri-Price Sentinel) — Ron Hatibaruah")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "NESFIC 2026 Submission • Problem NESFIC-D-35 • Applicant: Ron Hatibaruah")
        self.drawRightString(letter[0] - 54, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def sanitize_to_reportlab_xml(text):
    if not text:
        return ""
    t = text.strip()

    # 1. Protect inline code spans: `...`
    code_matches = []
    def save_code(m):
        code_matches.append(m.group(1))
        return f"___CODE_MATCH_{len(code_matches)-1}___"
    t = re.sub(r'`([^`]+)`', save_code, t)

    # 2. Transliterate non-ASCII regional script for universal PDF viewer compatibility
    t = t.replace('(কৃষি-দৃষ্টি)', '(Krishi-Drishti)')
    t = t.replace('কৃষি-দৃষ্টি', 'Krishi-Drishti')
    t = t.replace('(অসমীয়া)', '(Assamese)')
    t = t.replace('অসমীয়া', 'Assamese')

    # 3. Replace Unicode Rupee symbol (not available in standard Type-1 Helvetica)
    t = t.replace('₹', 'Rs. ')

    # 4. Math symbols & variables
    t = re.sub(r'\$P_\{10\},\s*P_\{50\},\s*P_\{90\}\$', 'P10, P50, P90 (Quantile Cones)', t)
    t = re.sub(r'\$P_\{([0-9]+)\}\$', r'P\1', t)
    t = re.sub(r'\$NRV\$', 'NRV', t)
    t = re.sub(r'\$q\s*\\in\s*\\\{0\.10,\s*0\.50,\s*0\.90\\\}\$', 'q in {0.10, 0.50, 0.90}', t)
    t = re.sub(r'\$\\hat\{y\}\^\{\(([0-9.]+)\)\}\$', r'ŷ^(\1)', t)
    t = re.sub(r'\$M_\\text\{origin\}\$', 'M_origin', t)
    t = re.sub(r'\$M_\\text\{dest\}\$', 'M_dest', t)
    t = re.sub(r'\$\\Delta\s*d\$', 'Δd', t)
    t = re.sub(r'\$\\theta_\\text\{risk\\_premium\}\$', 'θ_risk_premium', t)
    t = re.sub(r'\$([^$]+)\$', r'\1', t)

    # 5. Tokenize HTML tags & Markdown formatting so escape() does not escape valid styling
    tokens = []
    def save_token(tag):
        tokens.append(tag)
        return f"___TAG_TOKEN_{len(tokens)-1}___"

    # Save existing valid tags
    t = re.sub(r'</?(?:b|i|u|font|sub|sup)(?:\s+[^>]*)?>', lambda m: save_token(m.group(0)), t, flags=re.IGNORECASE)

    # Convert markdown bold/italic into tokens
    t = re.sub(r'\*\*\*([^*]+)\*\*\*', lambda m: f"{save_token('<b>')}{save_token('<i>')}{m.group(1)}{save_token('</i>')}{save_token('</b>')}", t)
    t = re.sub(r'\*\*([^*]+)\*\*', lambda m: f"{save_token('<b>')}{m.group(1)}{save_token('</b>')}", t)
    t = re.sub(r'\*([^*]+)\*', lambda m: f"{save_token('<i>')}{m.group(1)}{save_token('</i>')}", t)

    # Convert markdown links into tokens
    def link_repl(m):
        label = m.group(1)
        return f"{save_token('<font color=\"#0284c7\">')}{save_token('<u>')}{label}{save_token('</u>')}{save_token('</font>')}"
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link_repl, t)

    # 6. Safely escape bare XML characters (&, <, >)
    t = escape(t)

    # 7. Restore tokens
    for idx, token in enumerate(tokens):
        t = t.replace(f"___TAG_TOKEN_{idx}___", token)

    # 8. Restore code placeholders
    for idx, c in enumerate(code_matches):
        c_esc = escape(c)
        t = t.replace(f"___CODE_MATCH_{idx}___", f'<font name="Courier" color="#0369a1"><b>{c_esc}</b></font>')

    return t

def safe_paragraph(text, style):
    cleaned = sanitize_to_reportlab_xml(text)
    try:
        return Paragraph(cleaned, style)
    except Exception:
        plain = re.sub(r'<[^>]+>', '', cleaned)
        return Paragraph(escape(plain), style)

def create_code_block(code_lines, available_width=490):
    styles = getSampleStyleSheet()
    code_style = ParagraphStyle(
        'CodeBlockText', parent=styles['Normal'], fontName='Courier', fontSize=6.5, leading=8.5,
        textColor=colors.HexColor('#0369a1'), spaceAfter=0
    )
    paras = []
    for cl in code_lines:
        cl_clean = cl.replace('₹', 'Rs. ')
        cl_esc = escape(cl_clean).replace(' ', '&nbsp;')
        paras.append(Paragraph(f'<font name="Courier">{cl_esc}</font>', code_style))

    t = Table([[paras]], colWidths=[available_width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#94a3b8')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    return [Spacer(1, 3), t, Spacer(1, 4)]

def create_math_block(math_text, available_width=490):
    styles = getSampleStyleSheet()
    mt = math_text.strip('$').strip()

    if 'Pinball Loss' in mt or r'\mathcal{L}_q(y, \hat{y}_q)' in mt:
        formatted = "L<sub>q</sub>(y, ŷ<sub>q</sub>) = max [ q · (y - ŷ<sub>q</sub>), (1 - q) · (ŷ<sub>q</sub> - y) ]"
    elif r'\mathcal{L}_{\text{total}}' in mt or 'L_total' in mt:
        formatted = "L<sub>total</sub> = (1 / NT) · ∑<sub>i=1..N</sub> ∑<sub>τ=1..T</sub> ∑<sub>q ∈ {0.1, 0.5, 0.9}</sub> L<sub>q</sub>( y<sub>i, t+τ</sub>, ŷ<sub>i, t+τ</sub><sup>(q)</sup> )"
    elif 'NRV(M_{\\text{dest}})' in mt or 'NRV(M_{dest})' in mt or 'NRV(M_dest)' in mt:
        formatted = "NRV(M<sub>dest</sub>) = P<sub>expected</sub>(M<sub>dest</sub>) · (1 - δ<sub>shrinkage</sub> · Δt) - [ (C<sub>base</sub> + C<sub>km</sub> · D + C<sub>toll</sub>) / Q ] - μ<sub>cess</sub> · P<sub>expected</sub>(M<sub>dest</sub>) - C<sub>handling</sub>"
    elif 'Price_{\\text{mandi}}' in mt or 'Price_{mandi}' in mt or 'Price_mandi' in mt:
        formatted = "NRV = Price<sub>mandi</sub> - Transport Cost - Mandi Cess - Transit Shrinkage"
    elif 'Recommend Route' in mt or r'\theta_{\text{risk\_premium}}' in mt or 'theta_risk_premium' in mt:
        formatted = "Recommend Route to M<sub>dest</sub> ⇔ NRV(M<sub>dest</sub>) > P(M<sub>origin</sub>) + θ<sub>risk_premium</sub>"
    elif r'\Delta \Pi_{\text{storage}}' in mt or 'Pi_storage' in mt:
        formatted = "ΔΠ<sub>storage</sub>(Δd) = [ P̂<sub>t+Δd</sub><sup>(0.50)</sup> · (1 - λ<sub>loss</sub>(Δd)) ] - P<sub>harvest</sub> - (R<sub>rent</sub> · Δd) - [ P<sub>harvest</sub> · (r<sub>interest</sub> / 365) · Δd ]"
    else:
        cleaned = mt
        cleaned = re.sub(r'\\text\{([^}]+)\}', r'\1', cleaned)
        cleaned = re.sub(r'\\hat\{([a-zA-Z])\}', r'\1̂', cleaned)
        cleaned = re.sub(r'\\cdot', '·', cleaned)
        cleaned = re.sub(r'\\Delta', 'Δ', cleaned)
        cleaned = re.sub(r'\\Pi', 'Π', cleaned)
        cleaned = re.sub(r'\\delta', 'δ', cleaned)
        cleaned = re.sub(r'\\mu', 'μ', cleaned)
        cleaned = re.sub(r'\\theta', 'θ', cleaned)
        cleaned = re.sub(r'\\lambda', 'λ', cleaned)
        cleaned = re.sub(r'\\tau', 'τ', cleaned)
        cleaned = re.sub(r'\\sum', '∑', cleaned)
        cleaned = re.sub(r'\\in', '∈', cleaned)
        cleaned = re.sub(r'\\iff', '⇔', cleaned)
        cleaned = re.sub(r'\\Big[()]', '', cleaned)
        cleaned = re.sub(r'\\left\[', '[', cleaned)
        cleaned = re.sub(r'\\right\]', ']', cleaned)
        cleaned = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', r'(\1 / \2)', cleaned)
        cleaned = re.sub(r'_\{([^}]+)\}', r'<sub>\1</sub>', cleaned)
        cleaned = re.sub(r'\^\{([^}]+)\}', r'<sup>\1</sup>', cleaned)
        cleaned = cleaned.replace('\\', '').replace('₹', 'Rs. ')
        formatted = cleaned

    math_style = ParagraphStyle(
        'MathCardText', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=12,
        textColor=colors.HexColor('#065f46'), alignment=1
    )

    t = Table([[Paragraph(formatted, math_style)]], colWidths=[available_width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    return [Spacer(1, 3), t, Spacer(1, 4)]

def create_figure_flowable(img_path, caption_text, width=490, height=275.6):
    styles = getSampleStyleSheet()
    caption_style = ParagraphStyle(
        'FigCaption', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=10,
        textColor=colors.HexColor('#065f46'), alignment=1, spaceBefore=3, spaceAfter=6
    )
    elements = []
    if os.path.exists(img_path):
        elements.append(Spacer(1, 4))
        elements.append(Image(img_path, width=width, height=height))
        clean_cap = caption_text.replace('₹', 'Rs. ')
        elements.append(safe_paragraph(f"<b>Figure:</b> {clean_cap}", caption_style))
        elements.append(Spacer(1, 4))
    return elements

def parse_markdown_content(lines, available_width=490):
    styles = getSampleStyleSheet()
    body_style = ParagraphStyle(
        'CustomBody', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11.5,
        textColor=colors.HexColor('#1e293b'), spaceAfter=4
    )
    bullet_style = ParagraphStyle(
        'CustomBullet', parent=body_style, leftIndent=12, bulletIndent=4, spaceAfter=2
    )
    bullet_sub_style = ParagraphStyle(
        'CustomBulletSub', parent=body_style, leftIndent=22, bulletIndent=12, spaceAfter=2
    )
    h2_style = ParagraphStyle(
        'CustomH2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=7, spaceAfter=3, keepWithNext=True
    )
    h3_style = ParagraphStyle(
        'CustomH3', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=9, leading=12,
        textColor=colors.HexColor('#065f46'), spaceBefore=5, spaceAfter=2, keepWithNext=True
    )
    h4_style = ParagraphStyle(
        'CustomH4', parent=styles['Heading4'], fontName='Helvetica-Bold', fontSize=8.5, leading=11,
        textColor=colors.HexColor('#0f766e'), spaceBefore=4, spaceAfter=2, keepWithNext=True
    )
    table_cell = ParagraphStyle(
        'TableCell', parent=styles['Normal'], fontName='Helvetica', fontSize=7, leading=9.5,
        textColor=colors.HexColor('#1e293b')
    )
    table_hdr = ParagraphStyle(
        'TableHdr', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=10,
        textColor=colors.white
    )

    flowables = []
    in_table = False
    table_rows = []

    in_code_block = False
    code_block_lines = []

    in_math_block = False
    math_block_lines = []

    for line in lines:
        stripped = line.strip()

        # 1. Code Block Handling (```)
        if stripped.startswith('```'):
            if in_code_block:
                flowables.extend(create_code_block(code_block_lines, available_width))
                in_code_block = False
                code_block_lines = []
            else:
                in_code_block = True
                code_block_lines = []
            continue

        if in_code_block:
            code_block_lines.append(line)
            continue

        # 2. Display Math Block Handling ($$...$$)
        if stripped.startswith('$$') and stripped.endswith('$$') and len(stripped) > 2:
            flowables.extend(create_math_block(stripped, available_width))
            continue
        elif stripped.startswith('$$'):
            if in_math_block:
                flowables.extend(create_math_block('\n'.join(math_block_lines), available_width))
                in_math_block = False
                math_block_lines = []
            else:
                in_math_block = True
                math_block_lines = []
            continue

        if in_math_block:
            if stripped.endswith('$$'):
                math_block_lines.append(stripped.rstrip('$$'))
                flowables.extend(create_math_block('\n'.join(math_block_lines), available_width))
                in_math_block = False
                math_block_lines = []
            else:
                math_block_lines.append(stripped)
            continue

        # 3. Table Handling (| ... |)
        if stripped.startswith('|') and stripped.endswith('|'):
            if re.match(r'^\|?[\s\-:|]+\|?$', stripped):
                continue
            cells = [c.strip() for c in stripped.strip('|').split('|')]
            if not in_table:
                in_table = True
                table_rows = [cells]
            else:
                table_rows.append(cells)
            continue
        else:
            if in_table:
                if table_rows:
                    num_cols = len(table_rows[0])
                    col_w = available_width / float(num_cols)
                    t_data = []
                    for r_idx, r in enumerate(table_rows):
                        row_cells = []
                        for c in r:
                            st = table_hdr if r_idx == 0 else table_cell
                            row_cells.append(safe_paragraph(c, st))
                        t_data.append(row_cells)

                    t = Table(t_data, colWidths=[col_w]*num_cols)
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#065f46')),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
                        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
                        ('TOPPADDING', (0,0), (-1,-1), 2.5),
                        ('LEFTPADDING', (0,0), (-1,-1), 3),
                        ('RIGHTPADDING', (0,0), (-1,-1), 3),
                        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')])
                    ]))
                    flowables.append(Spacer(1, 3))
                    flowables.append(t)
                    flowables.append(Spacer(1, 4))
                in_table = False
                table_rows = []

        if not stripped:
            continue

        # 4. Horizontal Rules
        if stripped == '---':
            flowables.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=4, spaceAfter=4))
            continue

        # 5. Clean Markdown Headings (prevent '#' rendering)
        if stripped.startswith('#### '):
            flowables.append(safe_paragraph(stripped[5:], h4_style))
        elif stripped.startswith('### '):
            flowables.append(safe_paragraph(stripped[4:], h3_style))
        elif stripped.startswith('## '):
            flowables.append(safe_paragraph(stripped[3:], h2_style))
        elif stripped.startswith('# '):
            flowables.append(safe_paragraph(stripped[2:], h2_style))

        # 6. List Items
        elif line.startswith('   - ') or line.startswith('   * ') or line.startswith('   • '):
            flowables.append(safe_paragraph(stripped[2:], bullet_sub_style))
        elif stripped.startswith('• ') or stripped.startswith('- ') or stripped.startswith('* '):
            flowables.append(safe_paragraph(stripped[2:], bullet_style))
        elif re.match(r'^\d+\.\s', stripped):
            flowables.append(safe_paragraph(stripped, bullet_style))

        # 7. Blockquotes
        elif stripped.startswith('> '):
            callout_style = ParagraphStyle(
                'Callout', parent=body_style, fontName='Helvetica-Oblique',
                textColor=colors.HexColor('#065f46'), leftIndent=12, rightIndent=12
            )
            flowables.append(safe_paragraph(stripped[2:], callout_style))
        else:
            flowables.append(safe_paragraph(stripped, body_style))

    # Flush leftover table if any
    if in_table and table_rows:
        num_cols = len(table_rows[0])
        col_w = available_width / float(num_cols)
        t_data = []
        for r_idx, r in enumerate(table_rows):
            row_cells = []
            for c in r:
                st = table_hdr if r_idx == 0 else table_cell
                row_cells.append(safe_paragraph(c, st))
            t_data.append(row_cells)
        t = Table(t_data, colWidths=[col_w]*num_cols)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#065f46')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')])
        ]))
        flowables.append(t)
        flowables.append(Spacer(1, 4))

    return flowables

def build_proposal_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=15, leading=19,
        textColor=colors.HexColor('#065f46'), alignment=0, spaceAfter=2
    )
    subtitle_style = ParagraphStyle(
        'DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    meta_style = ParagraphStyle(
        'MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155')
    )
    h2_style = ParagraphStyle(
        'H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=14.5,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )

    story = []
    story.append(safe_paragraph("NESFIC 2026 UNIFORM SOLUTION PROPOSAL (USPR)", title_style))
    story.append(safe_paragraph("<b>Proposed Solution Name:</b> KrishiDrishti (Assam Agri-Price Sentinel) — Agricultural Commodity Price Intelligence & Forecasting", subtitle_style))
    story.append(safe_paragraph("Official 7-Field Application Dossier for Stream 1 (Government Department Track)", subtitle_style))

    # Prominent Official Submission Metadata Box
    meta_data = [
        [safe_paragraph("<b>Proposed Solution Name:</b> KrishiDrishti (Assam Agri-Price Sentinel)", meta_style), 
         safe_paragraph("<b>Challenge ID:</b> NESFIC-D-35 (Govt Department Track)", meta_style)],
        [safe_paragraph("<b>Department:</b> Department of Agriculture, Govt. of Assam", meta_style), 
         safe_paragraph("<b>Technical Synergy:</b> ASAMB & AAU Jorhat AMIU", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), 
         safe_paragraph("<b>Format:</b> Uniform Solution Proposal (USPR PDF)", meta_style)],
        [safe_paragraph("<b>Live Prototype URL:</b> https://krishidrishti-assam.pages.dev/", meta_style), 
         safe_paragraph("<b>State Command Demo:</b> admin@agri.assam.gov.in / dispur2026", meta_style)],
        [safe_paragraph("<b>GitHub Repository:</b> https://github.com/RonHatibaruah/krishidrishti-assam", meta_style),
         safe_paragraph("<b>Target Jurisdiction:</b> All 35 Districts of Assam", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[245, 259])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    prop_md = os.path.join(base_dir, 'proposal_contents.md')
    with open(prop_md) as f:
        content = f.read()

    # Split strictly on '## Field X:' boundaries to keep internal ### and #### headings intact
    sections = re.split(r'\n(?=##\s+Field\s+\d+:)', content)

    # First section contains metadata; skip duplicate title and parse any intro text
    if sections and not sections[0].startswith('## Field'):
        intro_lines = [l for l in sections[0].strip().split('\n') if not l.startswith('# ')]
        if intro_lines:
            story.extend(parse_markdown_content(intro_lines, available_width=490))
        sections = sections[1:]

    for sec in sections:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip().lstrip('#').strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        # Strategic 16:9 Architectural Diagrams
        if 'Field 1:' in sec_title:
            img = os.path.join(img_dir, 'diagram_1_before_after_workflow.jpg')
            story.extend(create_figure_flowable(img, "Paradigm Shift: Status Quo Mandi Distress Sale vs. KrishiDrishti AI Sentinel Decision Architecture"))
        elif 'Field 2:' in sec_title:
            img = os.path.join(img_dir, 'diagram_3_ml_forecasting_pipeline.jpg')
            story.extend(create_figure_flowable(img, "Temporal Fusion Transformer (TFT) Multi-Horizon Machine Learning Architecture & Exogenous Feature Attention"))
        elif 'Field 3:' in sec_title:
            img = os.path.join(img_dir, 'diagram_4_spatial_mandi_arbitrage.jpg')
            story.extend(create_figure_flowable(img, "Statewide Spatial Mandi Arbitrage Network & Real-Time Net Realizable Value (NRV) Optimization Engine"))
        elif 'Field 4:' in sec_title:
            img = os.path.join(img_dir, 'diagram_6_fpo_storage_optimization.jpg')
            story.extend(create_figure_flowable(img, "Post-Harvest Cold Storage Economics, Breakeven Holding Dynamics & e-NWR Bank Financing Workflow"))
        elif 'Field 5:' in sec_title:
            img = os.path.join(img_dir, 'diagram_2_enterprise_system_architecture.jpg')
            story.extend(create_figure_flowable(img, "Production Enterprise GovTech Cloud Architecture, ASDC Tier-3 Deployment & Sovereign Data Integration"))
        elif 'Field 6:' in sec_title:
            img = os.path.join(img_dir, 'diagram_5_farmer_multilingual_app.jpg')
            story.extend(create_figure_flowable(img, "Last-Mile Grassroots Delivery: Multilingual WhatsApp Bot (Assamese/Bengali) & Voice IVR Interface for Smallholders"))
        elif 'Field 7:' in sec_title:
            img = os.path.join(img_dir, 'diagram_7_roadmap_and_budget.jpg')
            story.extend(create_figure_flowable(img, "Assam 35-District Phased Implementation Roadmap (24 Months) & Transparent Rs. 1.45 Cr Commercialization Budget"))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

def build_proof_of_work_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=15, leading=19,
        textColor=colors.HexColor('#065f46'), alignment=0, spaceAfter=2
    )
    subtitle_style = ParagraphStyle(
        'DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    meta_style = ParagraphStyle(
        'MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155')
    )
    h2_style = ParagraphStyle(
        'H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )

    story = []
    story.append(safe_paragraph("PROOF OF WORK & SOLUTION EVIDENCE DOSSIER", title_style))
    story.append(safe_paragraph("<b>Proposed Solution Name:</b> KrishiDrishti (Assam Agri-Price Sentinel) — AI Multi-Horizon Commodity Intelligence", subtitle_style))
    story.append(safe_paragraph("Empirical TFT Benchmarks, Spatial Mandi Arbitrage & Farmer Decision Protocols", subtitle_style))

    # Prominent Official Proof of Work Metadata Box
    meta_data = [
        [safe_paragraph("<b>Proposed Solution Name:</b> KrishiDrishti (Assam Agri-Price Sentinel)", meta_style), 
         safe_paragraph("<b>Challenge ID:</b> NESFIC-D-35 (Govt Department Track)", meta_style)],
        [safe_paragraph("<b>Department:</b> Department of Agriculture, Govt. of Assam", meta_style), 
         safe_paragraph("<b>Verification Status:</b> Fully Built & Empirically Benchmarked", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), 
         safe_paragraph("<b>Format:</b> Solution Evidence Dossier (PoW PDF)", meta_style)],
        [safe_paragraph("<b>Live Prototype URL:</b> https://krishidrishti-assam.pages.dev/", meta_style), 
         safe_paragraph("<b>State Command Demo:</b> admin@agri.assam.gov.in / dispur2026", meta_style)],
        [safe_paragraph("<b>GitHub Repository:</b> https://github.com/RonHatibaruah/krishidrishti-assam", meta_style),
         safe_paragraph("<b>Evaluation Target:</b> NESFIC 2026 Stream 1", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[245, 259])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    pow_md = os.path.join(base_dir, 'proof_of_work_dossier.md')
    with open(pow_md) as f:
        content = f.read()

    # Split strictly on '## X. ' section boundaries
    sections = re.split(r'\n(?=##\s+\d+\.\s+)', content)

    if sections and not re.match(r'##\s+\d+\.\s+', sections[0].strip()):
        intro_lines = [l for l in sections[0].strip().split('\n') if not l.startswith('# ')]
        if intro_lines:
            story.extend(parse_markdown_content(intro_lines, available_width=490))
        sections = sections[1:]

    for sec in sections:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip().lstrip('#').strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        # Real Live UI Prototype Screenshots & Empirical Evidence
        if '1. Executive Summary' in sec_title:
            img = os.path.join(img_dir, 'screenshot_live_executive.jpg')
            story.extend(create_figure_flowable(img, "Live Production Evidence: Statewide Agricultural Executive Command Center (Directorate of Agriculture & ASAMB)"))
        elif '2. Mathematical Formulations' in sec_title:
            img = os.path.join(img_dir, 'diagram_3_ml_forecasting_pipeline.jpg')
            story.extend(create_figure_flowable(img, "Algorithmic Architecture: Multi-Horizon Temporal Fusion Transformer (TFT) with Quantile Loss Attention Weights"))
        elif '3. Empirical Model Benchmarks' in sec_title:
            img = os.path.join(img_dir, 'screenshot_live_forecast.jpg')
            story.extend(create_figure_flowable(img, "Live Forecasting Console: Interactive Multi-Horizon Price Trajectories with 80% Probabilistic Quantile Bands"))
        elif '4. Real-World Field Case Studies' in sec_title:
            img = os.path.join(img_dir, 'screenshot_live_arbitrage.jpg')
            story.extend(create_figure_flowable(img, "Live Spatial Arbitrage Engine: Origin-Destination Net Realizable Value (NRV) Breakdown with Route Risk Alerts"))
        elif '5. System Architecture' in sec_title:
            img = os.path.join(img_dir, 'screenshot_live_map.jpg')
            story.extend(create_figure_flowable(img, "Live WebGIS Intelligence: High-Resolution Satellite Map (ESRI World Imagery) with 35km Catchment Buffers & NH Corridors"))
        elif '6. Security, Compliance' in sec_title:
            img = os.path.join(img_dir, 'screenshot_live_storage.jpg')
            story.extend(create_figure_flowable(img, "Live Infrastructure Hub: WDRA Cold Storage Capacity Tracking & Electronic Negotiable Warehouse Receipt (e-NWR) Calculator"))
        elif '7. Verification' in sec_title:
            img = os.path.join(img_dir, 'screenshot_live_advisory.jpg')
            story.extend(create_figure_flowable(img, "Live Grassroots Advisory: Multilingual WhatsApp & Voice Synthesizer Simulation in Assamese and Bengali"))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

if __name__ == '__main__':
    proposal_pdf = os.path.join(base_dir, 'NESFIC_D35_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(base_dir, 'NESFIC_D35_Proof_of_Work_Ron_Hatibaruah.pdf')

    build_proposal_pdf(proposal_pdf)
    build_proof_of_work_pdf(pow_pdf)
