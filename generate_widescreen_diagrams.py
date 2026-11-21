import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon
import numpy as np

os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
base_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(base_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# Clean White Blueprint Palette
BG_LIGHT = '#ffffff'
GRID_LIGHT = '#f1f5f9'
NAVY_HEADER = '#0f172a'
NAVY_TEXT = '#0f172a'
MUTED_TEXT = '#475569'
EMERALD_GREEN = '#059669'
TEAL_PRIMARY = '#0f766e'
ROYAL_BLUE = '#1d4ed8'
CYAN_ACCENT = '#0284c7'
AMBER_GOLD = '#d97706'
ROSE_RED = '#dc2626'
PURPLE_ACCENT = '#7c3aed'

def add_blueprint_grid(ax):
    for x in np.linspace(0, 1, 33):
        ax.axvline(x, color=GRID_LIGHT, linewidth=0.6, zorder=0)
    for y in np.linspace(0, 1, 19):
        ax.axhline(y, color=GRID_LIGHT, linewidth=0.6, zorder=0)

def add_header(ax, title, subtitle, tag="NESFIC-D-35 TECH FRAMEWORK"):
    banner = FancyBboxPatch((0.02, 0.895), 0.96, 0.085, boxstyle="round,pad=0.01,rounding_size=0.012",
                            facecolor=NAVY_HEADER, edgecolor='#1e293b', linewidth=1.5, zorder=2)
    ax.add_patch(banner)
    
    tag_bg = FancyBboxPatch((0.035, 0.92), 0.175, 0.035, boxstyle="round,pad=0.005,rounding_size=0.008",
                            facecolor='#065f46', edgecolor=EMERALD_GREEN, linewidth=1, zorder=3)
    ax.add_patch(tag_bg)
    ax.text(0.122, 0.937, tag, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#6ee7b7', zorder=4)
    
    ax.text(0.225, 0.942, title, fontsize=10.5, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.225, 0.914, subtitle, fontsize=8, color='#38bdf8', zorder=4)
    
    gov_badge = FancyBboxPatch((0.77, 0.92), 0.195, 0.035, boxstyle="round,pad=0.005,rounding_size=0.008",
                               facecolor='#1e293b', edgecolor='#334155', linewidth=1, zorder=3)
    ax.add_patch(gov_badge)
    ax.text(0.867, 0.937, "GOVT OF ASSAM • DEPT OF AGRICULTURE", ha='center', va='center', fontsize=7, fontweight='bold', color='#e2e8f0', zorder=4)

def save_dual(fig, basename, secondary_name=None):
    plt.tight_layout()
    png_path = os.path.join(out_dir, f"{basename}.png")
    jpg_path = os.path.join(out_dir, f"{basename}.jpg")
    plt.savefig(png_path, dpi=200, bbox_inches='tight')
    plt.savefig(jpg_path, dpi=200, bbox_inches='tight')
    if secondary_name:
        plt.savefig(os.path.join(out_dir, f"{secondary_name}.png"), dpi=200, bbox_inches='tight')
        plt.savefig(os.path.join(out_dir, f"{secondary_name}.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print(f"Rendered {basename}.png & .jpg (16:9 Widescreen)")

# DIAGRAM 1: Paradigm Shift: Distress Sales vs. KrishiDrishti AI Price Intelligence
def create_widescreen_diagram_1():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "PARADIGM SHIFT: TRANSFORMATION FROM DISTRESS LIQUIDATION TO AI PRICE INTELLIGENCE",
               "Department of Agriculture, Govt. of Assam • ASAMB & AAU Jorhat AMIU • NESFIC-D-35",
               "PARADIGM SHIFT FRAMEWORK")

    metrics = [
        ("ASSAM SMALLHOLDER BASE", "85%+ Farmers (<2 Ha)", '#0284c7'),
        ("HARVEST PRICE VOLATILITY", "40%–60% Crash in Gluts", '#dc2626'),
        ("FORECAST ACCURACY (MAPE)", "< 5.75% 7-Day Error", '#059669'),
        ("FARMGATE VALUE UPLIFT", "+18% to +26% Income", '#7c3aed')
    ]
    for idx, (label, val, col) in enumerate(metrics):
        x = 0.02 + idx * 0.245
        pill = FancyBboxPatch((x, 0.835), 0.23, 0.045, boxstyle="round,pad=0.005,rounding_size=0.008",
                              facecolor='#f8fafc', edgecolor=col, linewidth=1.2, zorder=2)
        ax.add_patch(pill)
        ax.text(x + 0.015, 0.862, label, fontsize=6.8, fontweight='bold', color=MUTED_TEXT, zorder=3)
        ax.text(x + 0.015, 0.843, val, fontsize=8, fontweight='bold', color=col, zorder=3)

    # LEFT COLUMN: Traditional Vulnerable Farmer Workflow
    box_left = FancyBboxPatch((0.02, 0.06), 0.47, 0.75, boxstyle="round,pad=0.015,rounding_size=0.015",
                              facecolor='#fff1f2', edgecolor='#fda4af', linewidth=1.5, zorder=2)
    ax.add_patch(box_left)
    ax.text(0.255, 0.785, "CURRENT AGRI-MARKET REALITY (ASYMMETRIC & REACTIVE)", ha='center', fontsize=10.5, fontweight='bold', color='#9f1239', zorder=3)
    ax.text(0.255, 0.760, "Severe Middleman Exploitation, Post-Harvest Gluts & Distress Sales Below Production Cost", ha='center', fontsize=7.5, color='#881337', zorder=3)

    left_steps = [
        ("1. Information Blackout at Village Assemblies", "Smallholders at local weekly hats have zero visibility into regional mandi wholesale prices, accepting predatory buyer bids.", '#be123c'),
        ("2. Peak Harvest Gluts & Price Collapse", "Synchronized harvesting causes severe localized over-supply; perishable vegetables and paddy crash up to 60% below MSP.", '#9f1239'),
        ("3. Sub-Optimal Local Selling vs. High Freight", "Farmers lack logistics calculations to determine if transporting produce 80 km to urban mandis (e.g. Guwahati) yields net profit.", '#be123c'),
        ("4. Urgent Cash Needs & Informal Debt Traps", "Without certified warehouse receipt financing, farmers cannot store crops and borrow from informal lenders at 36% annual interest.", '#9f1239')
    ]
    for i, (head, desc, col) in enumerate(left_steps):
        y = 0.63 - i * 0.165
        c = FancyBboxPatch((0.04, y), 0.43, 0.145, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor='#ffffff', edgecolor='#fecdd3', linewidth=1.2, zorder=3)
        ax.add_patch(c)
        ax.text(0.055, y + 0.11, head, fontsize=8.5, fontweight='bold', color=col, zorder=4)
        ax.text(0.055, y + 0.02, desc, fontsize=7.2, color=MUTED_TEXT, zorder=4, wrap=True)

    # RIGHT COLUMN: KrishiDrishti AI Framework
    box_right = FancyBboxPatch((0.51, 0.06), 0.47, 0.75, boxstyle="round,pad=0.015,rounding_size=0.015",
                               facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.5, zorder=2)
    ax.add_patch(box_right)
    ax.text(0.745, 0.785, "KRISHIDRISHTI AI ECOSYSTEM (PREDICTIVE & EMPOWERING)", ha='center', fontsize=10.5, fontweight='bold', color='#166534', zorder=3)
    ax.text(0.745, 0.760, "Multi-Horizon Deep Learning, Spatial Arbitrage Logistics & WhatsApp Delivery in Assamese", ha='center', fontsize=7.5, color='#14532d', zorder=3)

    right_steps = [
        ("1. Multi-Stream Mandi & Satellite Ingestion", "Continuous ETL ingestion of Agmarknet, e-NAM, ASAMB mandi records, IMD weather stations, and Sentinel-2 crop vegetation indices.", '#15803d'),
        ("2. Temporal Fusion Transformer (TFT) Core", "Multi-horizon sequence neural networks predict 7-day, 30-day, and 90-day wholesale price trajectories with 90% confidence bounds.", '#047857'),
        ("3. Dynamic 'Hold vs. Sell vs. Route' Sandbox", "Computes Net Realizable Value (NRV) factoring freight distance, mandi cess, and perishability shrinkage to maximize farmer profits.", '#15803d'),
        ("4. Zero-Friction Multilingual WhatsApp Delivery", "Automated bilingual alerts in Assamese (অসমীয়া) and English via WhatsApp, SMS, and IVRS directly connect farmers with e-NWR credit.", '#047857')
    ]
    for i, (head, desc, col) in enumerate(right_steps):
        y = 0.63 - i * 0.165
        c = FancyBboxPatch((0.53, y), 0.43, 0.145, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor='#ffffff', edgecolor='#bbf7d0', linewidth=1.2, zorder=3)
        ax.add_patch(c)
        ax.text(0.545, y + 0.11, head, fontsize=8.5, fontweight='bold', color=col, zorder=4)
        ax.text(0.545, y + 0.02, desc, fontsize=7.2, color=MUTED_TEXT, zorder=4, wrap=True)

    save_dual(fig, "diagram_1_before_after_workflow")

# DIAGRAM 2: End-to-End Enterprise System Architecture
def create_widescreen_diagram_2():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "KRISHIDRISHTI PLATFORM: END-TO-END SYSTEM ARCHITECTURE & ASDC BLUEPRINT",
               "Enterprise AI GovTech Stack Deployed within Assam State Data Centre • DPDP Act 2023 Compliant",
               "SYSTEM ARCHITECTURE BLUEPRINT")

    tiers = [
        ("1. EXTERNAL TELEMETRY & MULTI-STREAM INGESTION LAYER", 0.77, '#0284c7', [
            ("Agmarknet & e-NAM Mandis (Daily Prices & Volume Arrivals)", 0.04),
            ("ASAMB 65+ Regulated Mandis & Rural Weekly Haat Surveys", 0.28),
            ("IMD Automatic Weather Stations (Rainfall & Temperature)", 0.52),
            ("Copernicus Sentinel-2 NDVI 10m Imagery (Crop Phenology)", 0.76)
        ]),
        ("2. ASDC INGESTION, FEATURE STORE & POSTGIS SPATIAL DATABASE", 0.54, '#059669', [
            ("Apache Kafka Telemetry Queue & Ingestion Microservices", 0.04),
            ("PostgreSQL 16 + PostGIS 3.4 Spatial Mandi Database", 0.28),
            ("Feast Feature Store (Lagged Prices, Arrival Shock Signals)", 0.52),
            ("Redis 7.2 In-Memory Price Cache & Cluster Stream Router", 0.76)
        ]),
        ("3. CORE AI PREDICTION & FARMER DECISION ENGINE (PYTORCH)", 0.31, '#7c3aed', [
            ("Temporal Fusion Transformer (TFT) Multi-Horizon Predictor", 0.04),
            ("Quantile Regression Engine (P10 Downside, P50 Median, P90)", 0.28),
            ("Spatial Mandi Arbitrage & Net Realizable Value (NRV) Calc", 0.52),
            ("Cold Storage Preservation & e-NWR Collateral Optimizer", 0.76)
        ]),
        ("4. MULTILINGUAL DISSEMINATION & GOVERNANCE COCKPITS", 0.08, '#d97706', [
            ("Meta WhatsApp Business API Bot in Assamese (অসমীয়া) & English", 0.04),
            ("C-DAC Mobile SMS & Interactive Voice Response (IVRS) Gateway", 0.28),
            ("Statewide WebGIS Executive Dashboard (Directorate of Agri)", 0.52),
            ("FPO Bulk Consolidation Hub & SHA-256 Tamper-Proof Audit Log", 0.76)
        ])
    ]

    for title, y_base, col, items in tiers:
        hdr = FancyBboxPatch((0.02, y_base + 0.155), 0.96, 0.035, boxstyle="round,pad=0.005,rounding_size=0.006",
                             facecolor=col, edgecolor=col, linewidth=1, zorder=2)
        ax.add_patch(hdr)
        ax.text(0.035, y_base + 0.172, title, fontsize=8.5, fontweight='bold', color='#ffffff', zorder=3)

        cont = FancyBboxPatch((0.02, y_base), 0.96, 0.15, boxstyle="round,pad=0.01,rounding_size=0.01",
                              facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.2, zorder=1)
        ax.add_patch(cont)

        for text, x in items:
            c = FancyBboxPatch((x, y_base + 0.02), 0.20, 0.11, boxstyle="round,pad=0.008,rounding_size=0.008",
                               facecolor='#ffffff', edgecolor='#94a3b8', linewidth=1, zorder=2)
            ax.add_patch(c)
            ax.text(x + 0.015, y_base + 0.075, text, fontsize=7.2, fontweight='bold', color=NAVY_TEXT, zorder=3, wrap=True)

    save_dual(fig, "diagram_2_cadastral_reconciliation_flow", "diagram_2_enterprise_system_architecture")

# DIAGRAM 3: Multi-Horizon Temporal Fusion Transformer (TFT) Architecture
def create_widescreen_diagram_3():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "TEMPORAL FUSION TRANSFORMER (TFT) & QUANTILE UNCERTAINTY ARCHITECTURE",
               "Interpretable Multi-Horizon Deep Learning Model for Complex Agri-Commodity Volatility",
               "AI/ML MODEL ARCHITECTURE")

    tiers = [
        ("STATIC COVARIATES & MANDI METADATA", 0.04, '#06b6d4', '#e0f2fe', '#0369a1', [
            ("Mandi Location & Class", "District geo-coordinates, APMC regulated vs. rural haat status, terminal market status."),
            ("Crop Perishability Tier", "Highly perishable (tomato, cabbage) vs. semi-perishable (potato) vs. durable (paddy, mustard)."),
            ("Storage Infrastructure", "Distance to nearest cold storage or WDRA warehouse, licensed capacity index."),
            ("Role in Model", "Static Variable Selection Network (VSN) conditions temporal sequence encoders.")
        ]),
        ("DYNAMIC EXOGENOUS & TEMPORAL INPUTS", 0.36, '#f59e0b', '#fef3c7', '#b45309', [
            ("Observed Time Series", "Daily modal prices (t-30 to t), daily arrival volume, diesel fuel wholesale indices."),
            ("Known Future Features", "Bihu/Puja festival calendars, harvest calendar cycles, scheduled statutory MSP revisions."),
            ("Agro-Climatic Signals", "IMD cumulative rainfall anomalies, heatwave alerts, Brahmaputra flood warnings."),
            ("Earth Observation", "Copernicus Sentinel-2 district NDVI greenness index reflecting localized harvest timing.")
        ]),
        ("MULTI-HORIZON QUANTILE OUTPUTS", 0.68, '#a855f7', '#f3e8ff', '#6b21a8', [
            ("Quantile Floor (P10)", "Conservative worst-case price floor with 90% statistical safety margin for risk-averse farmers."),
            ("Median Forecast (P50)", "Most probable wholesale modal clearing rate across 7-day, 30-day, and 90-day horizons."),
            ("Upside Ceiling (P90)", "Projected price peak under localized harvest scarcity or export procurement demand."),
            ("Actionable Advisory", "Directly drives automated 'HOLD vs. SELL' recommendations with clear confidence bounds.")
        ])
    ]

    for title, x, border_col, bg_col, text_col, facts in tiers:
        box = FancyBboxPatch((x, 0.08), 0.28, 0.74, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor=bg_col, edgecolor=border_col, linewidth=2, zorder=2)
        ax.add_patch(box)

        t_bg = FancyBboxPatch((x + 0.015, 0.74), 0.25, 0.055, boxstyle="round,pad=0.005,rounding_size=0.008",
                              facecolor=border_col, edgecolor=border_col, linewidth=1, zorder=3)
        ax.add_patch(t_bg)
        ax.text(x + 0.14, 0.767, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#ffffff', zorder=4)

        for i, (label, desc) in enumerate(facts):
            y = 0.58 - i * 0.155
            card = FancyBboxPatch((x + 0.015, y), 0.25, 0.13, boxstyle="round,pad=0.008,rounding_size=0.008",
                                  facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=3)
            ax.add_patch(card)
            ax.text(x + 0.025, y + 0.10, label, fontsize=7.5, fontweight='bold', color=text_col, zorder=4)
            ax.text(x + 0.025, y + 0.02, desc, fontsize=6.8, color=MUTED_TEXT, zorder=4, wrap=True)

    save_dual(fig, "diagram_3_cadastral_anomaly_catalog", "diagram_3_ml_forecasting_pipeline")

# DIAGRAM 4: Spatial Mandi Arbitrage & Net Realizable Value Engine
def create_widescreen_diagram_4():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "SPATIAL MANDI ARBITRAGE & NET REALIZABLE VALUE (NRV) LOGISTICS ENGINE",
               "Inter-Mandi Price Difference Optimization Factoring Road Freight, Shrinkage & Mandi Fees",
               "MANDI ARBITRAGE ENGINE")

    # Formula Box
    f_box = FancyBboxPatch((0.02, 0.72), 0.96, 0.14, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor='#0f172a', edgecolor='#334155', linewidth=1.5, zorder=2)
    ax.add_patch(f_box)
    ax.text(0.5, 0.81, "NET REALIZABLE VALUE (NRV) ARBITRAGE FORMULATION", ha='center', fontsize=10, fontweight='bold', color='#38bdf8', zorder=3)
    ax.text(0.5, 0.75, "NRV(M_dest) = P_expected * (1 - δ_shrink * Δt) - [C_base + C_km * D + Toll] / Q - μ_cess * P_expected - C_handling",
            ha='center', fontsize=9, fontfamily='monospace', fontweight='bold', color='#ffffff', zorder=3)

    factors = [
        ("1. DESTINATION PRICE P_dest", "Forecasted wholesale rate at target terminal consumption mandi on arrival day.", '#0284c7'),
        ("2. TRANSIT SHRINKAGE δ_shrink", "Empirical weight loss per transit hour (0.15%/hr for greens, 0.05% tomatoes, 0.0% grains).", '#dc2626'),
        ("3. FREIGHT LOGISTICS C_km", "Distance-weighted freight rate per quintal for mini-trucks (Tata Ace) to 10-tonne carriers.", '#d97706'),
        ("4. APMC MANDI CESS μ_cess", "Statutory market committee user fee (typically 1.0% to 1.5% in Assam mandis).", '#7c3aed'),
        ("5. MINIMUM GAIN THRESHOLD", "Configurable risk premium (+₹50–₹100/q) required to recommend inter-mandi transport.", '#059669')
    ]

    for idx, (head, desc, col) in enumerate(factors):
        x = 0.02 + idx * 0.195
        card = FancyBboxPatch((x, 0.38), 0.18, 0.31, boxstyle="round,pad=0.01,rounding_size=0.01",
                              facecolor='#ffffff', edgecolor=col, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.015, 0.64, head, fontsize=7.2, fontweight='bold', color=col, zorder=3, wrap=True)
        ax.text(x + 0.015, 0.42, desc, fontsize=6.8, color=MUTED_TEXT, zorder=3, wrap=True)

    # Real World Example Case Study Below
    sm_box = FancyBboxPatch((0.02, 0.06), 0.96, 0.28, boxstyle="round,pad=0.01,rounding_size=0.01",
                            facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.2, zorder=2)
    ax.add_patch(sm_box)
    ax.text(0.04, 0.30, "VALIDATED CASE SCENARIO: KHARUPETIA TOMATO HARVEST DISPATCH", fontsize=9, fontweight='bold', color=NAVY_TEXT, zorder=3)

    routes = [
        ("LOCAL SALE AT KHARUPETIA (DARRANG)", "Wholesale Price: ₹600/q • Transit Cost: ₹0 • Shrinkage: 0% • NET PROCEEDS: ₹600/q (DISTRESS LOSS)", '#ef4444', 0.04),
        ("ROUTE TO GUWAHATI PAMOHI (85 KM)", "Wholesale Price: ₹1,450/q • Transit: ₹180/q • Shrink: ₹15/q • NET NRV: ₹1,215/q (+₹615/q NET PROFIT)", '#10b981', 0.36),
        ("ROUTE TO SILCHAR BARAK VALLEY (340 KM)", "Wholesale Price: ₹1,850/q • Transit: ₹520/q • Shrink: ₹90/q • NET NRV: ₹1,195/q (+₹595/q NET PROFIT)", '#0284c7', 0.68)
    ]
    for head, desc, col, x in routes:
        c = FancyBboxPatch((x, 0.09), 0.28, 0.18, boxstyle="round,pad=0.008,rounding_size=0.008",
                           facecolor='#ffffff', edgecolor=col, linewidth=1.2, zorder=3)
        ax.add_patch(c)
        ax.text(x + 0.015, 0.22, head, fontsize=7.5, fontweight='bold', color=col, zorder=4)
        ax.text(x + 0.015, 0.12, desc, fontsize=6.8, color=MUTED_TEXT, zorder=4, wrap=True)

    save_dual(fig, "diagram_4_blockchain_land_registry", "diagram_4_spatial_mandi_arbitrage")

# DIAGRAM 5: Multilingual Farmer Advisory Engine & Mobile/WhatsApp Interface
def create_widescreen_diagram_5():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "MULTILINGUAL FARMER ADVISORY ENGINE & WHATSAPP ZERO-FRICTION INTERFACE",
               "Automated Natural Language Advisories in Assamese and English via WhatsApp & IVRS",
               "FARMER INTERFACE BLUEPRINT")

    # Left Container: WhatsApp Conversational Flow
    wa_box = FancyBboxPatch((0.02, 0.06), 0.47, 0.81, boxstyle="round,pad=0.015,rounding_size=0.015",
                            facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.5, zorder=2)
    ax.add_patch(wa_box)
    ax.text(0.255, 0.84, "OFFICIAL WHATSAPP BUSINESS BOT (ASSAMESE / ENGLISH)", ha='center', fontsize=10, fontweight='bold', color='#166534', zorder=3)

    wa_messages = [
        ("Farmer (Assamese Voice/Text)", "\"Moi Darrang-ot 50q sarisoh ketiya bikri korim?\"\n(I have 50q mustard in Darrang. Should I sell now or hold?)", '#1e293b', '#ffffff', 0.69),
        ("KrishiDrishti AI Bot (Assamese / English)", "Namaskar Pranab Baruah! Kharupetia current rate: Rs 5,850/q.\nAI 12-Day Forecast: Rs 6,200/q (+Rs 350/q surge).\nAdvisory: HOLD produce! After warehouse rent (Rs 90), net gain is +Rs 260/q.", '#047857', '#dcfce7', 0.50),
        ("Farmer (One-Tap Action)", "[1] View Nearest Cold Storage   [2] Compare Guwahati Pamohi Price", '#1e293b', '#ffffff', 0.38),
        ("KrishiDrishti AI Bot (Logistics & Credit)", "Kharupetia Cold Store: 60% capacity vacant. Under e-NWR, you qualify for 75% instant collateral credit (Rs 2.18 Lakh) at 7% p.a. interest.", '#047857', '#dcfce7', 0.17)
    ]

    for sender, text, col, bg, y in wa_messages:
        b = FancyBboxPatch((0.04, y), 0.43, 0.14, boxstyle="round,pad=0.008,rounding_size=0.008",
                           facecolor=bg, edgecolor='#bbf7d0', linewidth=1, zorder=3)
        ax.add_patch(b)
        ax.text(0.055, y + 0.11, sender, fontsize=7.5, fontweight='bold', color=col, zorder=4)
        ax.text(0.055, y + 0.02, text, fontsize=6.8, color=NAVY_TEXT, zorder=4, wrap=True)

    # Right Container: Delivery Channels & Accessibility Tech
    ch_box = FancyBboxPatch((0.51, 0.06), 0.47, 0.81, boxstyle="round,pad=0.015,rounding_size=0.015",
                            facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.5, zorder=2)
    ax.add_patch(ch_box)
    ax.text(0.745, 0.84, "MULTI-CHANNEL ACCESSIBILITY ARCHITECTURE", ha='center', fontsize=10, fontweight='bold', color=NAVY_TEXT, zorder=3)

    channels = [
        ("1. WhatsApp Business API (Zero Install)", "Pre-integrated with Meta WhatsApp Cloud API. Farmers interact without downloading complex mobile apps, using familiar chat menus.", '#059669', 0.65),
        ("2. Automated Voice IVRS in Local Dialects", "Automated outbound calls in Assamese, Bengali, and Bodo translating forecasts into audio bulletins for non-literate farmers.", '#0284c7', 0.46),
        ("3. Telecom Bulk SMS Broadcast (C-DAC)", "Direct geo-targeted flash SMS dispatched to registered farmers across target revenue circles during harvest price surges.", '#d97706', 0.27),
        ("4. Responsive WebGIS Dashboard for FPOs", "Progressive Web App (PWA) with offline capabilities allowing FPO managers to model bulk shipments on low-bandwidth connectivity.", '#7c3aed', 0.08)
    ]
    for head, desc, col, y in channels:
        b = FancyBboxPatch((0.53, y), 0.43, 0.155, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor='#ffffff', edgecolor=col, linewidth=1.2, zorder=3)
        ax.add_patch(b)
        ax.text(0.545, y + 0.11, head, fontsize=8.5, fontweight='bold', color=col, zorder=4)
        ax.text(0.545, y + 0.02, desc, fontsize=7.2, color=MUTED_TEXT, zorder=4, wrap=True)

    save_dual(fig, "diagram_5_lat_mandal_mobile_app", "diagram_5_farmer_multilingual_app")

# DIAGRAM 6: Cold Storage Optimization & e-NWR Warehouse Economics
def create_widescreen_diagram_6():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "COLD STORAGE OPTIMIZATION & e-NWR COLLATERAL WAREHOUSE ECONOMICS",
               "Connecting Smallholder Farmers with Certified Storage & Subsidized Institutional Credit",
               "STORAGE & CREDIT BLUEPRINT")

    # Formula Box
    f_box = FancyBboxPatch((0.02, 0.72), 0.96, 0.14, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor='#0f172a', edgecolor='#334155', linewidth=1.5, zorder=2)
    ax.add_patch(f_box)
    ax.text(0.5, 0.81, "STORAGE RETURN ON INVESTMENT (ROI) FORMULATION", ha='center', fontsize=10, fontweight='bold', color='#38bdf8', zorder=3)
    ax.text(0.5, 0.75, "ΔΠ_storage(Δd) = [P_forecast(t+Δd) * (1 - λ_loss)] - P_harvest - (R_rent * Δd) - [P_harvest * (r_interest/365) * Δd]",
            ha='center', fontsize=9, fontfamily='monospace', fontweight='bold', color='#ffffff', zorder=3)

    pillars = [
        ("COLD STORAGE CAPACITY MAPPING", 0.04, '#0284c7', [
            ("Directory of 45+ cold storages & 180+ rural warehouses in Assam.", 0.58),
            ("Real-time occupancy tracking & chamber temperature sensors.", 0.44),
            ("Preservation longevity calculators based on moisture and grade.", 0.30)
        ]),
        ("e-NWR COLLATERAL FINANCING", 0.36, '#059669', [
            ("Digital link with WDRA-accredited electronic warehouse receipts.", 0.58),
            ("Instant credit line: Up to 75% of commodity market valuation.", 0.44),
            ("Subsidized 7% p.a. interest rate via Assam Gramin Vikash Bank (AGVB).", 0.30)
        ]),
        ("DECISION THRESHOLD STATE MACHINE", 0.68, '#7c3aed', [
            ("STORE RECOMMENDATION: If Net Storage ROI > +₹200/quintal.", 0.58),
            ("HOLD ON-FARM: If price recovery expected within 5 to 7 days.", 0.44),
            ("SELL IMMEDIATELY: If storage cost exceeds projected price delta.", 0.30)
        ])
    ]

    for title, x, col, bullets in pillars:
        hdr = FancyBboxPatch((x, 0.65), 0.28, 0.045, boxstyle="round,pad=0.005,rounding_size=0.008",
                             facecolor=col, edgecolor=col, linewidth=1, zorder=2)
        ax.add_patch(hdr)
        ax.text(x + 0.14, 0.672, title, ha='center', va='center', fontsize=8, fontweight='bold', color='#ffffff', zorder=3)

        box = FancyBboxPatch((x, 0.25), 0.28, 0.38, boxstyle="round,pad=0.01,rounding_size=0.01",
                             facecolor='#ffffff', edgecolor=col, linewidth=1.2, zorder=1)
        ax.add_patch(box)

        for text, y in bullets:
            c = FancyBboxPatch((x + 0.015, y), 0.25, 0.11, boxstyle="round,pad=0.008,rounding_size=0.008",
                               facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1, zorder=2)
            ax.add_patch(c)
            ax.text(x + 0.025, y + 0.065, text, fontsize=7.0, color=NAVY_TEXT, zorder=3, wrap=True)

    # Bottom impact strip
    imp_box = FancyBboxPatch((0.02, 0.06), 0.96, 0.16, boxstyle="round,pad=0.01,rounding_size=0.01",
                             facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.2, zorder=2)
    ax.add_patch(imp_box)
    ax.text(0.04, 0.17, "COMMODITY STORAGE DURATION & ROI MATRIX (EMPIRICAL ASSAM DATA)", fontsize=9, fontweight='bold', color='#166534', zorder=3)
    ax.text(0.04, 0.10, "• Mustard: Optimal hold 25-40 days (+₹320/q net)  • Paddy (Sali): Optimal hold 45-60 days (+₹280/q net)\n• Potato: Optimal cold store 60-90 days (+₹450/q net)  • Kaji Nemu: Controlled atmosphere 14-21 days (+₹180/q net)",
            fontsize=7.5, color='#14532d', zorder=3)

    save_dual(fig, "diagram_6_spatial_conflict_resolution", "diagram_6_fpo_storage_optimization")

# DIAGRAM 7: Phased 12-Month Implementation Roadmap & Milestone Budget Breakdown
def create_widescreen_diagram_7():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "PHASED 12-MONTH IMPLEMENTATION ROADMAP & ₹40.00 LAKH GRANT BUDGET",
               "Milestone-Driven Execution Aligned with Assam Startup NESFIC 2026 Deep-Tech Guidelines",
               "ROADMAP & BUDGET BLUEPRINT")

    quarters = [
        ("PHASE 1: INGESTION & MODELS (M1–M3)", 0.02, '#0284c7', [
            "ASDC cloud environment setup",
            "Agmarknet & e-NAM ETL pipelines",
            "Train baseline TFT & LSTM models",
            "Initial validation: MAPE < 7.5%"
        ]),
        ("PHASE 2: 5-DISTRICT PILOT (M4–M6)", 0.265, '#059669', [
            "Pilot in Darrang, Kamrup, Barpeta, Nagaon, Cachar",
            "Onboard 50 FPOs on WhatsApp Bot",
            "Calibrate local truck freight matrices",
            "Refine model accuracy: MAPE < 6.5%"
        ]),
        ("PHASE 3: STATE EXPANSION (M7–M9)", 0.51, '#7c3aed', [
            "Rollout to all 35 Assam districts",
            "Integrate 45+ cold storages & e-NWRs",
            "Onboard 250+ FPOs & 500k farmers",
            "Activate Directorate MSP Sentinel"
        ]),
        ("PHASE 4: HANDOVER & SCALE (M10–M12)", 0.755, '#d97706', [
            "Handover command consoles to ASAMB",
            "DAO/ADO administrative training",
            "CERT-In security VAPT & DPDP audit",
            "Establish multi-year state SaaS AMC"
        ])
    ]

    for title, x, col, bullets in quarters:
        hdr = FancyBboxPatch((x, 0.77), 0.23, 0.045, boxstyle="round,pad=0.005,rounding_size=0.008",
                             facecolor=col, edgecolor=col, linewidth=1, zorder=2)
        ax.add_patch(hdr)
        ax.text(x + 0.115, 0.792, title, ha='center', va='center', fontsize=7.2, fontweight='bold', color='#ffffff', zorder=3)

        box = FancyBboxPatch((x, 0.44), 0.23, 0.31, boxstyle="round,pad=0.01,rounding_size=0.01",
                             facecolor='#ffffff', edgecolor=col, linewidth=1.2, zorder=1)
        ax.add_patch(box)

        for i, b in enumerate(bullets):
            ax.text(x + 0.015, 0.70 - i * 0.08, f"• {b}", fontsize=7.0, color=NAVY_TEXT, zorder=3, wrap=True)

    # Bottom: Budget Breakdown (₹40 Lakh)
    b_box = FancyBboxPatch((0.02, 0.06), 0.96, 0.33, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor='#0f172a', edgecolor='#334155', linewidth=1.5, zorder=2)
    ax.add_patch(b_box)
    ax.text(0.04, 0.34, "GRANT BUDGET UTILIZATION BREAKDOWN (TOTAL: ₹40.00 LAKH - DEEP TECH TRACK)", fontsize=9.5, fontweight='bold', color='#38bdf8', zorder=3)

    budget_items = [
        ("Deep-Tech AI/ML & Core Engineering", "₹14.50 L", "36.25%", '#0284c7', 0.04),
        ("ASDC Compute & GPU Clusters (NVIDIA L4)", "₹6.50 L", "16.25%", '#7c3aed', 0.20),
        ("Mandi Surveys & 50-FPO Field Pilot", "₹5.50 L", "13.75%", '#059669', 0.36),
        ("WhatsApp API, SMS & Voice IVRS", "₹4.50 L", "11.25%", '#d97706', 0.52),
        ("Sentinel-2 NDVI & Ingestion APIs", "₹4.00 L", "10.00%", '#06b6d4', 0.68),
        ("Security Audit, DPDP & Contingency", "₹5.00 L", "12.50%", '#dc2626', 0.84)
    ]
    for name, amt, pct, col, x in budget_items:
        c = FancyBboxPatch((x, 0.10), 0.145, 0.21, boxstyle="round,pad=0.008,rounding_size=0.008",
                           facecolor='#1e293b', edgecolor=col, linewidth=1.2, zorder=3)
        ax.add_patch(c)
        ax.text(x + 0.012, 0.26, amt, fontsize=11, fontweight='bold', color=col, zorder=4)
        ax.text(x + 0.012, 0.22, f"Share: {pct}", fontsize=7.5, color='#94a3b8', zorder=4)
        ax.text(x + 0.012, 0.13, name, fontsize=7.0, color='#ffffff', zorder=4, wrap=True)

    save_dual(fig, "diagram_7_enterprise_system_architecture", "diagram_7_roadmap_and_budget")

if __name__ == '__main__':
    print("Generating High-Impact 16:9 Widescreen Infographics for NESFIC-D-35...")
    create_widescreen_diagram_1()
    create_widescreen_diagram_2()
    create_widescreen_diagram_3()
    create_widescreen_diagram_4()
    create_widescreen_diagram_5()
    create_widescreen_diagram_6()
    create_widescreen_diagram_7()
    print("All 7 16:9 infographics generated successfully!")
