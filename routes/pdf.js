const { Router } = require("express");
const multer = require("multer");
const Pdf = require("../models/schema");

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("pdf");

// Upload PDF
router.post("/upload", upload, async (req, res) => {
  try {
    const { certificationNumber } = req.body;
    console.log(certificationNumber, req.file);

    const isUsedNumber = await Pdf.findOne({ certificationNumber });

    if (isUsedNumber) {
      return res
        .status(400)
        .json({ error: "Certification number already exists" });
    }

    const pdf = new Pdf({
      certificationNumber,
      url: process.env.API_URI + "/" + req.file.path,
    });

    await pdf.save();

    res.status(201).json({ message: "PDF uploaded successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Certification number already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch PDF by certification number
router.get("/:certificationNumber", async (req, res) => {
  try {
    const pdf = await Pdf.findOne({
      certificationNumber: req.params.certificationNumber,
    });

    if (!pdf) {
      return res.status(404).json({ error: "No pdf found with this number" });
    }


      //   send only the link of the pdf as response
      
    res.status(200).json({ url: pdf.url });
      
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
