const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// 📨 Send a message
router.post('/', protect, sendMessage);

// 📜 Get conversation messages
router.get('/:receiverId', protect, getMessages);

module.exports = router;
