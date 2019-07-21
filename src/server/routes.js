exports.setupRoutes = app => {
    app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
    // TODO: rss, sitemap
};