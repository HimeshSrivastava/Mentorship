import express from "express";
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer"; 
import path from "path";

dotenv.config();

const app = express();


const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());


const corsOptions = {
  origin: ["http://localhost:5173", "https://mentorship-frontend-nht6.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));


app.use("/images", express.static(path.join(__dirname, "upload/images")));


app.get("/", (req, res) => {
  res.send("Express App is Running");
});


const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});


const upload = multer({ storage });


app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `https://e-commerce-zq42.onrender.com/images/${req.file.filename}`,
  });
});


import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";


app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);



app.use(express.static(path.join(__dirname, "/frontend/dist")));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  ConnectMongoose(); 
  console.log(`Server is running on port ${PORT}`);
});
