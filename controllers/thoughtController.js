// import models
const {Thought, User} = require('../models');

// CRUD
const thoughtController = {
    
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
    },

    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({_id: req.params.thoughtId})
      .select('-__v')
      .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Please enter a valid thought ID' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    // Create a thought
    createThought(req, res) {

      Thought.create(req.body)
      .then((thought) => {
          return User.findOneAndUpdate(
            {_id:req.body.userId},
            {$addToSet:{thoughts:thought._id}},
            {new:true}
        );
      })
      .then((user) => 
            !user
            ? res.status(404).json({ message: 'Please try again'})
            : res.json('Successfully created thought')
        )
      .catch((err) => {
      console.log(err);
      res.status(500).json(err);
     });
  },

    // Update thoughts
    updateThought(req, res) {

        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators:true, new:true}
        )
        .then((thought) =>
                !user
                ? res.status(404).json({ message: 'Please enter a valid thought ID' })
                : res.json(thought)
            )
        .catch((err) => {
             console.log(err);
             res.status(500).json(err);
        });
    },

    // Delete a thought
    deleteThought(req, res) {

        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Please enter a valid thought ID' })
            : res.json('Successfully deleted thought')
          )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // REACTIONS

    // Add a reaction to thoughts
    addReaction(req, res) {

        Thought.findOneAndUpdate(
          {_id:req.params.thoughtId},
          {$push:{reactions: req.body}},
          {runValidators:true, new:true}
        )
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Please enter a valid reaction' })
            : res.json(thought),
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // Remove a reaction to thoughts
    deleteReaction(req, res) {

        Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          {$pull:{reactions:{reactionId: req.params.reactionId}}},
          {new:true}
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Please enter a valid thought ID' })
            : res.json(user),
          )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
}

module.exports = thoughtController;