import { Router, Request, Response } from "express";
import ProductController from "../controller/product";

const router = Router();
const controller = new ProductController();

// Find products based on no filter (highest stock)
router.get("/", (req: Request, res: Response) => {
	controller.findByStock(req, res);
});

// Find products based on filter
router.get("/:filtertype/:filter", (req: Request, res: Response) => {
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
			} else if (filter === "descending") {
				controller.findByPriceDescending(req, res);
			} else {
				res.status(400).json({ message: "Invalid filter" });
			}
			break;
		default:
			res.status(400).json({ message: "Invalid filter" });
			break;
	}
});

export default router;
