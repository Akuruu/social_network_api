const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/userController');

// All Users /api/users
// Find and create users
router.route('/').get(getUsers).post(createUser);

// One user /api/:userid
// Update and delete a user
router.route('/:userId')
.get(getSingleUser).put(updateUser).delete(deleteUser);

// Thought reactions /api/:userid/friends
// Add and Delete a friend
router.route('/:userId/reactions').post(addFriend).delete(deleteFriend);

module.exports = router;