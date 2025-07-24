const multer = require('multer');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middlewares/upload.js');
const verifyAdmin = require('../middlewares/admin.middleware.js');
const verifyToken = require('../middlewares/auth.middleware.js');



router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
//pasa primero por [upload] y luego por productController.createProduct
//el middleware upload se encarga de manejar la subida de archivos antes de llamar al controlador