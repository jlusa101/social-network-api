const router = require('express').Router();
const User = require('../../models/User');

// Creating a user
router.post('/', ({ body }, res) => {
    User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
});

// Retrieving all users
router.get('/', (req, res) => {
    User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
});



module.exports = router;