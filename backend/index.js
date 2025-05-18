import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import cors
import route from "./routes/userRoutes.js";

dotenv.config(); // ✅ Load .env config

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// ✅ Enable CORS for all routes (or restrict to localhost:5173)
app.use(cors());
// Or for stricter control:
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json()); // ✅ JSON parsing
app.use("/api/user", route); // ✅ Route mount

// ✅ Connect to MongoDB and start server
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("❌ DB Connection Error:", error));
