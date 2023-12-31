import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

// * Local imports
import adminRoutes from "./src/routes/admin.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.js";

// * The express app
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// * Connecting to the DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to DB successfully!!");
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });

// * All App routes
app.use("/admin", adminRoutes);
// app.use("/auth", authRoutes);

cron.schedule('*/14 * * * *', () => {
  axios.get(process.env.BACKEND_SERVER_URL)
    .then(response => {
      console.log('Ping successful');
    })
    .catch(error => {
      console.error('Error pinging server:', error.message);
    });
});

app.get("/", function (req, res) {
  res.send("Hello World");
});


// * Global error handler
app.use(globalErrorHandler);

app.listen(5000, () => {
  console.log(`Server started on 5000`);
});