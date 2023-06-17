import { Request, Response } from 'express';
import ProductRepository from '../repository/product';
import { ProductDocument } from '../model/product';

class ProductController {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const productData: ProductDocument = req.body;
      const createdProduct = await this.repository.create(productData);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Failed to create product' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.repository.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ message: 'Failed to retrieve products' });
    }
  }

  async findByBrand(req: Request, res: Response): Promise<void> {
    try {
      const { filter } = req.params;
      const products = await this.repository.findByBrand(filter);
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products by brand:', error);
      res.status(500).json({ message: 'Failed to retrieve products by brand' });
    }
  }

  async findByCategory(req: Request, res: Response): Promise<void> {
    try {
        const { filter } = req.params;
        const products = await this.repository.findByCategory(filter);
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      res.status(500).json({ message: 'Failed to retrieve products by category' });
    }
  }

  async findByPriceAscending(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.repository.findByPriceAscending();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products by ascending price:', error);
      res.status(500).json({ message: 'Failed to retrieve products by ascending price' });
    }
  }

  async findByPriceDescending(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.repository.findByPriceDescending();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products by descending price:', error);
      res.status(500).json({ message: 'Failed to retrieve products by descending price' });
    }
  }

  async findByStock(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.repository.findByStock();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products by highest stock:', error);
      res.status(500).json({ message: 'Failed to retrieve products by highest stock' });
    }
  }
}

export default ProductController;
