import { Request, Response } from "express";
import ProductRepository from "../repository/product";
import ProductService from "../service/product";

class ProductController {
	private repository: ProductRepository;
	private service: ProductService;

	constructor(
		repositoryTest?: ProductRepository,
		serviceTest?: ProductService
	) {
		this.repository = repositoryTest || new ProductRepository();
		this.service = serviceTest || new ProductService();
	}

	async getBrands(req: Request, res: Response): Promise<void> {
		try {
			const brands = await this.repository.findAllBrands();
			res.status(200).json(brands);
		} catch (error) {
			res.status(500).json({ message: "Failed to retrieve brands" });
		}
	}

	async getCategories(req: Request, res: Response): Promise<void> {
		try {
			const categories = await this.repository.findAllCategories();
			res.status(200).json(categories);
		} catch (error) {
			res.status(500).json({ message: "Failed to retrieve categories" });
		}
	}

	async findByStock(req: Request, res: Response): Promise<void> {
		try {
			const products = await this.repository.findByStock();
			res.status(200).json(products);
		} catch (error) {
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
			res
				.status(500)
				.json({ message: "Failed to retrieve products by brand and category" });
		}
	}
}

export default ProductController;
