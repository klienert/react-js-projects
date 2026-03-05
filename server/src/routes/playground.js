const router = require('express').Router();

router.get('/health', (req, res) => res.json({ ok: true }));

router.get('/time', (req, res) => {
    res.json({
        iso: new Date().toISOString(),
        unix: Date.now(),
    });
});

router.post('/echo', (req, res) => {
    res.json({
        received: req.body,
    });
});

router.get('/error', (req, res) => {
    res.status(400).json({ error: 'Example error from server'});
});

module.exports = router;