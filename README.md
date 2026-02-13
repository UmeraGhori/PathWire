# 🕸️ PathWire | Autonomous Web Architecture & Neural Mapper

PathWire is an enterprise-grade web architecture decomposition tool. It leverages **Layered Breadth-First Search (BFS)** crawling and **Heuristic Frequency-Based Noise Reduction** to transform chaotic web domains into structured, interactive neural maps.

---

## 🧠 The Engineering Deep-Dive: Our "Brain" Logic

What sets PathWire apart is not just the visualization, but the **Data Processing Pipeline** that happens between the crawl and the render.

### 1. Algorithmic Choice: Layered BFS vs. DFS
We intentionally implemented a **Breadth-First Search (BFS)** algorithm for domain discovery. 
* **The Problem with DFS:** Depth-First Search often gets trapped in infinite sub-directory loops or "spider traps," leading to high memory consumption and irrelevant data.
* **The PathWire Solution:** BFS allows us to discover the site layer-by-layer. This maps perfectly to how users perceive site hierarchy (Home > Category > Product). It ensures that the most important nodes (top-level) are prioritized and mapped first.

### 2. Heuristic Noise Reduction (The "Pruning" Engine)
Standard mappers create "Hairball Graphs" where every page connects to the Header/Footer links.
* **Standout Logic:** We implemented a **Frequency Suppression Heuristic**. 
* **The Math:** The engine calculates the occurrence rate of every unique URL across the total discovered set. 
* **Thresholding:** If a link's frequency exceeds **80% of the total node count**, it is categorized as "Global Navigation Noise" (Header, Footer, or Social Sidebar).
* **The Result:** Our engine prunes these redundant edges, revealing the **Unique Content Architecture** of the target domain.

### 3. Stateful Resilience & D3 Force Optimization
Visualizing 100+ interactive nodes in a browser can be CPU-intensive.
* **Alpha Decay & Friction:** We fine-tuned the D3-force simulation's `alphaDecay` and `velocityDecay` parameters. This ensures that the nodes "settle" into their final positions quickly, preventing the "jittery UI" effect common in low-tier mappers.
* **Memory Lifecycle:** To prevent memory leaks during consecutive crawls, we implement an explicit **Component Unmount & Purge** cycle. Every new scan clears the previous simulation's memory buffers before initializing new ones.

### 4. Smart Entity Aggregation: "Detail-Rich" Node Logic
Most visualizers fail when they encounter 8+ similar endpoints (like `/blog/post-1`, `/blog/post-2`), creating a chaotic "Spaghetti Graph."
* **The Standout Logic:** We implemented a **Structural Pattern Recognizer**. Instead of exploding the graph with redundant endpoints, the system identifies high-density clusters and groups them into a single **"Consolidated Detail Node."**
* **The Impact:** This transforms a cluttered visual into a clean, hierarchical map. Each node acts as a smart container, keeping the visual UI lightweight while embedding deep metadata for all linked pages within a single interactive entity.

### 5. Persistent State Export (Architectural Snapshotting)
A neural map is only useful if it can be audited, shared, and analyzed offline.
* **The Implementation:** We built a **Stateful Export Engine** that allows users to capture the entire refined architecture in a single click.
* **The Utility:** By downloading the map as a structured JSON/SVG snapshot, engineers can maintain "Point-in-Time" records of a site's structure. This is critical for **SEO Compliance Audits**, **Migration Mapping**, and tracking architectural changes during large-scale site refactors.
---

## IMPLEMENTATION

* **Frontend:** Vue 3 (Composition API) - Reactive state management between Canvas & Panel.
* **Engine:** D3.js - Force Simulation, Custom collision physics for high-density node clusters.
* **Backend:** Node.js / Express - Cheerio, Non-blocking I/O for concurrent BFS link discovery.
* **Security:** Multi-Tier Guard - Client-side Regex + Server-side URL constructor validation.

---
## ARCHITECHTURE
PathWire follows a decoupled, service-oriented architecture to ensure high maintainability and scalability between the crawling engine and the visualization layer.

```text
PathWire/
├── backend/                # Node.js / Express Crawling Engine
│   ├── services/
│   │   ├── crawlerService.js # Core BFS Algorithm & Semantic Scorer
│   │   └── noiseReducer.js   # Frequency-Based Heuristic Logic
│   ├── .env                # Server configurations (PORT, etc.)
│   ├── server.js           # Express API Entry & Middleware
│   └── package.json
│
├── frontend/               # Vue 3 (Vite) Reactive Visualizer
│   ├── src/
│   │   ├── api/            # Centralized API Service Layer
│   │   │   └── api.js      # Axios Interceptors & Networking
│   │   ├── components/     # UI Components
│   │   │   ├── ControlPanel.vue   # Input Guard & State Control
│   │   │   ├── FlowCanvas.vue     # D3.js Force-Simulation Engine
│   │   │   ├── LoadingOverlay.vue # Progress & Heuristic Feedback
│   │   │   └── NodeDetails.vue    # Rich Entity Metadata View
│   │   ├── services/       
│   │   │   └── graphUtils.js      # D3 Data Transformation Utilities
│   │   ├── App.vue         # Main System Bus / State Orchestrator
│   │   └── main.js         # Entry Point
│   ├── .env                # VITE_API_URL Configuration
│   ├── index.html
│   └── vite.config.js
│
└── README.md               # Technical Case Study & Documentation
---

## 🗺️ High-Level System Data Flow

Below is the architectural flow of PathWire, demonstrating how raw URL inputs are transformed into refined neural maps.


## 📊 Live System Telemetry (Execution Logs)
[20:45:01] 📡 SYSTEM: PathWire Engine v1.0.4 Initialized.
[20:45:02] 🌐 TARGET: https://www.firecrawl.dev/ | Max Depth: 3
[20:45:03] 🕷️ CRAWL: Level 0 started. Root discovered.
[20:45:10] 🕷️ CRAWL: Level 1 complete. 26 unique endpoints found.
[20:45:15] 🧠 ANALYSIS: Detected high-density path (/blog/).
[20:45:15] 📦 LOGIC: Applying Node Aggregation for 10+ sub-links.
[20:45:16] 🧠 HEURISTIC: Identified "Privacy Policy" as Global Nav Noise (Frequency > 80%).
[20:45:17] ✂️ PRUNING: 42 redundant edges removed to optimize visualization.
[20:45:18] ✅ SUCCESS: Refined graph dispatched to D3 layer.
[20:45:25] 💾 EXPORT: User initiated download. State serialized to pathwire_map.json.

Crawling: https://status.firecrawl.dev/ at depth 0
Crawling: https://status.firecrawl.dev/maintenance at depth 1
Crawling: https://status.firecrawl.dev/incidents at depth 1
Crawling: https://status.firecrawl.dev/incident/773173 at depth 1
Crawling: https://status.firecrawl.dev/incident/777892 at depth 1
Crawling: https://status.firecrawl.dev/incident/788933 at depth 1
Crawling: https://status.firecrawl.dev/incident/801450 at depth 1
Crawling: https://status.firecrawl.dev/incident/805439 at depth 1
Crawling: https://status.firecrawl.dev/incident/809093 at depth 1
Crawling: https://status.firecrawl.dev/maintenance/2025-11/2026-01 at depth 2
Crawling: https://status.firecrawl.dev/maintenance/2026-05/2026-07 at depth 2
Crawling: https://status.firecrawl.dev/incidents/2025-09/2025-11 at depth 2
Crawling: https://status.firecrawl.dev/incidents/2026-03/2026-05 at depth 2
Crawling: https://status.firecrawl.dev/maintenance/2025-08/2025-10 at depth 3
Crawling: https://status.firecrawl.dev/maintenance/2026-02/2026-04 at depth 3
Crawling: https://status.firecrawl.dev/maintenance/754823 at depth 3
Crawling: https://status.firecrawl.dev/maintenance/2026-08/2026-10 at depth 3
Crawling: https://status.firecrawl.dev/incidents/2025-06/2025-08 at depth 3
Crawling: https://status.firecrawl.dev/incidents/2025-12/2026-02 at depth 3
Crawling: https://status.firecrawl.dev/incident/761599 at depth 3
Crawling: https://status.firecrawl.dev/incident/761181 at depth 3
Crawling: https://status.firecrawl.dev/incident/759991 at depth 3
Crawling: https://status.firecrawl.dev/incident/759512 at depth 3
Crawling: https://status.firecrawl.dev/incident/759230 at depth 3
Crawling: https://status.firecrawl.dev/incident/754103 at depth 3
Crawling: https://status.firecrawl.dev/incident/747496 at depth 3
Crawling: https://status.firecrawl.dev/incident/746530 at depth 3
Crawling: https://status.firecrawl.dev/incident/746016 at depth 3
Crawling: https://status.firecrawl.dev/incident/741871 at depth 3
Crawling: https://status.firecrawl.dev/incident/737928 at depth 3
Crawling: https://status.firecrawl.dev/incident/736443 at depth 3
Crawling: https://status.firecrawl.dev/incident/735448 at depth 3
Crawling: https://status.firecrawl.dev/incident/727321 at depth 3
Crawling: https://status.firecrawl.dev/incident/718346 at depth 3
Crawling: https://status.firecrawl.dev/incident/717258 at depth 3
Crawling: https://status.firecrawl.dev/incidents/2026-06/2026-08 at depth 3
Received crawl request for: https://status.firecrawl.dev/ with depth: 3
Crawling: https://status.firecrawl.dev/ at depth 0
Crawling: https://status.firecrawl.dev/maintenance at depth 1
Crawling: https://status.firecrawl.dev/incidents at depth 1
Crawling: https://status.firecrawl.dev/incident/773173 at depth 1
Crawling: https://status.firecrawl.dev/incident/777892 at depth 1
Crawling: https://status.firecrawl.dev/incident/788933 at depth 1
Crawling: https://status.firecrawl.dev/incident/801450 at depth 1
Crawling: https://status.firecrawl.dev/incident/805439 at depth 1
Crawling: https://status.firecrawl.dev/incident/809093 at depth 1
Crawling: https://status.firecrawl.dev/maintenance/2025-11/2026-01 at depth 2
Crawling: https://status.firecrawl.dev/maintenance/2026-05/2026-07 at depth 2
Crawling: https://status.firecrawl.dev/incidents/2025-09/2025-11 at depth 2
Crawling: https://status.firecrawl.dev/incidents/2026-03/2026-05 at depth 2
Crawling: https://status.firecrawl.dev/maintenance/2025-08/2025-10 at depth 3
Crawling: https://status.firecrawl.dev/maintenance/2026-02/2026-04 at depth 3
Crawling: https://status.firecrawl.dev/maintenance/754823 at depth 3
Crawling: https://status.firecrawl.dev/maintenance/2026-08/2026-10 at depth 3
Crawling: https://status.firecrawl.dev/incidents/2025-06/2025-08 at depth 3
Crawling: https://status.firecrawl.dev/incidents/2025-12/2026-02 at depth 3
Crawling: https://status.firecrawl.dev/incident/761599 at depth 3
Crawling: https://status.firecrawl.dev/incident/761181 at depth 3
Crawling: https://status.firecrawl.dev/incident/759991 at depth 3
Crawling: https://status.firecrawl.dev/incident/759512 at depth 3
Crawling: https://status.firecrawl.dev/incident/759230 at depth 3
Crawling: https://status.firecrawl.dev/incident/754103 at depth 3
Crawling: https://status.firecrawl.dev/incident/747496 at depth 3
Crawling: https://status.firecrawl.dev/incident/746530 at depth 3
Crawling: https://status.firecrawl.dev/incident/746016 at depth 3
Crawling: https://status.firecrawl.dev/incident/741871 at depth 3
Crawling: https://status.firecrawl.dev/incident/737928 at depth 3
Crawling: https://status.firecrawl.dev/incident/736443 at depth 3
Crawling: https://status.firecrawl.dev/incident/735448 at depth 3
Crawling: https://status.firecrawl.dev/incident/727321 at depth 3
Crawling: https://status.firecrawl.dev/incident/718346 at depth 3
Crawling: https://status.firecrawl.dev/incident/717258 at depth 3
Crawling: https://status.firecrawl.dev/incidents/2026-06/2026-08 at depth 3
Received crawl request for: https://www.firecrawl.dev/ with depth: 3
Crawling: https://www.firecrawl.dev/ at depth 0
Crawling: https://www.firecrawl.dev/playground at depth 1
Crawling: https://www.firecrawl.dev/pricing at depth 1
Crawling: https://www.firecrawl.dev/blog at depth 1
Crawling: https://www.firecrawl.dev/signin at depth 1
Crawling: https://www.firecrawl.dev/app at depth 1
Crawling: https://www.firecrawl.dev/use-cases at depth 1
Crawling: https://www.firecrawl.dev/use-cases/ai-chats at depth 1
Crawling: https://www.firecrawl.dev/skills at depth 1
Crawling: https://www.firecrawl.dev/use-cases/lead-enrichment at depth 1
Crawling: https://www.firecrawl.dev/use-cases/ai-mcps at depth 1
Crawling: https://www.firecrawl.dev/use-cases/ai-platforms at depth 1
Crawling: https://www.firecrawl.dev/use-cases/deep-research at depth 1
Crawling: https://www.firecrawl.dev/agent at depth 1
Crawling: https://www.firecrawl.dev/templates at depth 1
Crawling: https://www.firecrawl.dev/changelog at depth 1
Crawling: https://www.firecrawl.dev/use-cases/seo-teams at depth 1
Crawling: https://www.firecrawl.dev/use-cases/competitive-intelligence at depth 1
Crawling: https://www.firecrawl.dev/careers at depth 1
Crawling: https://www.firecrawl.dev/firestarters at depth 1
Crawling: https://www.firecrawl.dev/ambassadors at depth 1
Crawling: https://www.firecrawl.dev/affiliates at depth 1
Crawling: https://www.firecrawl.dev/compare at depth 1
Crawling: https://www.firecrawl.dev/student-program at depth 1
Crawling: https://www.firecrawl.dev/terms-of-service at depth 1
Crawling: https://www.firecrawl.dev/privacy-policy at depth 1
Crawling: https://www.firecrawl.dev/blog/branding-format-v2 at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-parallel-agents at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-firecrawl-skill-and-cli at depth 2
Crawling: https://www.firecrawl.dev/blog/credal-firecrawl-ai-agents at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-spark-1 at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-agent at depth 2
Crawling: https://www.firecrawl.dev/blog/firecrawl-lovable-integration at depth 2
Crawling: https://www.firecrawl.dev/blog/retell-firecrawl-ai-phone-agents at depth 2
Crawling: https://www.firecrawl.dev/blog/the-worlds-best-web-data-api-v25 at depth 2
Crawling: https://www.firecrawl.dev/blog/firecrawl-v2-series-a-announcement at depth 2
Crawling: https://www.firecrawl.dev/blog/how-engage-together-uses-firecrawl-to-map-anti-trafficking-resources at depth 2
Crawling: https://www.firecrawl.dev/blog/how-dub-builds-ai-affiliate-pages-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/how-zapier-uses-firecrawl-to-power-chatbots at depth 2
Crawling: https://www.firecrawl.dev/blog/open-researcher-interleaved-thinking at depth 2
Crawling: https://www.firecrawl.dev/blog/how-answer-hq-powers-ai-customer-support-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-search-endpoint at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-firecrawl-templates at depth 2
Crawling: https://www.firecrawl.dev/blog/how-botpress-enhances-knowledge-base-creation-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-7-integrations at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-6-firecrawl-mcp at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-5-dev-day at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-4-announcing-llmstxt-new at depth 2
Error crawling https://www.firecrawl.dev/blog/launch-week-iii-day-4-announcing-llmstxt-new: timeout of 10000ms exceeded
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-3-extract-v2 at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-2-announcing-fire-1 at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-1-introducing-change-tracking at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-iii-day-0-firecrawl-editor-theme at depth 2
Crawling: https://www.firecrawl.dev/blog/deep-research-api at depth 2
Crawling: https://www.firecrawl.dev/blog/how-replit-uses-firecrawl-to-power-ai-agents at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-extract-open-beta at depth 2
Crawling: https://www.firecrawl.dev/blog/how-stack-ai-uses-firecrawl-to-power-ai-agents at depth 2
Crawling: https://www.firecrawl.dev/blog/how-cargo-empowers-gtm-teams-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-recap at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-7-introducing-faster-markdown-parsing at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-6-introducing-mobile-scraping at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-5-introducing-two-new-actions at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-4-advanced-iframe-scraping at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-3-introducing-credit-packs at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-2-introducing-location-language-settings at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-ii-day-1-introducing-batch-scrape-endpoint at depth 2
Crawling: https://www.firecrawl.dev/blog/an-adventure-in-scaling at depth 2
Crawling: https://www.firecrawl.dev/blog/how-athena-intelligence-empowers-analysts-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/firecrawl-launch-week-1-recap at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-7-webhooks at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-6-llm-extract at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-5-real-time-crawling-websockets at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-4-introducing-firecrawl-v1 at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-3-introducing-map-endpoint at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-2-doubled-rate-limits at depth 2
Crawling: https://www.firecrawl.dev/blog/launch-week-i-day-1-introducing-teams at depth 2
Crawling: https://www.firecrawl.dev/blog/how-gamma-supercharges-onboarding-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-fire-engine-for-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/firecrawl-july-2024-updates at depth 2
Crawling: https://www.firecrawl.dev/blog/firecrawl-june-2024-updates at depth 2
Crawling: https://www.firecrawl.dev/app/playground at depth 2
Crawling: https://www.firecrawl.dev/use-cases/product-teams at depth 2
Crawling: https://www.firecrawl.dev/use-cases/content-generation at depth 2
Crawling: https://www.firecrawl.dev/use-cases/finance-teams at depth 2
Crawling: https://www.firecrawl.dev/use-cases/ai-training at depth 2
Crawling: https://www.firecrawl.dev/use-cases/migration-teams at depth 2
Crawling: https://www.firecrawl.dev/blog/best-chunking-strategies-rag-2025 at depth 2
Crawling: https://www.firecrawl.dev/blog/deepseek-rag-documentation-assistant at depth 2
Crawling: https://www.firecrawl.dev/blog/10-ai-projects-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/sales-lead-extractor-python-ai at depth 2
Crawling: https://www.firecrawl.dev/blog/crunchbase-scraping-with-firecrawl-claude at depth 2
Crawling: https://www.firecrawl.dev/blog/fire-enrich at depth 2
Crawling: https://www.firecrawl.dev/blog/fastmcp-tutorial-building-mcp-servers-python at depth 2
Crawling: https://www.firecrawl.dev/blog/best-mcp-servers-for-cursor at depth 2
Crawling: https://www.firecrawl.dev/blog/11-ai-agent-projects at depth 2
Crawling: https://www.firecrawl.dev/blog/deep-research-application-firecrawl-streamlit at depth 2
Crawling: https://www.firecrawl.dev/blog/introducing-fireplexity-open-source-answer-engine at depth 2
Crawling: https://www.firecrawl.dev/app/agent at depth 2
Crawling: https://www.firecrawl.dev/login at depth 2
Error crawling https://www.firecrawl.dev/login: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl at depth 2
Error crawling https://www.firecrawl.dev/firecrawl: Request failed with status code 404
Crawling: https://www.firecrawl.dev/signup at depth 2
Crawling: https://www.firecrawl.dev/orgs/firecrawl/repositories at depth 2
Error crawling https://www.firecrawl.dev/orgs/firecrawl/repositories: Request failed with status code 404
Crawling: https://www.firecrawl.dev/orgs/firecrawl/projects at depth 2
Error crawling https://www.firecrawl.dev/orgs/firecrawl/projects: Request failed with status code 404
Crawling: https://www.firecrawl.dev/orgs/firecrawl/packages at depth 2
Error crawling https://www.firecrawl.dev/orgs/firecrawl/packages: Request failed with status code 404
Crawling: https://www.firecrawl.dev/orgs/firecrawl/people at depth 2
Error crawling https://www.firecrawl.dev/orgs/firecrawl/people: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl: Request failed with status code 404
Crawling: https://www.firecrawl.dev/search at depth 2
Error crawling https://www.firecrawl.dev/search: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-lovable at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-lovable: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-lovable/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-lovable/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-lovable/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-lovable/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-lovable/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-lovable/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-lovable/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-lovable/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-mcp-server/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-agent-builder at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-agent-builder: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-agent-builder/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-agent-builder/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-agent-builder/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-agent-builder/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-agent-builder/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-agent-builder/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-agent-builder/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-agent-builder/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fireplexity at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fireplexity: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fireplexity/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fireplexity/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fireplexity/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fireplexity/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fireplexity/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fireplexity/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fireplexity/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fireplexity/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-scouts at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-scouts: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-scouts/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-scouts/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-scouts/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-scouts/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-scouts/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-scouts/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-scouts/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-scouts/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fire-enrich at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fire-enrich: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fire-enrich/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fire-enrich/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fire-enrich/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fire-enrich/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fire-enrich/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fire-enrich/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/fire-enrich/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/fire-enrich/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-app-examples at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-app-examples: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-app-examples/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-researcher at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-researcher: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-researcher/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-researcher/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-researcher/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-researcher/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-researcher/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-researcher/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/open-researcher/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/open-researcher/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegeo at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegeo: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegeo/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegeo/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegeo/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegeo/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegeo/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegeo/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegeo/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegeo/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firestarter at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firestarter: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firestarter/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firestarter/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firestarter/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firestarter/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firestarter/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firestarter/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firestarter/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firestarter/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/llmstxt-generator at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/llmstxt-generator: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/llmstxt-generator/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/llmstxt-generator/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/llmstxt-generator/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/llmstxt-generator/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/llmstxt-generator/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/llmstxt-generator/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/llmstxt-generator/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/llmstxt-generator/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-observer at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-observer: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-observer/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-observer/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-observer/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-observer/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-observer/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-observer/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-observer/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-observer/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firesearch at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firesearch: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firesearch/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firesearch/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firesearch/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firesearch/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firesearch/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firesearch/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firesearch/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firesearch/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/create-llmstxt-py at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/create-llmstxt-py: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/create-llmstxt-py/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/create-llmstxt-py/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/create-llmstxt-py/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/create-llmstxt-py/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/create-llmstxt-py/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/create-llmstxt-py/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/create-llmstxt-py/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/create-llmstxt-py/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/graphs/commit-activity at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/graphs/commit-activity: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/mendable-nextjs-chatbot/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/ai-ready-website at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/ai-ready-website: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/ai-ready-website/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/ai-ready-website/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/ai-ready-website/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/ai-ready-website/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/ai-ready-website/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/ai-ready-website/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/ai-ready-website/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/ai-ready-website/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/rag-arena at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/rag-arena: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/rag-arena/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/rag-arena/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/rag-arena/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/rag-arena/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/rag-arena/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/rag-arena/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/rag-arena/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/rag-arena/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegraph at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegraph: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegraph/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegraph/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegraph/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegraph/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegraph/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegraph/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firegraph/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firegraph/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/data-connectors at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/data-connectors: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/data-connectors/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/data-connectors/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/data-connectors/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/data-connectors/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/data-connectors/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/data-connectors/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/data-connectors/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/data-connectors/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/cli at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/cli: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/cli/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/cli/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/cli/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/cli/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/cli/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/cli/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/cli/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/cli/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/QA_clustering at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/QA_clustering: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/QA_clustering/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/QA_clustering/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/QA_clustering/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/QA_clustering/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/QA_clustering/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/QA_clustering/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/QA_clustering/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/QA_clustering/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-py at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-py: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-py/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-py/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-py/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-py/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-py/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-py/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-py/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-py/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gemini-trendfinder at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gemini-trendfinder: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gemini-trendfinder/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gemini-trendfinder/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gemini-trendfinder/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gemini-trendfinder/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gemini-trendfinder/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gemini-trendfinder/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gemini-trendfinder/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gemini-trendfinder/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/gen-ui-firecrawl/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/grok-4-fire-enrich/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-migrator at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-migrator: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-migrator/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-migrator/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-migrator/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-migrator/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-migrator/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-migrator/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-migrator/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-migrator/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/npx-generate-llmstxt/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-docs at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-docs: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-docs/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-docs/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-docs/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-docs/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-docs/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-docs/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/firecrawl-docs/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/firecrawl-docs/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/forks at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/forks: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/stargazers at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/stargazers: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/issues at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/issues: Request failed with status code 404
Crawling: https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/pulls at depth 2
Error crawling https://www.firecrawl.dev/firecrawl/n8n-nodes-firecrawl/pulls: Request failed with status code 404
Crawling: https://www.firecrawl.dev/blog/introducing-scrape-evals at depth 2
Crawling: https://www.firecrawl.dev/app/logs at depth 2
Crawling: https://www.firecrawl.dev/blog/How-to-Create-an-llms-txt-File-for-Any-Website at depth 2
Crawling: https://www.firecrawl.dev/deep-research at depth 2
Crawling: https://www.firecrawl.dev/blog/web-scraping-change-detection-with-firecrawl at depth 2
Crawling: https://www.firecrawl.dev/blog/how-to-generate-sitemap-using-firecrawl-map-endpoint at depth 2
Crawling: https://www.firecrawl.dev/integrations at depth 2
Crawling: https://www.firecrawl.dev/blog/automated-competitor-price-scraping at depth 2
Crawling: https://www.firecrawl.dev/compare/firecrawl-vs-tavily at depth 2
Crawling: https://www.firecrawl.dev/compare/firecrawl-vs-exa at depth 2
Crawling: https://www.firecrawl.dev/compare/firecrawl-vs-apify at depth 2
Crawling: https://www.firecrawl.dev/blog/firecrawl-vs-octoparse-data-extraction at depth 3
Crawling: https://www.firecrawl.dev/blog/introducing-firecrawl-observer at depth 3
Crawling: https://www.firecrawl.dev/blog/why-clis-are-better-for-agents at depth 3
Crawling: https://www.firecrawl.dev/glossary/web-scraping-apis/what-is-javascript-rendering-web-scraping at depth 3
Crawling: https://www.firecrawl.dev/blog/firecrawl-n8n-web-automation at depth 3
Crawling: https://www.firecrawl.dev/blog/firecrawl-lovable-tutorial at depth 3
Crawling: https://www.firecrawl.dev/blog/grok-2-setup-and-web-crawler-example at depth 3
Crawling: https://www.firecrawl.dev/blog/openai-swarm-agent-tutorial at depth 3
Crawling: https://www.firecrawl.dev/blog/How-to-Talk-with-Any-Website-Using-OpenAIs-Realtime-API-and-Firecrawl at depth 3
Crawling: https://www.firecrawl.dev/blog/chat-with-website at depth 3
Crawling: https://www.firecrawl.dev/blog/data-extraction-using-llms at depth 3
Crawling: https://www.firecrawl.dev/blog/mcp-vs-a2a-protocols at depth 3
Crawling: https://www.firecrawl.dev/blog/lead-gen-business-insights-make-firecrawl at depth 3
Crawling: https://www.firecrawl.dev/blog/undefined at depth 3
Crawling: https://www.firecrawl.dev/launch-week at depth 3
Crawling: https://www.firecrawl.dev/blog/best-deep-research-apis at depth 3
Crawling: https://www.firecrawl.dev/extract at depth 3
Crawling: https://www.firecrawl.dev/blog/automated-price-tracking-tutorial-python at depth 3
Crawling: https://www.firecrawl.dev/blog/custom-instruction-datasets-llm-fine-tuning at depth 3
Crawling: https://www.firecrawl.dev/blog/gemma-3-fine-tuning-firecrawl-unsloth at depth 3
Crawling: https://www.firecrawl.dev/blog/creating_dermatology_dataset_with_openai_harmony_firecrawl_search at depth 3
Crawling: https://www.firecrawl.dev/blog/automated-data-collection-guide at depth 3
Crawling: https://www.firecrawl.dev/blog/best-open-source-rag-frameworks at depth 3
Crawling: https://www.firecrawl.dev/blog/best-enterprise-rag-platforms-2025 at depth 3
Crawling: https://www.firecrawl.dev/blog/mastering-the-crawl-endpoint-in-firecrawl at depth 3
Crawling: https://www.firecrawl.dev/blog/web-scraping-agent-langgraph-firecrawl at depth 3
Crawling: https://www.firecrawl.dev/blog/complete-guide-to-data-enrichment at depth 3
Crawling: https://www.firecrawl.dev/blog/browser-automation-tools-comparison-2025 at depth 3
Crawling: https://www.firecrawl.dev/blog/claude-code-skill at depth 3
Crawling: https://www.firecrawl.dev/blog/best-open-source-web-crawler at depth 3
Crawling: https://www.firecrawl.dev/blog/scraper-vs-crawler at depth 3
Crawling: https://www.firecrawl.dev/blog/python-web-scraping at depth 3
Crawling: https://www.firecrawl.dev/blog/best-open-source-web-scraping-libraries at depth 3
Crawling: https://www.firecrawl.dev/blog/best-web-scraping-api at depth 3
Crawling: https://www.firecrawl.dev/blog/agent-tools at depth 3
Crawling: https://www.firecrawl.dev/blog/n8n-web-scraping-workflow-templates at depth 3
Crawling: https://www.firecrawl.dev/blog/pdf-rag-system-langflow-firecrawl at depth 3
Crawling: https://www.firecrawl.dev/glossary/web-scraping-apis/what-is-ocr-in-web-scraping at depth 3
Crawling: https://www.firecrawl.dev/blog/building-ai-applications-kimi-k2-travel-deal-finder at depth 3
Crawling: https://www.firecrawl.dev/blog/building_medical_ai_application_with_grok_4 at depth 3
Crawling: https://www.firecrawl.dev/blog/langgraph-startup-validator-tutorial at depth 3
Crawling: https://www.firecrawl.dev/blog/open-deep-research-explainer at depth 3
Crawling: https://www.firecrawl.dev/blog/firegeo-complete-saas-template-geo-tools at depth 3
Crawling: https://www.firecrawl.dev/blog/building-ecommerce-intelligence-app-with-glm-4-6 at depth 3
Crawling: https://www.firecrawl.dev/blog/openai-agent-builders-and-firecrawl at depth 3
Crawling: https://www.firecrawl.dev/blog/15-python-projects-2025 at depth 3
Crawling: https://www.firecrawl.dev/blog/python-libraries-for-data-analysts at depth 3
Crawling: https://www.firecrawl.dev/blog/fine_tune_openai_gpt_oss at depth 3
Crawling: https://www.firecrawl.dev/blog/5_easy_ways_to_access_glm_4_5 at depth 3
Crawling: https://www.firecrawl.dev/blog/mastering-firecrawl-scrape-endpoint at depth 3
Crawling: https://www.firecrawl.dev/blog/data-strategy-for-generative-ai-apps at depth 3
Crawling: https://www.firecrawl.dev/blog/modern-rag-stack at depth 3
Crawling: https://www.firecrawl.dev/blog/top_web_search_api_2025 at depth 3
Crawling: https://www.firecrawl.dev/blog/best-semantic-search-apis at depth 3
Crawling: https://www.firecrawl.dev/blog/context-layer-for-ai-agents at depth 3
Crawling: https://www.firecrawl.dev/blog/best-vector-databases-2025 at depth 3
Crawling: https://www.firecrawl.dev/blog/langgraph-tutorial at depth 3
Crawling: https://www.firecrawl.dev/blog/website-to-agent at depth 3
Crawling: https://www.firecrawl.dev/blog/scrape-job-boards-firecrawl-openai at depth 3
Crawling: https://www.firecrawl.dev/blog/competitor_price_scraping at depth 3
Crawling: https://www.firecrawl.dev/blog/custom-instruction-dataset-for-fine-tuning at depth 3
Crawling: https://www.firecrawl.dev/blog/customer-story-replit at depth 3
Crawling: https://www.firecrawl.dev/blog/customer-story-zapier at depth 3
Crawling: https://www.firecrawl.dev/blog/customer-story-gamma at depth 3
Crawling: https://www.firecrawl.dev/blog/best-open-source-agent-frameworks-2025 at depth 3
Crawling: https://www.firecrawl.dev/blog/langflow-tutorial-visual-ai-workflows at depth 3
Crawling: https://www.firecrawl.dev/blog/llm-api-engine-dynamic-api-generation-explainer at depth 3
Crawling: https://www.firecrawl.dev/blog/website-to-agent-with-firecrawl-openai at depth 3
Crawling: https://www.firecrawl.dev/blog/crewai-multi-agent-systems-tutorial at depth 3
Crawling: https://www.firecrawl.dev/blog/google-adk-multi-agent-tutorial at depth 3
Crawling: https://www.firecrawl.dev/blog/context-engineering at depth 3
Crawling: https://www.firecrawl.dev/blog/best-llm-observability-tools at depth 3
Crawling: https://www.firecrawl.dev/blog/modern-rag-tech-stack at depth 3
Crawling: https://www.firecrawl.dev/glossary/web-crawling-apis/what-is-sitemap-useful-for-web-crawling at depth 3
Crawling: https://www.firecrawl.dev/blog/docs.stripe.org at depth 3
Crawling: https://www.firecrawl.dev/blog/docs.firecrawl.dev at depth 3
Crawling: https://www.firecrawl.dev/blog/category/tutorials at depth 3
Crawling: https://www.firecrawl.dev/integrations/mcp/claude-code at depth 3
Crawling: https://www.firecrawl.dev/integrations/mcp/cursor at depth 3
Crawling: https://www.firecrawl.dev/integrations/workflow-automation/n8n at depth 3
Crawling: https://www.firecrawl.dev/integrations/workflow-automation/dify at depth 3
Crawling: https://www.firecrawl.dev/integrations/workflow-automation/make at depth 3
Crawling: https://www.firecrawl.dev/integrations/workflow-automation/zapier at depth 3
Crawling: https://www.firecrawl.dev/integrations/mcp/windsurf at depth 3
Crawling: https://www.firecrawl.dev/blog/deploy-web-scrapers at depth 3
Crawling: https://www.firecrawl.dev/blog/category/customer-stories at depth 3
