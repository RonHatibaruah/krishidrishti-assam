# Cloudflare Pages Deployment Guide: KrishiDrishti (Assam Agri-Price Sentinel)
## NESFIC-D-35 • Government Track: Department of Agriculture

This project is configured for one-command deployment to **Cloudflare Pages** via Wrangler CLI.

### 🌐 Live Production Target
- **Live URL:** `https://krishidrishti-assam.pages.dev/`
- **Project Name:** `krishidrishti-assam`
- **Build Output Directory:** `dist`
- **Framework Preset:** Vite / React

---

### 🚀 Deployment Instructions

#### 1. Build the Production Bundle
Ensure the bundle builds cleanly with TypeScript validation:
```bash
npm run build
```

#### 2. Deploy via Wrangler CLI
Deploy the `dist/` directory directly to Cloudflare Pages:
```bash
npx wrangler pages deploy dist --project-name=krishidrishti-assam
```

#### 3. Continuous Deployment (Git Integration)
If connected to a GitHub repository (`https://github.com/RonHatibaruah/krishidrishti-assam`):
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Node.js Version:** `20`
- **Environment Variables:**
  - `STATE_CODE`: `IN-AS`
  - `SYSTEM_NAME`: `KrishiDrishti - Assam Agricultural Commodity Price Intelligence Sentinel`
