const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// 🗂️ Configure Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'plan__banners', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

const upload = multer({ storage });

// 📝 Add a new plan
router.post("/", upload.single("planBanner"), planController.addPlan);

// 📄 Get all plans
router.get("/", planController.getPlans);

// 🔎 Get a single plan by ID
router.get("/:id", planController.getPlanById);

// 🛠️ Update a plan
router.patch('/update/:id', upload.single('planBanner'), planController.updatePlan);

// ❌ Delete a plan
router.delete('/delete/:id', planController.deletePlan); // ✅ Added delete route

module.exports = router;
