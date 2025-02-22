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


// update plan 
exports.updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    // Collect updated data from the request body
    const updatedData = {
      planName: req.body.planName,
      planValue: req.body.planValue,
      planDuration: req.body.planDuration,
    };

    // If a new profile picture is uploaded, update it
    if (req.file) {
      updatedData.planBanner = req.file.path; // Cloudinary or file path
    }

    // Remove undefined fields
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) {
        delete updatedData[key];
      }
    });

    // Update the user in the database
    const plan = await Plan.findByIdAndUpdate(planId, updatedData, { new: true });

    if (!plan) {
      return res.status(404).json({ message: 'No such a plan found' });
    }

    res.json({ message: 'Plan updated successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};