
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();


app.use(cors());
app.use(express.json());


const productRoutes = require('./routes/product.routes');
app.use("/", productRoutes);
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes); // o app.use('/api', userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error(" Error al conectar MongoDB:", err));
