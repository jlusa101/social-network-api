// Dependancies
const router = require('express').Router();
const { User, Thought } = require('../../models');

// Creating a user
// example data
// {
//     "username": "joona",
//     "email": "joona@gmail.com"
// }
router.post('/', ({ body }, res) => {
    User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
});

// Retrieving all users
router.get('/', (req, res) => {
    User.find({})
        .populate({
            path: 'thoughts'
        })
        .populate({
            path: 'friends'
        })
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
});

// Retrieve user by id
router.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });

});

// Updating a user
router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));

})

// Deleting a user
router.delete('/:id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            // Once a user is deleted, all associated thoughts will be deleted from the database
            return Thought.deleteMany({ username: { $in: userData.username } });
        })
        .then(userData => {
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));

});

// Adds a new friend to a user's friend array
router.post('/:userId/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
});

// Deletes a friend from user's friend array
router.delete('/:userId/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
        .then(friendData => {
            if (!friendData) {
                res.status(404).json({ message: 'No friend found with this id!' });
                return;
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;