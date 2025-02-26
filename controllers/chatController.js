const Message = require('../models/message');

// @desc Send a message and get a bot reply
// @route POST /api/chat
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: 'Message is required.' });

    // Save user message
    const userMessage = new Message({ sender: 'user', message });
    await userMessage.save();

    // Bot reply logic
    const botReplyText = `You said: "${message}". How can I assist further?`;
    const botMessage = new Message({ sender: 'bot', message: botReplyText });
    await botMessage.save();

    res.json({ reply: botReplyText });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ reply: 'An error occurred. Please try again.' });
  }
};

// @desc Get chat history
// @route GET /api/chat/history
exports.getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }); // Oldest first
    res.json(messages);
  } catch (error) {
    console.error('Fetch history error:', error);
    res.status(500).json({ message: 'Unable to fetch chat history.' });
  }
};
