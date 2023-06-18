import { PipelineStage } from "mongoose";
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
    try {
      const pipeline: PipelineStage[] = [
        { $sort: { stock: -1 } }
      ];
  
      const products = await ProductModel.aggregate(pipeline);
      return products;
    } catch (error) {
      console.error('Error retrieving products by highest stock:', error);
      throw new Error('Failed to retrieve products by highest stock');
    }
  }

	async findByBrandAndCategory(
		query: any,
		sort: any
	): Promise<ProductDocument[]> {
		try {
			const pipeline = [];

			if (Object.keys(query).length > 0) {
				pipeline.push({ $match: query });
			}

			if (Object.keys(sort).length > 0) {
				pipeline.push({ $sort: sort });
			}

			const products = await ProductModel.aggregate(pipeline);
			return products;
		} catch (error) {
			throw error;
		}
	}
}

export default ProductRepository;
