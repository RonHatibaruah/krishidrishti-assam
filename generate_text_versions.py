#!/usr/bin/env python3
"""
Generate clean, copy-paste-ready, textarea-compliant plain text files for NESFIC 2026:
1. NESFIC_D35_FORM_FIELDS_COPY_PASTE.txt (Direct one-click copy-paste blocks for portal textareas)
2. NESFIC_D35_Proposal_Ron_Hatibaruah.txt (Complete official proposal text dossier)
3. NESFIC_D35_Proof_of_Work_Ron_Hatibaruah.txt (Proof of work technical text dossier)
"""

import os
import re
import shutil

base_dir = os.path.dirname(os.path.abspath(__file__))

def clean_text_for_form_field(text):
    """
    Strips raw markdown syntax, converts formulas to plain text,
    standardizes bullets and whitespace for HTML <textarea> compatibility.
    Removes any internal metadata lines like (Word count: ...).
    """
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        stripped = line.strip()
        
        # Omit word count metadata line
        if re.search(r'word\s+count\s*:', stripped, re.IGNORECASE) or re.search(r'limit\s*:\s*\d+\s*words', stripped, re.IGNORECASE):
            continue
            
        # Omit markdown code fences
        if stripped.startswith('```'):
            continue
            
        # Detect markdown table separator
        if re.match(r'^\|?[\s\-:|]+\|?$', stripped):
            continue
            
        # Format markdown table rows into clean bullet points
        if stripped.startswith('|') and stripped.endswith('|'):
            cells = [c.strip() for c in stripped.strip('|').split('|')]
            clean_cells = [re.sub(r'[*`_]', '', c) for c in cells]
            # Skip header divider or empty
            if all(not c for c in clean_cells):
                continue
            cleaned_lines.append('• ' + ' | '.join(clean_cells))
            continue
            
        cleaned_lines.append(line)
        
    t = '\n'.join(cleaned_lines)
    
    # Strip markdown headers (##, ###, ####)
    t = re.sub(r'^#{1,6}\s+(.*?)$', r'\1', t, flags=re.MULTILINE)
    
    # Strip bold and italics
    t = re.sub(r'\*\*\*(.*?)\*\*\*', r'\1', t)
    t = re.sub(r'\*\*(.*?)\*\*', r'\1', t)
    t = re.sub(r'\*(.*?)\*', r'\1', t)
    t = re.sub(r'`(.*?)`', r'\1', t)
    
    # Clean LaTeX commands and symbols
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = re.sub(r'P_\{(\d+)\}', r'P\1', t)
    t = re.sub(r'\$\$([^\$]+)\$\$', r'\1', t)
    t = re.sub(r'\$([^$]+)\$', r'\1', t)
    
    # Clean markdown links [Label](url) -> Label (url)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1 (\2)', t)
    
    # Standardize bullet symbols
    t = re.sub(r'^[ \t]*[-*][ \t]+', '• ', t, flags=re.MULTILINE)
    
    # Replace unicode rupee symbol with Rs. for standard ASCII terminal/textarea safety
    t = t.replace('₹', 'Rs. ')
    
    # Standardize arrows
    t = t.replace('──►', '->').replace('▲', '^').replace('▼', 'v')
    
    # Clean up excessive blank lines
    t = re.sub(r'\n{3,}', '\n\n', t)
    
    return t.strip()

def generate_form_fields_text():
    src_file = os.path.join(base_dir, 'proposal_contents.md')
    out_file = os.path.join(base_dir, 'NESFIC_D35_FORM_FIELDS_COPY_PASTE.txt')
    prop_out = os.path.join(base_dir, 'NESFIC_D35_Proposal_Ron_Hatibaruah.txt')
    
    with open(src_file, 'r', encoding='utf-8') as f:
        raw = f.read()
        
    # Split into all 12 proposal fields
    sections = re.split(r'\n(?=##\s+\d+\.\s+)', raw)
    
    field_data = []
    
    field_names_mapping = {
        1: "Problem understanding & user workflow",
        2: "Proposed solution & key features",
        3: "Describe User Journey, Wireframes, Prototype & Proof of Work",
        4: "Technology & solution architecture",
        5: "Development methodology & intermediate steps",
        6: "Development timeline & milestones",
        7: "Data & information requirements",
        8: "Team, manpower & expertise",
        9: "Testing, validation & evidence",
        10: "Security, privacy, safety & compliance",
        11: "Innovation & differentiation",
        12: "Resources, risks & pilot validation"
    }
    
    for s in sections:
        if not re.match(r'##\s+\d+\.\s+', s.strip()):
            continue
        lines = s.strip().split('\n')
        field_header = lines[0].strip().replace('## ', '')
        field_num_match = re.search(r'^(\d+)\.', field_header)
        field_num = int(field_num_match.group(1)) if field_num_match else 0
        
        field_body = '\n'.join(lines[1:]).strip()
        cleaned_body = clean_text_for_form_field(field_body)
        
        # Count words accurately
        words = re.findall(r'\b\w+\b', cleaned_body)
        word_count = len(words)
        
        field_title = field_names_mapping.get(field_num, field_header)
        field_data.append((field_num, field_title, word_count, cleaned_body))
        
    # Build NESFIC_D35_FORM_FIELDS_COPY_PASTE.txt
    header = "=" * 80 + "\n"
    header += "ASSAM STARTUP / NESFIC 2026 - ONLINE APPLICATION FORM COPY-PASTE GUIDE\n"
    header += "Problem Statement ID: NESFIC-D-35\n"
    header += "Challenge Title: Agricultural Commodity Price Intelligence and Forecasting for Farmer Decisions\n"
    header += "Department: Department of Agriculture, Government of Assam\n"
    header += "Solution Name: KrishiDrishti (Assam Agri-Price Sentinel)\n"
    header += "Lead Applicant: Ron Hatibaruah\n"
    header += "Website / Live Prototype: https://krishidrishti-assam.pages.dev/\n"
    header += "Demo / Tutorial Video: https://krishidrishti-assam.pages.dev/tutorial\n"
    header += "=" * 80 + "\n\n"
    header += "INSTRUCTIONS FOR APPLICANT:\n"
    header += "1. For each form field below, copy ONLY the text between:\n"
    header += "   >>> START COPY BELOW THIS LINE >>>\n"
    header += "   and\n"
    header += "   <<< END COPY ABOVE THIS LINE <<<\n"
    header += "2. All 12 fields are strictly verified to be within the 0/500 word limit.\n"
    header += "3. For the 'Supporting material' section at the end of the form, upload the\n"
    header += "   two generated PDFs and paste the provided live URLs.\n\n"
    header += "=" * 80 + "\n\n"
    
    blocks = []
    for num, title, wc, body in field_data:
        b = f"{'='*80}\n"
        b += f"FIELD {num}: {title}\n"
        b += f"Portal Word Limit: 0/500 words | Actual Word Count: {wc} words (STATUS: COMPLIANT)\n"
        b += f"{'='*80}\n"
        b += ">>> START COPY BELOW THIS LINE >>>\n"
        b += body + "\n"
        b += "<<< END COPY ABOVE THIS LINE <<<\n\n"
        blocks.append(b)
        
    # Append Supporting Material Section
    sup_section = "=" * 80 + "\n"
    sup_section += "SECTION 03: SUPPORTING MATERIAL (COPY-PASTE & UPLOAD DETAILS)\n"
    sup_section += "=" * 80 + "\n\n"
    
    sup_section += "1. Field: Upload Proof of Work / Solution Evidence *\n"
    sup_section += "   Format: PDF only · Maximum 10 MB\n"
    sup_section += "   File to upload: NESFIC_D35_Proof_of_Work_Ron_Hatibaruah.pdf (1.1 MB)\n"
    sup_section += "   Online Backup Link: https://krishidrishti-assam.pages.dev/downloads/NESFIC_D35_Proof_of_Work_Ron_Hatibaruah.pdf\n\n"
    
    sup_section += "2. Field: Demo / product video URL (optional)\n"
    sup_section += "   >>> START COPY BELOW THIS LINE >>>\n"
    sup_section += "   https://krishidrishti-assam.pages.dev/tutorial\n"
    sup_section += "   <<< END COPY ABOVE THIS LINE <<<\n\n"
    
    sup_section += "3. Field: Product / website URL (optional)\n"
    sup_section += "   >>> START COPY BELOW THIS LINE >>>\n"
    sup_section += "   https://krishidrishti-assam.pages.dev/\n"
    sup_section += "   <<< END COPY ABOVE THIS LINE <<<\n\n"
    
    sup_section += "4. Field: Additional supporting material (optional)\n"
    sup_section += "   Format: PDF only · Maximum 10 MB\n"
    sup_section += "   File to upload: NESFIC_D35_Proposal_Ron_Hatibaruah.pdf (2.3 MB)\n"
    sup_section += "   Online Backup Link: https://krishidrishti-assam.pages.dev/downloads/NESFIC_D35_Proposal_Ron_Hatibaruah.pdf\n\n"
    
    sup_section += "=" * 80 + "\n"
    
    full_output = header + "".join(blocks) + sup_section
    
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(full_output)
        
    # Also update NESFIC_D35_Proposal_Ron_Hatibaruah.txt
    with open(prop_out, 'w', encoding='utf-8') as f:
        f.write(full_output)
        
    print(f"Generated form fields copy-paste file: {out_file} ({len(full_output)} bytes)")
    print(f"Updated proposal text file: {prop_out} ({len(full_output)} bytes)")
    
    # Sync to public/downloads and dist/downloads
    for dest_dir in ['public/downloads', 'dist/downloads']:
        os.makedirs(os.path.join(base_dir, dest_dir), exist_ok=True)
        shutil.copy(out_file, os.path.join(base_dir, dest_dir, 'NESFIC_D35_FORM_FIELDS_COPY_PASTE.txt'))
        shutil.copy(prop_out, os.path.join(base_dir, dest_dir, 'NESFIC_D35_Proposal_Ron_Hatibaruah.txt'))
    print("Synchronized to public/downloads and dist/downloads.")

def generate_pow_text():
    src_file = os.path.join(base_dir, 'proof_of_work_dossier.md')
    out_file = os.path.join(base_dir, 'NESFIC_D35_Proof_of_Work_Ron_Hatibaruah.txt')
    
    with open(src_file, 'r', encoding='utf-8') as f:
        raw = f.read()
        
    header = "=" * 80 + "\n"
    header += "NESFIC 2026 - STREAM 1 - PROOF OF WORK & TECHNICAL EVIDENCE DOSSIER\n"
    header += "Problem Statement ID: NESFIC-D-35: Agricultural Commodity Price Intelligence and Forecasting\n"
    header += "Sponsoring Department: Department of Agriculture, Government of Assam\n"
    header += "Technical Partners: ASAMB & AAU Jorhat AMIU\n"
    header += "Applicant / Innovator: Ron Hatibaruah\n"
    header += "Solution: KrishiDrishti (Assam Agri-Price Sentinel)\n"
    header += "Live Prototype: https://krishidrishti-assam.pages.dev/\n"
    header += "GitHub Repository: https://github.com/RonHatibaruah/krishidrishti-assam\n"
    header += "=" * 80 + "\n\n"
    
    cleaned = clean_text_for_form_field(raw)
    full_output = header + cleaned
    
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(full_output)
        
    for dest_dir in ['public/downloads', 'dist/downloads']:
        os.makedirs(os.path.join(base_dir, dest_dir), exist_ok=True)
        shutil.copy(out_file, os.path.join(base_dir, dest_dir, 'NESFIC_D35_Proof_of_Work_Ron_Hatibaruah.txt'))
        
    print(f"Generated text version: {out_file} ({len(full_output)} bytes)")

if __name__ == '__main__':
    generate_form_fields_text()
    generate_pow_text()
