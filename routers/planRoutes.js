const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const multer = require("multer");
const path = require("path");

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Define Routes
router.post("/", upload.single("planBanner"), planController.addPlan);
router.get("/", planController.getPlans);

module.exports = router;
