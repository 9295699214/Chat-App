import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

// CORS Middleware
app.use(cors({
    origin: process.env.ORIGIN, // Ensure this is set in your .env file
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Server setup
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Database connection
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successful");
}).catch(err => console.log("DB connection error:", err));