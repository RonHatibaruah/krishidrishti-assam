# NESFIC-D-35 Official Proposal Submission Contents

**Problem Statement:** NESFIC-D-35 (Stream 1 — Government Track: Department of Agriculture) — *Agricultural Commodity Price Intelligence and Forecasting for Farmer Decisions*  
**Challenge Owners:** Department of Agriculture ● Government of Assam, in technical synergy with Assam State Agricultural Marketing Board (ASAMB) and Assam Agricultural University (AAU Jorhat – AMIU)  
**Applicant / Innovator:** Ron Hatibaruah  
**Application Platform:** Assam Startup Portal (NESFIC 2026)  
**Proposed Solution Name:** KrishiDrishti (কৃষি-দৃষ্টি) — Assam Agricultural Commodity Price Intelligence & Forecasting Sentinel  
**Live Working Prototype:** `https://krishidrishti-assam.pages.dev/` (Demo State Command: `admin@agri.assam.gov.in` / `dispur2026`)  
**GitHub Repository:** `https://github.com/RonHatibaruah/krishidrishti-assam`  
**Geographic Coverage (SEO & GEO):** Assam State (`IN-AS`, 26.1445° N, 91.7362° E, Dispur/Guwahati)  

---

## Field 1: Problem understanding & user workflow
*(Word Count: 462 words / Limit: 500 words)*

### Operational Context & Agrarian Vulnerability in Assam
Assam’s agrarian economy sustains over 70% of the state’s workforce, with smallholder and marginal farmers (<2 hectares) constituting over 85% of operational holdings. The state possesses immense agro-ecological diversity, cultivating critical staples (Sali, Boro, and indigenous aromatic Joha rice), oilseeds (Mustard/Rapeseed), fiber crops (Jute), and premium horticultural produce (GI-tagged Kaji Nemu, Karbi Anglong organic Ginger, Bhoot Jolokia, and the extensive winter vegetable belt of Kharupetia and Barpeta). 

Despite robust production, Assam’s farming community remains trapped in chronic economic precarity due to severe structural market failures:
1. **Hyper-Seasonal Price Crashes & Distress Sales:** During peak harvest windows, localized market arrivals surge dramatically. Perishable vegetables and harvested paddy flood local village assemblies (*hats*) without adequate storage or buyer aggregation, causing prices to collapse 40%–60% below the cost of production or statutory Minimum Support Prices (MSP).
2. **Asymmetric Market Visibility & Intermediary Dominance:** A fragmented supply chain dominated by multi-tiered middlemen (*Farias, Dalals, and commission agents*) exploits smallholders who lack real-time visibility into prevailing wholesale prices across regional APMC mandis (e.g., Pamohi/Guwahati, Howly, Kharupetia, Silchar, Jorhat).
3. **Absence of Actionable Multi-Horizon Predictive Guidance:** Farmers make critical operational choices without predictive intelligence:
   - **Tactical (7–15 Days):** Whether to liquidate produce immediately at farmgate or hold in local storage for a projected price rebound.
   - **Spatial Arbitrage (48–72 Hours):** Whether the price premium in an urban mandi (e.g., Pamohi) outweighs inter-district transport costs and transit shrinkage.
   - **Strategic (30–90 Days):** Evaluating the return on investment (ROI) of cold storage or WDRA warehouse pledges via electronic Negotiable Warehouse Receipts (e-NWR).
   - **Pre-Sowing (3–4 Months):** Sowing decisions dictated by backward-looking past prices rather than forward-looking crop-yield-demand projections.
4. **Linguistic and Digital Divide:** National market portals (Agmarknet, e-NAM) remain desktop-centric, data-dense, and disconnected from Assamese (অসমীয়া), Bengali, and Bodo speaking farmers who rely primarily on smartphones and voice communication.

### Current Workflow & Systemic Bottlenecks
Presently, market price collection is manual, intermittent, and fragmented across the Assam State Agricultural Marketing Board (ASAMB) and AAU Jorhat’s AMIU. Weekly market bulletins reach fewer than 2% of farming households in time. Consequently, farmers liquidate produce at the farmgate at distress rates, while urban consumers pay steep markups.

### Intended Users & Beneficiaries
• **Smallholder & Marginal Farmers:** Receive localized, bilingual WhatsApp/SMS price forecasts and "Hold vs. Sell" advisories.  
• **Farmer Producer Organizations (FPOs) & FPCs:** Optimize collective bulk transport, inter-mandi routing, and cold storage booking.  
• **Directorate of Agriculture & ASAMB:** Monitor statewide price deviations in real time, identify distress sale clusters, and deploy timely procurement interventions (Paddy MSP/MIS).  
• **Agri-Logistics & Warehouse Operators:** Match storage capacity with harvest arrival surges.

---

## Field 2: Proposed solution & key features
*(Word Count: 478 words / Limit: 500 words)*

### Proposed Solution Overview
**KrishiDrishti (কৃষি-দৃষ্টি — Assam Agri-Price Sentinel)** is an enterprise, AI-powered agricultural commodity price intelligence, forecasting, and farmer decision-support platform engineered specifically for the **Department of Agriculture, Government of Assam**, in synergy with ASAMB and AAU Jorhat. Operating securely within the Assam State Data Centre (ASDC), KrishiDrishti continuously ingests multi-stream market telemetry, weather patterns, and satellite crop phenology to deliver multi-horizon price projections and actionable decision tools for farmers and policymakers.

### Main Modules & Core Capabilities

1. **Multi-Source Market Telemetry & Satellite Fusion Pipeline:**
Directly interfaces with Agmarknet, e-NAM mandis, ASAMB market committees, and AAU Jorhat AMIU field reports. Fuses real-time market arrivals and price transactions with IMD weather station telemetry (rainfall anomalies, temperature) and Copernicus Sentinel-2 satellite vegetation indices (NDVI/EVI) to quantify harvest timing, yield volume spikes, and supply shocks.

2. **Hybrid Multi-Horizon AI/ML Forecasting Engine:**
Employs an advanced ensemble combining **Temporal Fusion Transformers (TFT)**, Bidirectional LSTMs, and exogenous-boosted gradient trees (XGBoost). The model incorporates attention mechanisms to capture seasonal oscillations, festival demand surges (Bihu, Durga Puja), and flood disruptions. It delivers multi-horizon predictions with rigorous quantile uncertainty bounds:
• **7-Day Tactical Forecast:** Day-to-day wholesale and retail price direction with 90% confidence bands ($P_{10}, P_{50}, P_{90}$).  
• **30-Day Storage Horizon:** Expected price recovery curves to evaluate warehouse holding profitability.  
• **90–120 Day Pre-Sowing Intelligence:** Forward crop profitability indices to guide acreage allocation.

3. **Interactive "Hold vs. Sell vs. Route" Arbitrage Sandbox:**
An intuitive decision tool allowing farmers or FPO managers to select their crop, harvest quantity, and origin district. The engine computes the **Net Realizable Value ($NRV$)** across all regional mandis:
$$NRV = \text{Price}_{\text{mandi}} - \text{Transport Cost} - \text{Mandi Cess} - \text{Transit Shrinkage}$$
Recommending whether to sell locally today, hold for 10 days in cold storage, or transport to a premium urban consumption center (e.g., Guwahati, Silchar).

4. **Cold Storage & e-NWR Warehouse Economics Optimizer:**
Digitally maps cold storage units, rural godowns, and WDRA-accredited warehouses across Assam. Calculates preservation longevity, electricity/rent costs, and connects farmers with electronic Negotiable Warehouse Receipts (e-NWR) for instant post-harvest credit lines up to 75% of crop value, eliminating urgent cash distress sales.

5. **Statewide Distress Sale Sentinel & MSP Procurement Radar:**
Empowers the Directorate of Agriculture with real-time geospatial heatmaps of market prices versus statutory MSP and benchmark production costs. Automatically triggers executive alert flags when wholesale prices breach downward safety thresholds in vulnerable districts (e.g., Darrang, Barpeta, Dhubri).

6. **CAP-Compliant Multilingual Farmer Advisory Engine:**
Dispatches automated, hyper-local, bilingual market alerts in **Assamese (অসমীয়া)**, Bengali, Bodo, and English via WhatsApp Business API, SMS, and automated IVRS voice calls. Alerts provide plain-language recommendations: *"Sell mustard now at ₹5,850/q or hold 12 days for projected ₹6,200/q (+₹350/q profit after storage)."*

---

## Field 3: Expected impact & measurable metrics
*(Word Count: 338 words / Limit: 350 words)*

### Transformative Socio-Economic Outcomes
KrishiDrishti shifts Assam’s agricultural paradigm from reactive post-harvest distress liquidation to proactive, data-driven market participation. By democratizing price intelligence, the platform directly increases smallholder household earnings and strengthens state food security.

### Quantitative Key Performance Indicators (KPIs)
1. **Farmgate Price Realization:** Projected **18% to 26% net increase** in average realized farmgate prices for participating smallholders and FPO members across focus commodities within 12 months of deployment.
2. **Mitigation of Distress Sales:** **35% reduction in distress sales** below MSP or baseline production cost during peak harvest gluts across major production clusters (Kharupetia, Howly, Nagaon, Darrang, Barpeta).
3. **Mandi Arbitrage Efficiency:** Enable FPOs to unlock **₹420 to ₹850 per quintal in additional net margins** by routing bulk consignments to high-demand secondary markets through optimized spatial arbitrage.
4. **Reduction in Post-Harvest Perishable Losses:** Divert 15,000+ metric tonnes of perishable horticultural produce (tomatoes, cabbage, kaji nemu) into timely cold storage or processing off-takes, reducing physical and economic post-harvest wastage by **22%**.
5. **e-NWR Warehouse Pledge Credit Adoption:** Facilitate over **₹15.0 Crore in institutional pledge financing** via e-NWRs, shielding marginal farmers from predatory informal moneylenders charging 3%–5% monthly interest.
6. **Platform Reach & Inclusivity:**
   - **Coverage:** All **35 districts of Assam**, monitoring 65+ regulated APMC mandis and major rural weekly primary markets (*hats*).
   - **Beneficiary Scale:** Direct advisory dissemination to **500,000+ registered farmers** and active onboard integration with **250+ Farmer Producer Organizations (FPOs/FPCs)** nurtured under APART and MOVCDNER.
   - **Forecast Accuracy:** Maintain statewide Mean Absolute Percentage Error (**MAPE**) under **6.5%** on 7-day tactical forecasts and under **9.2%** on 30-day storage horizons across top 12 commodities.
   - **Linguistic Engagement:** 100% bilingual availability in Assamese and English, with automated regional voice accessibility for non-literate cultivators.

---

## Field 4: Competitor analysis & differentiation
*(Word Count: 378 words / Limit: 400 words)*

### Landscape Analysis & Existing Alternatives
Current market information platforms available in India and Assam fall into three categories, all suffering critical limitations in the local context:

| Capability / Feature | Static Portals (Agmarknet / e-NAM) | Private Agri-Apps (DeHaat / AgroStar) | AMIU Weekly Bulletins (AAU Jorhat) | **KrishiDrishti (কৃষি-দৃষ্টি)** |
|---|---|---|---|---|
| **Primary Scope** | National historical price repository | Agronomy advice & input commerce | PDF bulletins on select state crops | **Dedicated Assam Multi-Horizon AI Price Forecasting** |
| **Forecasting Horizon** | None (Past reported prices only) | Basic rule-based price indicators | Qualitative trend outlook (static) | **Quantitative Multi-Horizon (7d / 30d / 90d) with P10-P90 bounds** |
| **Spatial Mandi Arbitrage** | No freight/arbitrage engine | Limited inter-state commerce | None | **Live Net Realizable Value ($NRV$) inter-mandi routing** |
| **Assam Crop Specificity** | Generic national crops only | Focus on mainland staples | High local focus, but static cadence | **Full coverage of Assam staples & GI crops (Kaji Nemu, Joha, Ginger)** |
| **Storage & Credit Linkage** | Disjointed links to WDRA | None | None | **Live cold storage vacancy + e-NWR loan eligibility calculator** |
| **Govt. Distress Radar** | No automated distress alerts | Commercial/proprietary | None | **ASAMB & Directorate MSP violation early-warning sentinel** |
| **Delivery Channels** | Complex desktop web tables | Mobile app download required | Periodic PDF / newspaper release | **Zero-install WhatsApp Bot, SMS, WebGIS & IVRS in Assamese** |
| **Data Sovereignty** | Centralized GOI servers | Private corporate cloud | University portal | **Assam State Data Centre (ASDC) hosted; DPDP Act compliant** |

### Core Differentiators of KrishiDrishti
1. **Purpose-Built for Assam Agro-Geomorphology:** Models unique regional market realities, including Brahmaputra riverine transport bottlenecks, monsoon ferry closures, and peak harvest gluts in floodplains.
2. **Actionable Decision Engine, Not Passive Data:** Instead of displaying raw tabular prices, KrishiDrishti computes the exact economic trade-off: *"Hold vs. Sell vs. Route"*, factoring in real-world truck freight rates and cold storage tariffs.
3. **Hyperlocal Language & Zero-Friction Delivery:** Bypasses app store friction by serving verified advisories directly through WhatsApp Business conversational workflows and voice IVRS in native Assamese (অসমীয়া), ensuring maximum smallholder adoption.

---

## Field 5: Technical feasibility, architecture & data sources
*(Word Count: 432 words / Limit: 450 words)*

### System Architecture & State Data Centre (ASDC) Deployment
KrishiDrishti is architected as an enterprise, containerized microservices platform designed for sovereign deployment within the **Assam State Data Centre (ASDC)** under Kubernetes (K8s) orchestration, ensuring strict compliance with the Digital Personal Data Protection (DPDP) Act 2023.

```
[Data Ingestion Bus] ──► [Feature Store & AI Core] ──► [Decision Engines] ──► [Dissemination Layer]
• Agmarknet / e-NAM       • Temporal Fusion Trans.     • Hold/Sell Sandbox     • WhatsApp Business API
• ASAMB Mandi Telemetry   • Bi-LSTM Seq-to-Seq         • Arbitrage Navigator   • SMS Gateway (CDAC)
• AAU Jorhat AMIU         • XGBoost Exogenous Trees    • e-NWR Storage Calc    • Interactive WebGIS
• IMD AWS & Copernicus    • Quantile Loss (P10-P90)    • MSP Distress Sentinel • Voice IVRS in Assamese
```

### Data Pipelines & Integration Sources
1. **Market Telemetry:** Real-time ETL connectors ingesting daily arrivals (metric tonnes) and modal/minimum/maximum prices from Agmarknet API, e-NAM, and ASAMB field mandis.
2. **Climate & Weather Inputs:** Gridded rainfall, humidity, and temperature forecasts from IMD Automatic Weather Stations (AWS) to anticipate supply delays and spoilage risks.
3. **Earth Observation Telemetry:** Automated ingestion of Copernicus Sentinel-2 multispectral imagery (10m resolution) computing district-level Normalized Difference Vegetation Index (NDVI) and Enhanced Vegetation Index (EVI) to estimate harvest timing and localized yield output surges 3–4 weeks before arrival.
4. **Logistics & Warehousing Indices:** State highway transit freight matrices, diesel price indices, and WDRA cold storage capacity/occupancy feeds.

### Machine Learning Core: Temporal Fusion Transformer (TFT)
The forecasting core utilizes Temporal Fusion Transformers—a state-of-the-art deep learning architecture specifically designed for multi-horizon time series with heterogeneous inputs:
• **Static Covariates:** Mandi location, soil zone, crop perishability tier, storage infrastructure index.  
• **Time-Varying Known Inputs:** Calendar seasonality, Bihu/Puja festival calendars, lunar planting cycles, scheduled MSP revisions.  
• **Time-Varying Observed Inputs:** Historical prices, daily arrival volumes, daily rainfall, wholesale fuel index.  
• **Quantile Loss Function:** Directly outputs predictive quantiles ($q \in \{0.10, 0.50, 0.90\}$) to provide risk-averse farmers with explicit safety margins rather than single deterministic point estimates.

### Performance, Scalability & Security Benchmarks
• **Inference Latency:** Sub-200ms model inference per query, supporting concurrent loads of 25,000+ transactions per minute.  
• **State Data Sovereignty:** Multi-tenant PostgreSQL 16 with PostGIS spatial indexing, encrypted at rest (AES-256) and in transit (TLS 1.3).  
• **Auditability:** Tamper-evident SHA-256 event logging for all administrative market intervention directives.

---

## Field 6: Implementation roadmap & milestones
*(Word Count: 334 words / Limit: 350 words)*

### 12-Month Phased Implementation Lifecycle
The project executes across four well-defined, milestone-governed phases designed for rapid prototyping, field validation, and statewide institutional scaling:

```
[M1-M3: Core Platform] ──► [M4-M6: Pilot & Validation] ──► [M7-M9: Statewide Rollout] ──► [M10-M12: Handover]
• Ingestion connectors     • 5 Target Districts Pilot      • 35 Districts Onboarding   • ASAMB Handover
• TFT/LSTM training        • 50 FPOs WhatsApp testing      • 250 FPOs integration      • Open API portal
• ASDC environment setup   • Calibration (MAPE < 6.5%)     • e-NWR banks live          • Long-term SLA
```

### Detailed Quarterly Milestones

#### Phase 1: Ingestion Infrastructure & Model Training (Months 1–3)
- Provision secure sovereign compute and storage environment at Assam State Data Centre (ASDC).
- Build automated ETL connectors for Agmarknet, e-NAM, ASAMB mandi records, and AAU Jorhat AMIU historical databases (10-year archive).
- Train and benchmark baseline TFT, Bi-LSTM, and XGBoost models on top 12 commodities across historical climate and price datasets.
- **Deliverable:** Working internal prediction API achieving baseline validation MAPE < 7.5%.

#### Phase 2: District Field Pilot & Decision Sandbox Validation (Months 4–6)
- Launch pilot deployment across 5 high-output agricultural districts: **Darrang (Kharupetia), Kamrup (Pamohi), Barpeta (Howly), Nagaon, and Cachar (Silchar)**.
- Deploy bilingual WhatsApp Bot and web decision sandbox to 50 partner FPOs (15,000 farmers).
- Fine-tune spatial arbitrage matrix with verified local mini-truck freight rates and cold storage tariffs.
- **Deliverable:** Pilot Evaluation Report certified by ASAMB/AAU Jorhat with farmer satisfaction index > 85%.

#### Phase 3: Statewide Expansion & Financial Linkages (Months 7–9)
- Scale platform to all **35 districts of Assam**, monitoring 65+ mandis and 250+ FPOs.
- Integrate cold storage directory and establish API linkages with WDRA-accredited warehouses and regional rural banks (AGVB) for e-NWR pledge loans.
- Activate the Directorate of Agriculture Executive Distress Sale Sentinel.
- **Deliverable:** Statewide live production system handling 50,000+ daily farmer queries.

#### Phase 4: Institutional Institutionalization & Policy Integration (Months 10–12)
- Formal handover of administrative command consoles to Department of Agriculture and ASAMB personnel.
- Conduct training workshops for District Agricultural Officers (DAOs) and Agriculture Development Officers (ADOs).
- Publish Open API documentation for state agritech startup integrations.
- **Deliverable:** Final Comprehensive Audit, ISO 27001 / DPDP certification, and SLA operationalization.

---

## Field 7: Commercialization, budget & sustainability
*(Word Count: 288 words / Limit: 300 words)*

### Detailed ₹40.00 Lakh Deep-Tech Grant Budget Breakdown
The requested grant of **₹40.00 Lakh** directly funds the deep-tech development, sovereign cloud deployment, and field validation of KrishiDrishti over 12 months:

| Budget Head / Line Item | Allocation (₹ Lakh) | Justification & Specific Expenditures |
|---|---|---|
| **Deep-Tech AI/ML & Core Software Engineering** | **₹14.50 Lakh** | Lead ML Engineer (TFT/Transformer pipelines, quantile regression), Senior Full-Stack WebGIS Engineer, and Backend Microservices Developer for 12 months. |
| **High-Performance Compute & ASDC Infrastructure** | **₹6.50 Lakh** | Dedicated GPU server leasing (NVIDIA A100/L4 instances for model training & batch inference), ASDC staging cluster setup, PostGIS server instances, and security hardening. |
| **Data Licensing, Satellite Imagery & Ingestion APIs** | **₹4.00 Lakh** | High-resolution satellite data processing (Sentinel-2/CartoDEM), Agmarknet/e-NAM gateway integrations, IMD gridded weather telemetry pipelines. |
| **Field Validation, Mandi Surveys & FPO Onboarding** | **₹5.50 Lakh** | Ground-truthing across 65+ mandis, local transport freight rate calibration, onboarding workshops for 50 pilot FPOs in Darrang, Barpeta, Nagaon, Kamrup, and Cachar. |
| **Multilingual WhatsApp API, SMS & Voice IVRS Gateway** | **₹4.50 Lakh** | Official Meta WhatsApp Business API volume messaging credits, telecom SMS gateway bundles, and Assamese/Bengali text-to-speech voice engine integration. |
| **Third-Party Security Audit, DPDP Compliance & QA** | **₹2.50 Lakh** | CERT-In empanelled cybersecurity penetration testing, DPDP Act 2023 compliance audit, and load testing for 50,000 concurrent farmer queries. |
| **Operational Contingency & Discretionary Reserve** | **₹2.50 Lakh** | Unforeseen compute scaling, legal documentation, and stakeholder workshop logistics. |
| **Total Requested Grant** | **₹40.00 Lakh** | **100% compliant with NESFIC 2026 Deep-Tech Track Guidelines** |

### Commercial Sustainability Post-Grant
Post-grant, KrishiDrishti transitions into a sustainable, institutionalized SaaS and public-good platform:
1. **Government Annual Maintenance Contract (AMC):** Sustained through the Department of Agriculture / ASAMB digital governance budgetary allocations (₹12–18 Lakh/year).
2. **Enterprise B2B FPO & Commodity Buyer Services:** Premium predictive analytics, supply-origin heatmaps, and procurement planning APIs for large food processors, institutional buyers, and commodity export consortiums.
