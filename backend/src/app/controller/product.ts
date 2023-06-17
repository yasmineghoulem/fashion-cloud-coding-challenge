import { Request, Response } from "express";
import ProductRepository from "../repository/product";
import { ProductDocument } from "../model/product";
import ProductService from "../service/product";

class ProductController {
	private repository: ProductRepository;
	private service: ProductService;

	constructor() {
		this.repository = new ProductRepository();
		this.service = new ProductService();
	}

	async getBrands(req: Request, res: Response): Promise<void> {
		try {
			const brands = await this.repository.findAllBrands();
			res.status(200).json(brands);
		} catch (error) {
			console.error("Error retrieving brands:", error);
			res.status(500).json({ message: "Failed to retrieve brands" });
		}
	}

	async getCategories(req: Request, res: Response): Promise<void> {
		try {
			const categories = await this.repository.findAllCategories();
			res.status(200).json(categories);
		} catch (error) {
			console.error("Error retrieving categories:", error);
			res.status(500).json({ message: "Failed to retrieve categories" });
		}
	}

	async findByStock(req: Request, res: Response): Promise<void> {
		try {
			const products = await this.repository.findByStock();
			res.status(200).json(products);
		} catch (error) {
			console.error("Error retrieving products by highest stock:", error);
			res
				.status(500)
				.json({ message: "Failed to retrieve products by highest stock" });
		}
	}

	async findByBrandAndCategory(req: Request, res: Response): Promise<void> {
		try {
			const { brand, category, sort } = req.params;
			const products = await this.service.filterByBrandAndCategory(
				brand,
				category,
				sort
			);
			res.status(200).json(products);
		} catch (error) {
			console.error("Error retrieving products by brand and category:", error);
			res
				.status(500)
				.json({ message: "Failed to retrieve products by brand and category" });
		}
	}
}

export default ProductController;
