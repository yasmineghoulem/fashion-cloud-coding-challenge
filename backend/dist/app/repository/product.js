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
const product_1 = require("../model/product");
class ProductRepository {
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield product_1.ProductModel.create(productData);
            return createdProduct;
        });
    }
    findAllBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brands = yield product_1.ProductModel.distinct("brand");
                return brands;
            }
            catch (error) {
                throw new Error("Failed to retrieve brands");
            }
        });
    }
    findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield product_1.ProductModel.distinct("category");
                return categories;
            }
            catch (error) {
                throw new Error("Failed to retrieve categories");
            }
        });
    }
    findByStock() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [
                    { $sort: { stock: -1 } }
                ];
                const products = yield product_1.ProductModel.aggregate(pipeline);
                return products;
            }
            catch (error) {
                throw new Error('Failed to retrieve products by highest stock');
            }
        });
    }
    findByBrandAndCategory(query, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [];
                if (Object.keys(query).length > 0) {
                    pipeline.push({ $match: query });
                }
                if (Object.keys(sort).length > 0) {
                    pipeline.push({ $sort: sort });
                }
                const products = yield product_1.ProductModel.aggregate(pipeline);
                return products;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=product.js.map