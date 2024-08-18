// server/index.js
const express = require("express");
const app = express();
const uploadRoutes = require("./routes/upload");
const path = require("path");

app.use("/api", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
