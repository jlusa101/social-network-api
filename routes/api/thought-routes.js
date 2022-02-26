const router = require('express').Router();
const { Thought, User } = require('../../models');

// example data
// {
//     "thoughtText": "New thought",
//     "username": "Bobo",
//     "userId": "5edff358a0fdsd789aa7b118b"
// }
router.post('/', ({ body }, res) => {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
});

// Retrieving all thoughts
router.get('/', (req, res) => {
    Thought.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
});

// Retrieve thought by id
router.get('/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });

});

// Updating a thought
router.put('/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));

});

// Deleting a thought
router.delete('/:id', ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));

});

// Adds a new reaction to the thought array
router.post('/:thoughtId/reactions', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
});

// Deletes a reaction from the thought array based on ID
router.delete('/:thoughtId/reactions/:reactionId', ({ params }, res) => {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;