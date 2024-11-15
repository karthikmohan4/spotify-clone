import express from "express";
import path from "path";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumsRoutes from "./routes/album.route.js";
import statisticsRoutes from "./routes/statistics.route.js";
import { clerkMiddleware } from "@clerk/express";
import { connectDb } from "./lib/db.js";
import fileUpload from "express-fileupload";

dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req body
app.use(clerkMiddleware()); //this will add auth to req obj
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10mb limit
    },
  })
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/statistics", statisticsRoutes);

//error handler
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
});

app.listen(5000, () => {
  console.log("server" + PORT);
  connectDb();
});
