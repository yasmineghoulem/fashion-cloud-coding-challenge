const Product = require('../models/product');

class ProductRepository {
  static async createProduct(productData) {
    try {
      const product = new Product(productData);
      const createdProduct = await product.save();
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(productId, updateData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;
