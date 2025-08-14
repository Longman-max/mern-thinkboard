import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/noteRoutes.js";

// accessing environment variables
dotenv.config();

// initializing express app
const app = express();

// accessing env variables
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    orign: "http://localhost:5173",
  })
);
app.use(express.json()); // this middleware will parse the JSON bodies: req.body
app.use(rateLimiter);

// simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

// routing
app.use("/api/notes", notesRoutes);

// connecting to the database and listen in a port
connectDB().then(() => {
  // listening to the server
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
});
