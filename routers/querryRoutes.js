const express = require("express");
const router = express.Router();
const { createQuery, getAllQueries, getUserQueries } = require("../controllers/querryController");
const { protect, admin } = require("../middleware/authMiddleware");

// ✅ User submits a query
router.post("/submit", protect, createQuery);

// ✅ Admin fetches all queries
router.get("/all", protect, admin, getAllQueries);

// ✅ User fetches their own queries
router.get("/my-queries", protect, getUserQueries);

module.exports = router;
