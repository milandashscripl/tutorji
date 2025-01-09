const express = require('express');
const multer = require('multer');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Multer configuration for profile picture upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);

module.exports = router;
