const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    contact: { type: String, required: true },
    aadhar: { type: String, required: true },
    address: { type: String, required: true },
    position: { type: String, enum: ['teacher', 'student'], default: 'student' }, // Position field
    profilePicture: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Role field
});

module.exports = mongoose.model('User', userSchema);
