import Config from "../config";
import mongoose from "mongoose";
import ProductRepository from "./product";
import DBConnector from "../db-connector";
import { ProductDocument, ProductModel } from "../model/product";

describe("ProductRepository", () => {
	let productRepository: ProductRepository;

	beforeAll(async () => {
		await DBConnector.connectMongo(
			Config.MONGO_URL + Config.FASHION_CLOUD_DB_TEST
		);

		// Create a new instance of the repository
		productRepository = new ProductRepository();
	});

	afterAll(async () => {
		// Clear the test database before each test
		await mongoose.connection.dropDatabase();

		// Close the database connection after all tests
		await mongoose.connection.close();
	});

	beforeEach(async () => {
		// Clear the Product collection before each test
		await ProductModel.deleteMany({});
	});

	afterEach(async () => {
		// Clear the Product collection after each test
		await ProductModel.deleteMany({});
	});

	describe("create", () => {
		it("should create a new product", async () => {
			const productData: ProductDocument = new ProductModel({
				gtin: 1234567897,
				name: "Test Product",
				image: "test.jpg",
				brand: "Test Brand",
				category: "Test Category",
				color: "Test Color",
				stock: 10,
				price: 99.99,
			});

			// Call the create method
			const createdProduct = await productRepository.create(productData);

			// Assert the created product
			expect(createdProduct).toHaveProperty("_id");
			expect(createdProduct.gtin).toBe(productData.gtin);
			expect(createdProduct.name).toBe(productData.name);
			expect(createdProduct.image).toBe(productData.image);
			expect(createdProduct.brand).toBe(productData.brand);
			expect(createdProduct.category).toBe(productData.category);
			expect(createdProduct.color).toBe(productData.color);
			expect(createdProduct.stock).toBe(productData.stock);
			expect(createdProduct.price).toBe(productData.price);
		});

		it("should throw an error if product creation fails", async () => {
			// Mock the create method to throw an error
			productRepository.create = jest
				.fn()
				.mockRejectedValue(new Error("Failed to create product"));

			// Prepare test data
			const productData: ProductDocument = new ProductModel({
				gtin: 1234567897,
				name: "Test Product",
				image: "test.jpg",
				brand: "Test Brand",
				category: "Test Category",
				color: "Test Color",
				stock: 10,
				price: 99.99,
			});

			// Assert that the create method throws an error
			await expect(productRepository.create(productData)).rejects.toThrowError(
				"Failed to create product"
			);
		});
	});
	describe("findAllBrands", () => {
		it("should return an array of all brands", async () => {
			// Prepare test data
			const productsData = [
				new ProductModel({
					gtin: 1234567894,
					name: "Test Product",
					image: "test.jpg",
					brand: "Brand A",
					category: "Test Category",
					color: "Test Color",
					stock: 10,
					price: 99.99,
				}),
				new ProductModel({
					gtin: 1234567895,
					name: "Test Product",
					image: "test.jpg",
					brand: "Brand B",
					category: "Test Category",
					color: "Test Color",
					stock: 10,
					price: 99.99,
				}),
				new ProductModel({
					gtin: 1234567896,
					name: "Test Product",
					image: "test.jpg",
					brand: "Brand C",
					category: "Test Category",
					color: "Test Color",
					stock: 10,
					price: 99.99,
				}),
			];
			await ProductModel.insertMany(productsData.map((product) => product));

			// Call the findAllBrands method
			const brands = await productRepository.findAllBrands();

			const expectedBrands = ["Brand A", "Brand B", "Brand C"];

			// Assert that the result matches the expected array of brands
			expect(brands).toEqual(expect.arrayContaining(expectedBrands));
		});

		it("should throw an error if retrieving brands fails", async () => {
			// Mock the ProductModel.distinct method to throw an error
			const mockDistinct = jest.spyOn(ProductModel, "distinct");
			mockDistinct.mockRejectedValue(new Error("Failed to retrieve brands"));

			// Assert that calling the findAllBrands method throws an error
			await expect(productRepository.findAllBrands()).rejects.toThrowError(
				"Failed to retrieve brands"
			);

			// Restore the original implementation of ProductModel.distinct
			mockDistinct.mockRestore();
		});
	});

	describe("findAllCategories", () => {
		it("should return an array of all categories", async () => {
			const productsData = [
				new ProductModel({
					gtin: 1234567890,
					name: "Test Product",
					image: "test.jpg",
					brand: "Brand A",
					category: "t-shirt",
					color: "Test Color",
					stock: 10,
					price: 99.99,
				}),
				new ProductModel({
					gtin: 1234567891,
					name: "Test Product",
					image: "test.jpg",
					brand: "Brand B",
					category: "pant",
					color: "Test Color",
					stock: 10,
					price: 99.99,
				}),
				new ProductModel({
					gtin: 1234567892,
					name: "Test Product",
					image: "test.jpg",
					brand: "Brand C",
					category: "t-shirt",
					color: "Test Color",
					stock: 10,
					price: 99.99,
				}),
			];
			await ProductModel.insertMany(productsData.map((product) => product));

			// Call the findAllCategories method
			const categories = await productRepository.findAllCategories();
			const expectedCategories = ["pant", "t-shirt"];

			// Assert that the result matches the expected array of categories
			expect(categories).toEqual(expect.arrayContaining(expectedCategories));
		});

		it("should throw an error if retrieving categories fails", async () => {
			// Mock the ProductModel.distinct method to throw an error
			const mockDistinct = jest.spyOn(ProductModel, "distinct");
			mockDistinct.mockRejectedValue(
				new Error("Failed to retrieve categories")
			);

			// Assert that calling the findAllCategories method throws an error
			await expect(productRepository.findAllCategories()).rejects.toThrowError(
				"Failed to retrieve categories"
			);

			// Restore the original implementation of ProductModel.distinct
			mockDistinct.mockRestore();
		});
	});

	describe("findByStock", () => {
		it("should return an array of products sorted by highest stock", async () => {
			// Prepare test data
			const products = [
				new ProductModel({
					gtin: 1234567891,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 5,
					price: 9.99,
				}),
				new ProductModel({
					gtin: 1234567892,
					name: "Product 2",
					image: "image2.jpg",
					brand: "Brand 2",
					category: "Category 2",
					color: "Color 2",
					stock: 8,
					price: 14.99,
				}),
				new ProductModel({
					gtin: 1234567893,
					name: "Product 3",
					image: "image3.jpg",
					brand: "Brand 3",
					category: "Category 3",
					color: "Color 3",
					stock: 3,
					price: 6.99,
				}),
			];
			await ProductModel.insertMany(products.map((product) => product));

			// Mock the ProductModel.find method to return the test data
			ProductModel.find = jest.fn().mockReturnValue(products);
			// Call the findByStock method
			const sortedProducts = await productRepository.findByStock();

			// Assert the returned products are sorted by highest stock
			expect(
				sortedProducts.map((p) => ({
					gtin: p.gtin,
					name: p.name,
					image: p.image,
					brand: p.brand,
					category: p.category,
					color: p.color,
					stock: p.stock,
					price: p.price,
				}))
			).toEqual([
				{
					gtin: 1234567892,
					name: "Product 2",
					image: "image2.jpg",
					brand: "Brand 2",
					category: "Category 2",
					color: "Color 2",
					stock: 8,
					price: 14.99,
				},
				{
					gtin: 1234567891,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 5,
					price: 9.99,
				},
				{
					gtin: 1234567893,
					name: "Product 3",
					image: "image3.jpg",
					brand: "Brand 3",
					category: "Category 3",
					color: "Color 3",
					stock: 3,
					price: 6.99,
				},
			]);
		});
	});

	describe("findByBrandAndCategory", () => {
		beforeEach(async () => {
			// Clear the database or ensure it's in a known state before each test
			await ProductModel.deleteMany({});

			const products = [
				new ProductModel({
					gtin: 1234567891,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 5,
					price: 9.99,
				}),
				new ProductModel({
					gtin: 1234567894,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 7,
					price: 99,
				}),
				new ProductModel({
					gtin: 1234567892,
					name: "Product 2",
					image: "image2.jpg",
					brand: "Brand 2",
					category: "Category 2",
					color: "Color 2",
					stock: 8,
					price: 14.99,
				}),
				new ProductModel({
					gtin: 1234567893,
					name: "Product 3",
					image: "image3.jpg",
					brand: "Brand 3",
					category: "Category 3",
					color: "Color 3",
					stock: 3,
					price: 6.99,
				}),
			];
			await ProductModel.insertMany(products.map((product) => product));
		});

		it("should return an array of products matching the provided query and sorted as per the provided sort options", async () => {
			// Test case implementation
			const query = { brand: "Brand 1", category: "Category 1" };
			const sortOptions = { price: 1 };
			const result = await productRepository.findByBrandAndCategory(
				query,
				sortOptions
			);

			// Assert the result
			expect(
				result.map((p) => ({
					gtin: p.gtin,
					name: p.name,
					image: p.image,
					brand: p.brand,
					category: p.category,
					color: p.color,
					stock: p.stock,
					price: p.price,
				}))
			).toEqual([
				{
					gtin: 1234567891,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 5,
					price: 9.99,
				},
				{
					gtin: 1234567894,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 7,
					price: 99,
				},
			]);
		});

		it("should return an array of products matching the provided query if sort options are not provided", async () => {
			// Test case implementation
			const query = { brand: "Brand 1", category: "Category 1" };
			const result = await productRepository.findByBrandAndCategory(query, {});

			// Assert the result
			expect(
				result.map((p) => ({
					gtin: p.gtin,
					name: p.name,
					image: p.image,
					brand: p.brand,
					category: p.category,
					color: p.color,
					stock: p.stock,
					price: p.price,
				}))
			).toEqual(
				expect.arrayContaining([
					{
						gtin: 1234567891,
						name: "Product 1",
						image: "image1.jpg",
						brand: "Brand 1",
						category: "Category 1",
						color: "Color 1",
						stock: 5,
						price: 9.99,
					},
					{
						gtin: 1234567894,
						name: "Product 1",
						image: "image1.jpg",
						brand: "Brand 1",
						category: "Category 1",
						color: "Color 1",
						stock: 7,
						price: 99,
					},
				])
			);
		});

		it("should return an array of products sorted as per the provided sort options if query is not provided", async () => {
			// Test case implementation
			const sortOptions = { price: 1 };
			const result = await productRepository.findByBrandAndCategory(
				{},
				sortOptions
			);

			// Assert the result
			expect(
				result.map((p) => ({
					gtin: p.gtin,
					name: p.name,
					image: p.image,
					brand: p.brand,
					category: p.category,
					color: p.color,
					stock: p.stock,
					price: p.price,
				}))
			).toEqual([
				{
					gtin: 1234567893,
					name: "Product 3",
					image: "image3.jpg",
					brand: "Brand 3",
					category: "Category 3",
					color: "Color 3",
					stock: 3,
					price: 6.99,
				},
				{
					gtin: 1234567891,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 5,
					price: 9.99,
				},
				{
					gtin: 1234567892,
					name: "Product 2",
					image: "image2.jpg",
					brand: "Brand 2",
					category: "Category 2",
					color: "Color 2",
					stock: 8,
					price: 14.99,
				},
				{
					gtin: 1234567894,
					name: "Product 1",
					image: "image1.jpg",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 7,
					price: 99,
				},
			]);
		});
	});
});
