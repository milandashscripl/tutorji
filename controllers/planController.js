const Plan = require("../models/Plan");

// Add a new plan
exports.addPlan = async (req, res) => {
  try {
    const newPlan = new Plan({
      planName: req.body.planName,
      planValue: req.body.planValue,
      planDuration: req.body.planDuration,
      planBanner: req.file.path // Store file path
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
