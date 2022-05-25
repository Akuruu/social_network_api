const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/userController');

// All users /api/users
// Find and create users
router.route('/').get(getUsers).post(createUser);

// One user /api/user/:userid
// Update and delete a user
router.route('/:userId')
.get(getSingleUser).put(updateUser).delete(deleteUser);

// User's Friends /api/user/:userid/friends
// Add and Delete a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;