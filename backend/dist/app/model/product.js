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
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    gtin: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });
// Indexes
ProductSchema.index({ stock: -1 });
ProductSchema.index({ category: 1, brand: 1, price: 1 });
// Pre-save middleware to generate unique GTIN
ProductSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let generatedGTIN;
        // Retry generation until a unique GTIN is obtained
        while (!generatedGTIN) {
            const candidateGTIN = Math.floor(1000000000000 + Math.random() * 9000000000000);
            const existingProduct = yield ProductModel.findOne({ gtin: candidateGTIN });
            if (!existingProduct) {
                generatedGTIN = candidateGTIN;
            }
        }
        this.gtin = generatedGTIN;
        console.log("Generated GTIN:", this.gtin);
        next();
    });
});
const ProductModel = mongoose_1.default.model("Product", ProductSchema);
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.js.map