const apiRoutes = require('./api');
const router = require('express').Router();
router.use('/api', apiRoutes);
router.use((req, res) => res.send('Navigate to correct route'));

module.exports = router;