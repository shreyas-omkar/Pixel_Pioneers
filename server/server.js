import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { seedDatabase } from "./controllers/controllers.js";
import dotenv from 'dotenv'

import router from "./routes/route.js";
import userRouter from "./routes/Users.route.js";
import cookieParser from 'cookie-parser'


const app = express();
const PORT =  5000;

app.use(cors({
    origin: 'http://localhost:5173',  // Your frontend domain
    credentials: true,                 // Allow cookies to be sent
  }));
app.use(express.json());
app.use(cookieParser())
dotenv.config()

// MongoDB connection
mongoose
    .connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
        
    )
    .then(() => {
        console.log("Connected to MongoDB");
        seedDatabase();
    })
    .catch((err) => console.log("Error connecting to DB:", err));

// Initialize routes
app.use("/", router);
app.use('/user', userRouter)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
