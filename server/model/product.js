const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  oldPrice: Number,
  description: String,
  imageUrl: String,
  category: String,
  Stock:Number,
  rating: String,
  sale: Boolean
});

module.exports = mongoose.model('Product', productSchema);