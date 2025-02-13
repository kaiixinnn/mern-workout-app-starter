require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import routes
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user"); // ✅ Ensure userRoutes is imported

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Register Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes); // ✅ Ensure user routes are registered

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
