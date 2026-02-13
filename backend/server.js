// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const CrawlerService = require('./services/crawlerService');
// const { identifyGlobalNav } = require('./services/noiseReducer');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// // Middleware to allow cross-origin requests from our Vue frontend
// app.use(cors({
//   origin: FRONTEND_URL // Sirf aapke frontend ko allow karega
// }));
// // Middleware to parse JSON bodies from POST requests
// app.use(express.json());


// //  API ROUTE: /api/crawl
// //  PURPOSE: Accepts a URL and constraints, crawls the site, and returns a noise-reduced flow.
// //  REQUIREMENTS: 1.1 (Start URL), 1.3 (Configurable constraints)

// app.post('/api/crawl', async (req, res) => {
//     const { url, maxDepth, credentials } = req.body;

//     // BASIC VALIDATION: Ensure URL is provided
//     if (!url) {
//         return res.status(400).json({ error: "Start URL is required." });
//     }

//     try {
//         console.log(`Received crawl request for: ${url} with depth: ${maxDepth}`);

//         // INITIALIZE CRAWLER: Passing configurable depth
//         const crawler = new CrawlerService(url, parseInt(maxDepth) || 3);
        
//         // Perform the BFS Crawl
//         const rawPages = await crawler.crawl();

//         // Identify Global Navigation (Noise)
//         // Heuristic: Links appearing on too many pages are treated as global nav.
//         const globalNavSet = identifyGlobalNav(rawPages);

//         // Refine the data (Noise Reduction)
//         // We filter out edges that are just global navigation to keep the graph clean.
//         const refinedPages = rawPages.map(page => ({
//             ...page,
//             links: page.links.filter(link => !globalNavSet.has(link))
//         }));

//         // RESPOND: Send the clean structure to the frontend
//         res.json({
//             success: true,
//             totalPages: refinedPages.length,
//             globalNavDetected: Array.from(globalNavSet),
//             data: refinedPages
//         });

//     } catch (error) {
//         // ERROR HANDLING: Requirement 5.3 
//         console.error("Crawl process failed:", error);
//         res.status(500).json({ error: "An internal error occurred during crawling." });
//     }
//     });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const CrawlerService = require('./services/crawlerService');
const { identifyGlobalNav } = require('./services/noiseReducer');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

/**
 * POST /api/crawl
 * Business Logic with Multi-Layer Validation
 */
app.post('/api/crawl', async (req, res) => {
    const { url, maxDepth, credentials } = req.body;

    // 1. BACKEND VALIDATION: Strict URL Formatting Check
    try {
        if (!url) throw new Error("URL is missing");
        new URL(url); // Standard JS validation
    } catch (e) {
        return res.status(400).json({ error: "Invalid or malformed URL provided." });
    }

    try {
        console.log(`📡 Request: Crawling ${url} (Depth: ${maxDepth})`);

        // 2. DEPENDENCY INJECTION: Passing params + credentials to Service
        // Requirement 1.2 & 1.3
        const crawler = new CrawlerService(
            url, 
            parseInt(maxDepth) || 2, 
            credentials
        );
        
        const rawPages = await crawler.crawl();

        // 3. NOISE REDUCTION: Requirement 3.0
        const globalNavSet = identifyGlobalNav(rawPages);
        const refinedPages = rawPages.map(page => ({
            ...page,
            links: page.links.filter(link => !globalNavSet.has(link))
        }));

        res.json({
            success: true,
            totalPages: refinedPages.length,
            data: refinedPages
        });

    } catch (error) {
        // Requirement 5.3: Robust Error Logging
        console.error("❌ Backend Error:", error.message);
        res.status(500).json({ error: "Mapping failed: " + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 PathWire Backend operational on port ${PORT}`);
});