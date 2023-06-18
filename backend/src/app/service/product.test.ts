import mongoose from "mongoose";
import Config from "../config";
import ProductService from "./product";
import DBConnector from "../db-connector";
import { ProductModel } from "../model/product";

describe("ProductService", () => {
	let productService: ProductService;

	beforeAll(async () => {
		// Connect to the MongoDB database
		await DBConnector.connectMongo(
			Config.MONGO_URL + Config.FASHION_CLOUD_DB_TEST
		);

		productService = new ProductService();
	});

	afterAll(async () => {
		// Clear the test database before each test
		await mongoose.connection.dropDatabase();

		// Disconnect from the MongoDB database
		await mongoose.disconnect();
	});
	beforeEach(async () => {
		// Clear the Product collection before each test
		await ProductModel.deleteMany({});
	});

	afterEach(async () => {
		// Clear the Product collection after each test
		await ProductModel.deleteMany({});
	});

	describe("filterByBrandAndCategory", () => {
		it("should return an array of products matching the provided query and sorted as per the provided sort options", async () => {
			const productsData = [
				{
					gtin: 1234567891,
					name: "Product 1",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 10,
					price: 9.99,
					image: "image1.jpg",
				},
				{
					gtin: 1234567892,
					name: "Product 2",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 2",
					stock: 5,
					price: 14.99,
					image: "image2.jpg",
				},
			];

			// Add the products to the database
			await ProductModel.insertMany(productsData);

			// Call the service method
			let result = await productService.filterByBrandAndCategory(
				"Brand 1",
				"Category 1",
				"ascending"
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
			).toEqual(productsData);

			// Call the service method
			result = await productService.filterByBrandAndCategory(
				"Brand 1",
				"Category 1",
				""
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
			).toEqual(expect.arrayContaining(productsData));

            result = await productService.filterByBrandAndCategory(
				"all",
				"all",
				"ascending"
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
			).toEqual(productsData);
		});
	});
});
