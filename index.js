const express = require("express");
const cors = require("cors");
require('dotenv').config({
    path : '.env'
})
const connectDB = require("./utils/mongoConnector");
const pdfRoutes = require("./routes/pdf");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Testing route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running perfectly !",
  });
});



// Serve the uploads folder as a static directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// API routes
app.use("/api/pdf", pdfRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
