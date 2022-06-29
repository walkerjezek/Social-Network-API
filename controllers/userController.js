const { User, Thought } = require('../models');

module.exports = {
    // get all users
    // get singel user
    // create a user
    // update a user by id
    // delete a user by id
    // add a friend
    // delete a friend from user
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne(
            { _id: req.params.userId }
        )
        .select('-__v')
        .then((user) =>
            !user
            ? res.status(404).json({ message: "Not Found"})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: "Not found" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId }
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: "Not found" })
            : Thought.deleteMany({ _id: { $in: user.thoughts }})
        )
        .then(() => 
            res.json({ message: "User and thoughts deleted" })
        )
        .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: "not found" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: "not found" })
            : res.status(user)
        )
        .catch((err) => res.status(500).json(err))
    }



};