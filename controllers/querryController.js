// const Query = require("../models/Querry");

// // 📌 Submit a query
// exports.createQuery = async (req, res) => {
//   try {
//     const { querrySubject, querryDetails } = req.body;
//     const querryUser = req.user.id; // Assuming user info comes from auth middleware

//     const newQuery = new Query({ querryUser, querrySubject, querryDetails });
//     await newQuery.save();

//     res.status(201).json({ message: "Query submitted successfully", query: newQuery });
//   } catch (error) {
//     console.error("Error submitting query:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 📌 Get all queries for Admin Panel
// exports.getAllQueries = async (req, res) => {
//   try {
//     const queries = await Query.find().populate("querryUser", "name email");
//     res.status(200).json(queries);
//   } catch (error) {
//     console.error("Error fetching queries:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 📌 Get queries for a specific user
// exports.getUserQueries = async (req, res) => {
//   try {
//     const queries = await Query.find({ querryUser: req.user.id });
//     res.status(200).json(queries);
//   } catch (error) {
//     console.error("Error fetching user queries:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
