const router = require('express').Router();
const health = require('./health');
const notifications = require('./notifications');

router.use('/', health);
// router.use('/notification', notifications);

module.exports = router;