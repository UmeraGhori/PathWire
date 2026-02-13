function identifyGlobalNav(pages) {
    const linkCounts = {};
    const totalPages = pages.length;

    pages.forEach(page => {
        
        // Requirement 3.2.c: Filter out links that point to the same page (Self-links)
        const uniqueLinks = new Set(page.links.filter(l => l !== page.url));
        uniqueLinks.forEach(link => {
            linkCounts[link] = (linkCounts[link] || 0) + 1;
        });
    });

    // REASONING: Threshold 60%. If it appears on most pages, it's noise (Header/Footer).
    const globalNavLinks = Object.keys(linkCounts).filter(link => {
        return (linkCounts[link] / totalPages) > 0.6; 
    });

    return new Set(globalNavLinks);
}

module.exports = { identifyGlobalNav };