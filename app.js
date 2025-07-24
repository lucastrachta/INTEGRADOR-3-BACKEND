const path = require('path'); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');


const fs = require('fs');
const crypto = require('crypto');

require('dotenv').config();
app.use('/uploads', express.static( 'uploads'));


const uploadDir = path.join(__dirname, 'uploads', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Carpeta "uploads/products" creada automáticamente');
}






app.use(cors());
app.use(express.json());

// Esto expone la carpeta /uploads al navegador


// Tus rutas
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
app.use('/', productRoutes);
app.use('/', userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("Error al conectar MongoDB:", err));
module.exports = app;


