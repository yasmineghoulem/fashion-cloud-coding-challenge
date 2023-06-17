import { ProductDocument, ProductModel } from "../model/product";

class ProductRepository {
	async create(productData: ProductDocument): Promise<ProductDocument> {
		const createdProduct = await ProductModel.create(productData);
		return createdProduct;
	}

	async findAllBrands(): Promise<string[]> {
		try {
			const brands = await ProductModel.distinct("brand");
			return brands;
		} catch (error) {
			console.error("Error retrieving brands:", error);
			throw new Error("Failed to retrieve brands");
		}
	}

	async findAllCategories(): Promise<string[]> {
		try {
			const categories = await ProductModel.distinct("category");
			return categories;
		} catch (error) {
			console.error("Error retrieving categories:", error);
			throw new Error("Failed to retrieve categories");
		}
	}

	async findByStock(): Promise<ProductDocument[]> {
		const products = await ProductModel.find().sort({ stock: -1 });
		return products;
	}

	async findByBrandAndCategory(
		query: any,
		sort: any
	): Promise<ProductDocument[]> {
		try {
			const products = await ProductModel.find(query).sort(sort);
			return products;
		} catch (error) {
			throw error;
		}
	}
}

export default ProductRepository;
