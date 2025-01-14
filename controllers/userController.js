const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
// exports.registerUser = async (req, res) => {
//     try {
//         const { name, email, contact, aadhar, address, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             contact,
//             aadhar,
//             address,
//             profilePicture: req.file ? req.file.filename : '',
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };



// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, contact, aadhar, address, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            contact,
            aadhar,
            address,
            profilePicture: req.file ? req.file.filename : '',
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                aadhar: user.aadhar,
                address: user.address,
                profilePicture: user.profilePicture,
            },
            userId: user._id, // Include userId for backward compatibility
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// exports.getUserProfile = async (req, res) => {
//   try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).json({ message: "User not found" });

//       res.json(user);
//   } catch (err) {
//       res.status(500).json({ error: err.message });
//   }
// };



exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add full URL for profilePicture
      const profilePictureUrl = user.profilePicture
        ? `https://tutorji.onrender.com/uploads/${user.profilePicture}`
        : null;
  
      res.json({
        name: user.name,
        email: user.email,
        contact: user.contact,
        aadhar: user.aadhar,
        address: user.address,
        profilePicture: profilePictureUrl,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  