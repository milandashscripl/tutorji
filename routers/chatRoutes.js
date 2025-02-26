const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware'); // Auth middleware for token validation

const router = express.Router();

// 🚀 Send message (User/Admin)
router.post('/', protect, sendMessage);

// 📄 Get message history between user and admin
router.get('/:userId', protect, getMessages);

module.exports = router;
