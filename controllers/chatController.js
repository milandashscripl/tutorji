const Chat = require('../models/Chat');
const User = require('../models/User');

// 📥 Send a message
exports.sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;

  if (!receiverId || !message) {
    return res.status(400).json({ message: 'Receiver ID and message are required.' });
  }

  try {
    const newMessage = await Chat.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};

// 📄 Get all messages between user and admin
exports.getMessages = async (req, res) => {
  const { receiverId } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id },
      ],
    }).sort('createdAt');

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
};
