const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");


dotenv.config();


connectDB(); 

const app = express();

app.use(express.json()); 
app.use(cors()); 

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
