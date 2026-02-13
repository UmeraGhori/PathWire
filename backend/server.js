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


// POST /api/crawl
// Business Logic with Multi-Layer Validation
 
app.post('/api/crawl', async (req, res) => {
    const { url, maxDepth, credentials } = req.body;

    // BACKEND VALIDATION: Strict URL Formatting Check
    try {
        if (!url) throw new Error("URL is missing");
        new URL(url); // Standard JS validation
    } catch (e) {
        return res.status(400).json({ error: "Invalid or malformed URL provided." });
    }

    try {
        console.log(`📡 Request: Crawling ${url} (Depth: ${maxDepth})`);

        // DEPENDENCY INJECTION: Passing params + credentials to Service
        const crawler = new CrawlerService(
            url, 
            parseInt(maxDepth) || 2, 
            credentials
        );
        
        const rawPages = await crawler.crawl();

        // NOISE REDUCTION: Requirement 3.0
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