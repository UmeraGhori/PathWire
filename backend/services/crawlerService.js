const axios = require('axios');
const cheerio = require('cheerio');

class CrawlerService {
    // REASONING: Added credentials parameter to satisfy Requirement 1.2
    constructor(startUrl, maxDepth = 3, credentials = null) {
        this.startUrl = startUrl;
        this.maxDepth = maxDepth;
        this.credentials = credentials; 
        this.visited = new Set();
        this.pages = [];
    }

    //    CLEAN ARCHITECTURE: Header Interceptor
    //    Helper method to generate request headers, including optional Auth.
    getRequestConfig() {
        const config = {
            timeout: 10000,
            headers: {
              'User-Agent': 'Intelligent-Flow-Mapper/1.0'
            }
        };

        // Requirement 1.2: If credentials exist, inject Basic Auth
        if (this.credentials && this.credentials.username && this.credentials.password) {
            const authString = Buffer.from(
                `${this.credentials.username}:${this.credentials.password}`
            ).toString('base64');
            config.headers['Authorization'] = `Basic ${authString}`;
            console.log("System: Injected Auth Headers for internal route.");
        }

        return config;
    }

    async crawl() {
        let queue = [{ url: this.startUrl, depth: 0 }];

        while (queue.length > 0) {
            const { url, depth } = queue.shift();

            if (this.visited.has(url) || depth > this.maxDepth) continue;
            
            this.visited.add(url);
            console.log(`Crawling: ${url} at depth ${depth}`);

            try {
                // REASONING: Using the centralized config for every internal request
                const response = await axios.get(url, this.getRequestConfig());
                const $ = cheerio.load(response.data);
                
                const title = $('title').text() || 'No Title';
                const links = this.extractInternalLinks($, url);

                this.pages.push({ url, title, links, depth });

                links.forEach(link => {
                    queue.push({ url: link, depth: depth + 1 });
                });
            } catch (error) {
                // Requirement 5.3: Sensible error handling
                if (error.response && error.response.status === 401) {
                    console.error(`Auth Error: Access Denied at ${url}. Credentials might be required.`);
                } else {
                    console.error(`Error crawling ${url}: ${error.message}`);
                }
            }
        }
        return this.pages;
    }

    extractInternalLinks($, baseUrl) {
        const links = new Set();
        const domain = new URL(baseUrl).hostname;

        $('a[href]').each((_, el) => {
            let href = $(el).attr('href');
            try {
                const absoluteUrl = new URL(href, baseUrl);
                if (absoluteUrl.hostname === domain && absoluteUrl.protocol.startsWith('http')) {
                    links.add(absoluteUrl.origin + absoluteUrl.pathname.replace(/\/$/, ""));
                }
            } catch (e) { }
        });
        return Array.from(links);
    }
}

module.exports = CrawlerService;