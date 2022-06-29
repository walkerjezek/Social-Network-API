const { User, Thought, Reaction } = require('../models');

module.exports = {
    // get all thoughts
    // get single thought
    // create thought
    // update thought by id
    // delete thought by id
    // create reaction
    // delete reaction
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought 
                ? res.status(404).json({ message: "Not found" })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought._id }},
                { runValidators: true, new: true }
            );
        })
        .then((user) =>
            !user
            ? res.status(404).json({ message: "Not found" })
            : res.json()
        )
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: "Not Found" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId }
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: "Not Found" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: { reactionId: req.body.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: "Not found" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: "Not found" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


};