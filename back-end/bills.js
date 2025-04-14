const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5003;

// CORS Configuration
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure the uploads directory exists
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Dynamic Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { department, subfolder } = req.params;
    const targetFolder = path.join(uploadPath, department, subfolder);

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    cb(null, targetFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(uploadPath));


// ✅ Upload Endpoint (Saves files correctly)
app.post("/upload/:department/:subfolder", upload.single("file"), (req, res) => {
    const { department, subfolder } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(`File uploaded to: uploads/${department}/${subfolder}/${file.originalname}`);
    res.json({ message: "File uploaded successfully", path: `/uploads/${department}/${subfolder}/${file.originalname}` });
});

// ✅ Get All Files (Lists files from subfolders)
app.get("/files/:department/:subfolder", (req, res) => {
  const { department, subfolder } = req.params;
  const folderPath = path.join(uploadPath, department, subfolder);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: "Folder not found" });
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve files" });
    }
    const fileData = files.map((file) => ({
      name: file,
      size: fs.statSync(path.join(folderPath, file)).size + " bytes",
    }));
    res.json(fileData);
  });
});

// ✅ Delete File (Handles department & subfolder)
app.delete("/files/:department/:subfolder/:fileName", (req, res) => {
  const { department, subfolder, fileName } = req.params;
  const filePath = path.join(uploadPath, department, subfolder, decodeURIComponent(fileName));

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting file" });
    }
    res.json({ message: "File deleted successfully" });
  });
});

// ✅ Download File (Handles department & subfolder)
app.get("/download/:department/:subfolder/:fileName", (req, res) => {
  const { department, subfolder, fileName } = req.params;
  const filePath = path.join(uploadPath, department, subfolder, decodeURIComponent(fileName));

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath, fileName, (err) => {
    if (err) {
      res.status(500).json({ error: "Error downloading file" });
    }
  });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
