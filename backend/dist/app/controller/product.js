"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../repository/product");
class ProductController {
    constructor() {
        this.repository = new product_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                const createdProduct = yield this.repository.create(productData);
                res.status(201).json(createdProduct);
            }
            catch (error) {
                console.error('Error creating product:', error);
                res.status(500).json({ message: 'Failed to create product' });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.findAll();
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error retrieving products:', error);
                res.status(500).json({ message: 'Failed to retrieve products' });
            }
        });
    }
    findByBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filter } = req.params;
                const products = yield this.repository.findByBrand(filter);
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error retrieving products by brand:', error);
                res.status(500).json({ message: 'Failed to retrieve products by brand' });
            }
        });
    }
    findByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filter } = req.params;
                const products = yield this.repository.findByCategory(filter);
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error retrieving products by category:', error);
                res.status(500).json({ message: 'Failed to retrieve products by category' });
            }
        });
    }
    findByPriceAscending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.findByPriceAscending();
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error retrieving products by ascending price:', error);
                res.status(500).json({ message: 'Failed to retrieve products by ascending price' });
            }
        });
    }
    findByPriceDescending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.findByPriceDescending();
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error retrieving products by descending price:', error);
                res.status(500).json({ message: 'Failed to retrieve products by descending price' });
            }
        });
    }
    findByStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.findByStock();
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error retrieving products by highest stock:', error);
                res.status(500).json({ message: 'Failed to retrieve products by highest stock' });
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.js.map