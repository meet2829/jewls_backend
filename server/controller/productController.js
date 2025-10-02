const Product = require("../model/product");
const router = require("../routes/productRoutes");

// ➕ Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err });
  }
};

// 📦 Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};

// 🔍 Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
};

// 📝 Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
};

// ❌ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

exports.searchProduct = async (req, res) => {
    try {
        const { 
            q: searchTerm, 
            category, 
            minPrice, 
            maxPrice, 
            sortBy, 
            onSale,
            page = 1, 
            limit = 12 
        } = req.query;
        
        let query = {};
        
        // Text search across name, description, overview, category
        if (searchTerm && searchTerm.length > 0) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { overview: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        
        // Filter by category
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Sale filter
        if (onSale === 'true') {
            query.sale = true;
        }
        
        // Stock filter (only show in-stock items)
        query.Stock = { $gt: 0 };
        
        // Sort options
        let sortOptions = {};
        switch(sortBy) {
            case 'price-low':
                sortOptions = { price: 1 };
                break;
            case 'price-high':
                sortOptions = { price: -1 };
                break;
            case 'name':
                sortOptions = { name: 1 };
                break;
            case 'rating':
                sortOptions = { rating: -1 };
                break;
            case 'newest':
            default:
                sortOptions = { _id: -1 };
        }
        
        const products = await Product.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
            
        const total = await Product.countDocuments(query);
        
        res.json({
            success: true,
            products,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
        
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Search failed' 
        });
    }
};

// Get all categories for filter dropdown
exports.getProductBycategories= async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json({
            success: true,
            categories: categories.filter(cat => cat) // remove null/undefined
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch categories' 
        });
    }
};
module.exports = exports;