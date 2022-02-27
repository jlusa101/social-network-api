// Dependancies
const router = require('express').Router();
const apiRoutes = require('./api');

// Use /api for routes
router.use('/api', apiRoutes);

// In case of error from server side
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;