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
// Find products based on filter
router.get("/:filtertype/:filter", (req, res) => {
    const { filtertype } = req.params;
    switch (filtertype) {
        case "brand":
            controller.findByBrand(req, res);
            break;
        case "category":
            controller.findByCategory(req, res);
            break;
        case "price":
            const { filter } = req.params;
            if (filter === "ascending") {
                controller.findByPriceAscending(req, res);
            }
            else if (filter === "descending") {
                controller.findByPriceDescending(req, res);
            }
            else {
                res.status(400).json({ message: "Invalid filter" });
            }
            break;
        default:
            res.status(400).json({ message: "Invalid filter" });
            break;
    }
});
exports.default = router;
//# sourceMappingURL=product.js.map