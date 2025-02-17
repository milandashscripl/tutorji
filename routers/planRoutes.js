const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const multer = require("multer");
const path = require("path");

// Configure Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'plan__banners', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

const upload = multer({ storage });

// Define Routes
router.post("/", upload.single("planBanner"), planController.addPlan);
router.get("/", planController.getPlans);

module.exports = router;
