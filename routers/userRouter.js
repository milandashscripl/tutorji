// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
// const router = express.Router();

// // Multer configuration for profile picture upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../uploads'));
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });
// const upload = multer({ storage });

// // Routes
// router.post('/register', upload.single('profilePicture'), registerUser);
// router.post('/login', loginUser);
// router.get('/profile/:id', getUserProfile);

// module.exports = router;


const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Configure Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);

module.exports = router;
