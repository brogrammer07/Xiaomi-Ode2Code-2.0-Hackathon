import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import operatorRoutes from "./routes/operator.js";
import customerRoutes from "./routes/customer.js";
import couponRoutes from "./routes/coupon.js";
const app = express();
dotenv.config();
// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: [process.env.CLIENT_URL],
  })
);

// set routes
app.use("/api", operatorRoutes);
app.use("/api", customerRoutes);
app.use("/api", couponRoutes);
// Set Port
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Chat Buddy API");
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("MongoDB Error", error.message));
