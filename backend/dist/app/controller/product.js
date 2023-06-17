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
const product_2 = require("../service/product");
class ProductController {
    constructor() {
        this.repository = new product_1.default();
        this.service = new product_2.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                const createdProduct = yield this.repository.create(productData);
                res.status(201).json(createdProduct);
            }
            catch (error) {
                console.error("Error creating product:", error);
                res.status(500).json({ message: "Failed to create product" });
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
                console.error("Error retrieving products:", error);
                res.status(500).json({ message: "Failed to retrieve products" });
            }
        });
    }
    getBrands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brands = yield this.repository.findAllBrands();
                res.status(200).json(brands);
            }
            catch (error) {
                console.error("Error retrieving brands:", error);
                res.status(500).json({ message: "Failed to retrieve brands" });
            }
        });
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.repository.findAllCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                console.error("Error retrieving categories:", error);
                res.status(500).json({ message: "Failed to retrieve categories" });
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
                console.error("Error retrieving products by highest stock:", error);
                res
                    .status(500)
                    .json({ message: "Failed to retrieve products by highest stock" });
            }
        });
    }
    findByBrandAndCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { brand, category, sort } = req.params;
                const products = yield this.service.filterByBrandAndCategory(brand, category, sort);
                res.status(200).json(products);
            }
            catch (error) {
                console.error("Error retrieving products by brand and category:", error);
                res
                    .status(500)
                    .json({ message: "Failed to retrieve products by brand and category" });
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.js.map