# PathWire | Advanced Web Architecture Mapper

PathWire is a high-fidelity web crawler and visualization engine designed to transform complex website hierarchies into interactive, neural-style flow maps. Built with a focus on **Separation of Concerns (SoC)** and **Heuristic Noise Reduction**, it allows developers to audit site architecture through a clean, performant interface.

---

## 🛠 Engineering Philosophy

As a senior-led project, the codebase follows strict architectural principles to ensure it isn't just a "script," but a maintainable and scalable "product."

### 1. The Orchestration Pattern (`App.vue`)
Instead of bloating the root component with business logic, `App.vue` serves as a **Traffic Controller**. 
* **Logic:** It manages the high-level state (`loading`, `crawlData`) and facilitates communication between the sidebar (Inputs) and the Canvas (Outputs). 
* **Design Decision:** We chose an **Event-Driven** approach. The `ControlPanel` doesn't know about the API; it simply emits a `start-crawl` event with a payload. This makes the UI completely decoupled from the networking layer.



### 2. Service-Oriented API Layer (`api.js`)
We moved all networking logic into a centralized Axios instance.
* **Resilience:** Crawling is inherently high-latency. We configured a **60,000ms (1-minute) timeout** and implemented **Response Interceptors** to catch and format backend errors before they hit the UI.
* **Environment Agnostic:** By utilizing `import.meta.env`, the app is production-ready, allowing for seamless configuration of backend endpoints via `.env`.

### 3. State Integrity & Reset Cycles
One of the biggest challenges in D3-based visualizations is coordinate "ghosting" (new data overlapping old nodes). 
* **The Fix:** We implemented a strict **State Reset Cycle**. Before any new API call, the `crawlData` is purged. This triggers Vue’s reactivity to unmount the previous SVG canvas, ensuring a fresh memory space for the next neural map.

---

## 🧠 Core Logic & Heuristics

### Intelligent Noise Reduction (Requirement 3.0)
Raw crawls are messy. If every page links to "Home," "Privacy Policy," and "Contact," the graph becomes a "hairball."
* **The Heuristic:** We implemented a **Frequency-Based Suppression** algorithm. The `identifyGlobalNav` service tracks how often a link appears across the crawled set. If a link appears in $>80\%$ of pages, it is flagged as "Global Navigation" (Noise) and suppressed from the main visualization to highlight the **Core Content Path**.



### Multi-Layer URL Guard
To prevent the Node.js event loop from choking on malformed data:
1. **Frontend:** Regex-based validation provides instant feedback to the user via UI error states.
2. **Backend:** A strict `new URL()` constructor check acts as a final firewall against malformed injection or invalid protocols.

---

## 🏗 Tech Stack & Dependencies

* **Frontend:** Vue 3 (Composition API) — Chosen for its superior reactivity model and lightweight footprint.
* **Visualization:** D3.js (Force-Directed Graph) — For handling complex physics-based node positioning.
* **Styling:** Tailwind CSS + Glassmorphism — For a modern, high-tech "Dark Mode" aesthetic.
* **Backend:** Node.js + Express — To handle the non-blocking I/O required for concurrent link scanning.

---

## 🚀 Execution & Setup

### Requirements
* Node.js (v18+)
* NPM / PNPM

### Installation

1. **Backend:**
   cd backend
   npm install
   # Ensure .env contains PORT=3000
   node server.js

2. **Frontend:**
   cd frontend
   npm install
   # Configure VITE_API_URL in .env
   npm run dev