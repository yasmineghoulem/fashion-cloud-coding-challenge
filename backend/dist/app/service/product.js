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
class ProductService {
    constructor() {
        this.repository = new product_1.default();
    }
    filterByBrandAndCategory(brand, category, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                if (category != "all") {
                    query.category = category;
                }
                if (brand != "all") {
                    query.brand = brand;
                }
                let sort = {};
                if (sortBy === 'ascending') {
                    sort.price = 1; // Sort by ascending price
                }
                else if (sortBy === 'descending') {
                    sort.price = -1; // Sort by descending price
                }
                const products = yield this.repository.findByBrandAndCategory(query, sort);
                return products;
            }
            catch (error) {
                console.error('Error filtering products:', error);
                throw new Error('Failed to filter products');
            }
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.js.map