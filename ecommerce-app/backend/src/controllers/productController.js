const Product = require('../models/product');

class ProductController {
    constructor(Product) {
        this.Product = Product;
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createProduct(req, res) {
        const product = new this.Product(req.body);
        try {
            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProduct = await this.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await this.Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async searchProduct(req, res) {
        const { query } = req.params;
        try {
            const products = await this.Product.find({ name: { $regex: query, $options: 'i' } });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}


module.exports = new ProductController();
