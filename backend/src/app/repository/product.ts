import { ProductDocument, ProductModel } from '../model/product';

class ProductRepository {
  async create(productData: ProductDocument): Promise<ProductDocument> {
    const createdProduct = await ProductModel.create(productData);
    return createdProduct;
  }

  async findAll(): Promise<ProductDocument[]> {
    const products = await ProductModel.find();
    return products;
  }

  async findByBrand(brand: string): Promise<ProductDocument[]> {
    const products = await ProductModel.find({ brand });
    return products;
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
    const products = await ProductModel.find({ category });
    return products;
  }

  async findByPriceAscending(): Promise<ProductDocument[]> {
    const products = await ProductModel.find().sort({ price: 1 });
    return products;
  }

  async findByPriceDescending(): Promise<ProductDocument[]> {
    const products = await ProductModel.find().sort({ price: -1 });
    return products;
  }

  async findByStock(): Promise<ProductDocument[]> {
    const products = await ProductModel.find().sort({ stock: -1 });
    return products;
  }
}

export default ProductRepository;
