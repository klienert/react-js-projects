const router = require('express').Router();
const health = require('./health');

router.use('/', health);

module.exports = router;