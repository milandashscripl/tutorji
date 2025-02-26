const Chat = require('../models/Chat');

// 📝 Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id; // User ID from token middleware

    const newMessage = await Chat.create({ senderId, receiverId, message });
    res.status(201).json({ success: true, chat: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Message sending failed', error: err.message });
  }
};

// 📩 Get messages between user and admin
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: req.user.id },
        { senderId: req.user.id, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: err.message });
  }
};
