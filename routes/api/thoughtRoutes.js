const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, deleteThought, updateThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// All thoughts /api/thoughts
// Find and create thoughts
router.route('/').get(getThoughts).post(createThought);

// One thought /api/:thoughtid
// Update and delete a user
router.route('/:thoughtId')
.get(getSingleThought).put(updateThought).delete(deleteThought);

// Thought reactions /api/:thoughtid/reactions
// Add and Delete a reaction
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;