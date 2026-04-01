const router = require("express").Router();
const { notifyUser, notifyAll } = require('../sockets');

router.get("/notifications", (req, res) => res.json({ ok: true }));

// POST /api/notifications/broadcast
router.post('/notifications/broadcast', (req, res) => {
    const { title, message } = req.body;
    const notification = {
        id: Date.now(),
        title,
        message,
        type: 'system', // system | info | warning | etc.
        createdAt: new Date().toISOString()
    };

    notifyAll(notification);

    res.json({ ok: true, notification });
});

// POST /api/notification/user/:userId
// body: { title, message }

router.post('/notifications/user/:userId', (req, res) => {
    const { title, message } = req.body;
    const { userId } = req.params;

    const notification = {
        id: Date.now(),
        title, 
        message,
        type: 'info',
        createdAt: new Date().toISOString()
    };

    notifyUser(userId, notification);

    res.json({ ok: true, notification });
})

module.exports = router;