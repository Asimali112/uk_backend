const { Router } = require("express");
const router = Router();
const Result = require('../models/results')


router.post("/results", async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res
      .status(201)
      .json({ message: "Result saved successfully", result: newResult });
  } catch (err) {
    res.status(400).json({ message: "Error saving result", error: err });
  }
});

router.get("/results/:passport", async (req, res) => {
  try {
    const result = await Result.findOne({ passport: req.params.passport });
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Result not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching result", error: err });
  }
});
module.exports = router;
