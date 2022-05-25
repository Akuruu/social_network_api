// import models
const { User, Thought } = require('../models');

// CRUD
const userController = {
    // Get all users with their thoughts and friends
    getUsers(req, res) {
        User.find({})
        .populate('friends')
        .populate('thoughts')
        .then(users => res.json(users))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        })
    },

    // Get a single user with their thoughts and friends
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate({
            path: 'friends',
            select: '-__v'
          })
        .populate({
            path: 'thoughts',
            select: '-__v'
          })
        .then((user) =>
            !user
              ? res.status(404).json({ message: 'Please enter a valid user' })
              : res.json(user)
          )
        .catch((err) => res.status(500).json(err));
      },

    // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Update a user 
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators:true, new:true}
        )
        .then((user) =>
                !user
                ? res.status(404).json({ message: 'Please enter a valid User' })
                : res.json(user)
            )
        .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Please enter a valid User' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
        .then(() => res.json({ message: 'Deleted this user and their thoughts' }))
        .catch((err) => res.status(500).json(err));
    },

    // FRIEND'S LIST

    // Add friends
    addFriend(req, res) {
        User.findOneAndUpdate(
          {_id: req.params.userId},
          {$push:{friends: req.params.friendId}},
          {runValidators:true, new:true}
        )
          .populate({
            path: 'friends',
            select: '-__v'
          })
          .select('-__v')
          .then((user) =>
            !user
            ? res.status(404).json({ message: 'Please enter a valid User' })
            : res.json(user),
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }, 

      // Delete friends
      removeFriend(req, res) {
        User.findOneAndUpdate(
          {_id: req.params.userId},
          {$pull:{friends: req.params.friendId}},
          {new:true}
        )
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v')
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Please enter a valid User' })
            : res.json(user),
          )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = userController;