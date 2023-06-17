import { Router, Request, Response } from "express";
import ProductController from "../controller/product";

const router = Router();
const controller = new ProductController();

// Find products based on no filter (highest stock)
router.get("/", (req: Request, res: Response) => {
	controller.findByStock(req, res);
});

// Find products brands 
router.get("/brands", (req: Request, res: Response) => {
	controller.getBrands(req, res);
});

// Find products categories 
router.get("/categories", (req: Request, res: Response) => {
	controller.getCategories(req, res);
});

// Find products based on filters
router.get("/:brand/:category/:sort", (req: Request, res: Response) => {
	controller.findByBrandAndCategory(req, res);
});


export default router;
