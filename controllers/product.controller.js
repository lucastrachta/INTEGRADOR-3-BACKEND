const Product = require('../models/product.model');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Obtener todos los productos
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
}

// Obtener producto por ID
async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener producto por ID' });
  }
}

// Crear un producto
async function createProduct(req, res) {
  try {
    const newProduct = new Product(req.body);

    if(req.file) {
      newProduct.image = req.file.filename; // Asignar el nombre del archivo de la imagen
      //newProduct tendra el campo image con el nombre del archivo subido
    }

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
}

// Actualizar producto
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
}

// Eliminar producto
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
