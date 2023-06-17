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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.ProductModel.find();
            return products;
        });
    }
    findByBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.ProductModel.find({ brand });
            return products;
        });
    }
    findByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.ProductModel.find({ category });
            return products;
        });
    }
    findByPriceAscending() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.ProductModel.find().sort({ price: 1 });
            return products;
        });
    }
    findByPriceDescending() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.ProductModel.find().sort({ price: -1 });
            return products;
        });
    }
    findByStock() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.ProductModel.find().sort({ stock: -1 });
            return products;
        });
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=product.js.map