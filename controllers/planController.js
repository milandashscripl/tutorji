const Plan = require("../models/Plan");

// 📥 Add a new plan
exports.addPlan = async (req, res) => {
  try {
    const newPlan = new Plan({
      planName: req.body.planName,
      planValue: req.body.planValue,
      planDuration: req.body.planDuration,
      planBanner: req.file?.path, // Store file path if uploaded
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔎 Get single plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🛠️ Update a plan
exports.updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    const updatedData = {
      planName: req.body.planName,
      planValue: req.body.planValue,
      planDuration: req.body.planDuration,
    };

    if (req.file) {
      updatedData.planBanner = req.file.path; // Update banner if uploaded
    }

    // Remove undefined fields
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) {
        delete updatedData[key];
      }
    });

    const updatedPlan = await Plan.findByIdAndUpdate(planId, updatedData, { new: true });

    if (!updatedPlan) {
      return res.status(404).json({ message: "No such plan found" });
    }

    res.json({ message: "Plan updated successfully!", plan: updatedPlan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    const deletedPlan = await Plan.findByIdAndDelete(planId);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
