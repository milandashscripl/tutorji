const express = require('express');
const { sendMessage, getChatHistory } = require('../controllers/chatController');

const router = express.Router();

router.post('/', sendMessage);        // Send message and get reply
router.get('/history', getChatHistory); // Get chat history

module.exports = router;
