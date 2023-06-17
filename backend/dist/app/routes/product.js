"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controller/product");
const router = (0, express_1.Router)();
const controller = new product_1.default();
// Find products based on no filter (highest stock)
router.get("/", (req, res) => {
    controller.findByStock(req, res);
});
// Find products brands 
router.get("/brands", (req, res) => {
    controller.getBrands(req, res);
});
// Find products categories 
router.get("/categories", (req, res) => {
    controller.getCategories(req, res);
});
// Find products based on filters
router.get("/:brand/:category/:sort", (req, res) => {
    controller.findByBrandAndCategory(req, res);
});
exports.default = router;
//# sourceMappingURL=product.js.map