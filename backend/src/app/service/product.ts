import { ProductDocument } from '../model/product';
import ProductRepository from '../repository/product';

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async filterByBrandAndCategory(brand: string, category: string, sortBy: string): Promise<ProductDocument[]> {
    try {
      let query: any = {};

      if (category != "all") {
        query.category = category;
      }

      if (brand != "all") {
        query.brand = brand;
      }

      let sort: any = {};

      if (sortBy === 'ascending') {
        sort.price = 1; // Sort by ascending price
      } else if (sortBy === 'descending') {
        sort.price = -1; // Sort by descending price
      }

      const products = await this.repository.findByBrandAndCategory(query, sort);
      return products;
    } catch (error) {
      console.error('Error filtering products:', error);
      throw new Error('Failed to filter products');
    }
  }
}

export default ProductService;
