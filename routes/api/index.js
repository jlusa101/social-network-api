const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of `/users` to routes
router.use('/user', userRoutes);


module.exports = router;