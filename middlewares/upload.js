
const path = require("path");
const multer = require("multer");

const crypto = require("crypto");
const fs = require("fs");

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "";
    if (req.path === "/products") {
      dir = "uploads/products";
    } else if (req.path === "/users") {
      dir = "uploads/users";
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    console.log("filename", file);

    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }

    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;

    cb(null, filename);
  }
});

// Exportamos el objeto multer para que en las rutas puedas usar .single('image')
const upload = multer({ storage }).single("image")

module.exports = upload;









