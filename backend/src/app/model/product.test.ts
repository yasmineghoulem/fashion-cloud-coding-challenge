import { ProductModel } from "./product";
import DBConnector from "../db-connector";
import mongoose from "mongoose";
import Config from "../config";

describe("Product Model", () => {
	beforeAll(async () => {
		await DBConnector.connectMongo(Config.MONGO_URL + Config.FASHION_CLOUD_DB_TEST);
	});

	afterAll(async () => {
		// Disconnect from the MongoDB database
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

	it("should create and save a new product", async () => {
		const productData = {
			gtin: 2838439408916,
			name: "test Product",
			image: "test.jpg",
			brand: "test Brand",
			category: "test Category",
			color: "test Color",
			stock: 10,
			price: 99.99,
		};
		let createdProduct = await ProductModel.create(productData);
		expect(createdProduct).toHaveProperty("_id");
		expect(createdProduct.gtin).toBe(productData.gtin);
		expect(createdProduct.name).toBe(productData.name);
	});

	it("should not create a new product Validation Error", async () => {
		const productData = {
			gtin: 2838439408936,
			name: "test Product",
			image: "test.jpg",
			category: "test Category",
			color: "test Color",
			stock: 10,
			price: 99.99,
		};
		await expect(ProductModel.create(productData)).rejects.toThrowError();
	});
});
