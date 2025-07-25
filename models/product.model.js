const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000 
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
 
  image: {
    type: String, 
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

 module.exports= mongoose.model('Product', productSchema);