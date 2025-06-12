const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3002;
const connectDB = require("./connections/mongodb");
const cookieParser = require("cookie-parser");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectRedis } = require("./utils/redisClient");

require("dotenv").config();

//Connect to the database on starting the server
connectDB();
connectRedis();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/contact", contactRoutes);
app.use("/services", serviceRoutes);
app.use("/projects", projectRoutes);
app.use("/teams", teamRoutes);
app.use("/contact", contactRoutes);
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
