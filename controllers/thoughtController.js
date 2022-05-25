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
        Thought.findOne({ _id: req.params.thoughtId })
          .then((video) =>
            !thought
            ? res.status(404).json({ message: 'Please enter a valid thought ID' })
            : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    // Create a thought
    createThought({ body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
        // not sure if i need to insert a return
        .then(({_id}) => User.findOneAndUpdate(
            {_id:body.userId}, 
            {$push:{thoughts:_id}}, 
            {new:true}
            ))
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Please enter a valid thought ID'})
            : res.json(thought)
          )
        .catch(err => res.status(500).json(err))
    },
    //update thoughts
    //delete thoughts
    //add reaction to thoughts
    //remove a reaction to thoughts
}


module.exports = thoughtController;