import { Request, Response } from "express";
import ProductRepository from "../repository/product";
import ProductService from "../service/product";
import ProductController from "./product";
import { ProductModel } from "../model/product";

describe("ProductController", () => {
	let productController: ProductController;
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response> & { status: (code: number) => Response };
	let mockRepository: ProductRepository;
	let mockService: ProductService;

	beforeEach(() => {
		mockRequest = {};
		mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
		mockRepository = new ProductRepository();
		mockService = new ProductService();
		productController = new ProductController(mockRepository, mockService);
	});

	describe("getBrands", () => {
		it("should retrieve and return brands successfully", async () => {
			const brands = ["Brand 1", "Brand 2", "Brand 3"];
			jest.spyOn(mockRepository, "findAllBrands").mockResolvedValue(brands);

			await productController.getBrands(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(brands);
		});

		it("should handle error when retrieving brands", async () => {
			const errorMessage = "Failed to retrieve brands";
			jest
				.spyOn(mockRepository, "findAllBrands")
				.mockRejectedValue(new Error(errorMessage));

			await productController.getBrands(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
		});
	});

	describe("getCategories", () => {
		it("should retrieve and return categories successfully", async () => {
			const categories = ["Category 1", "Category 2", "Category 3"];
			jest
				.spyOn(mockRepository, "findAllCategories")
				.mockResolvedValue(categories);

			await productController.getCategories(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(categories);
		});

		it("should handle error when retrieving categories", async () => {
			const errorMessage = "Failed to retrieve categories";
			jest
				.spyOn(mockRepository, "findAllCategories")
				.mockRejectedValue(new Error(errorMessage));

			await productController.getCategories(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
		});
	});

	describe("findByStock", () => {
		it("should retrieve and return products sorted by highest stock successfully", async () => {
			const products = [
				new ProductModel({
					gtin: 1234567891,
					name: "Product 1",
					brand: "Brand 1",
					category: "Category 1",
					color: "Color 1",
					stock: 10,
					price: 9.99,
					image: "image1.jpg",
				}),
				new ProductModel({
					gtin: 1234567892,
					name: "Product 2",
					brand: "Brand 2",
					category: "Category 2",
					color: "Color 2",
					stock: 5,
					price: 14.99,
					image: "image2.jpg",
				}),
			];
			jest.spyOn(mockRepository, "findByStock").mockResolvedValue(products);

			await productController.findByStock(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(products);
		});

		it("should handle error when retrieving products by highest stock", async () => {
			const errorMessage = "Failed to retrieve products by highest stock";
			jest
				.spyOn(mockRepository, "findByStock")
				.mockRejectedValue(new Error(errorMessage));

			await productController.findByStock(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
		});
	});

	describe("findByBrandAndCategory", () => {
		it("should retrieve and return products matching the provided brand, category, and sort options successfully", async () => {
			const brand = "Brand 1";
			const category = "Category 1";
			const sort = "ascending";
			const products = [
				new ProductModel({
					gtin: 1234567891,
					name: "Product 1",
					brand,
					category,
					color: "Color 1",
					stock: 10,
					price: 9.99,
					image: "image1.jpg",
				}),
				new ProductModel({
					gtin: 1234567892,
					name: "Product 2",
					brand,
					category,
					color: "Color 2",
					stock: 5,
					price: 14.99,
					image: "image2.jpg",
				}),
			];
			jest
				.spyOn(mockService, "filterByBrandAndCategory")
				.mockResolvedValue(products);

			mockRequest.params = { brand, category, sort };
			await productController.findByBrandAndCategory(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(products);
		});

		it("should handle error when retrieving products by brand, category, and sort options", async () => {
			const errorMessage = "Failed to retrieve products by brand and category";
			jest
				.spyOn(mockService, "filterByBrandAndCategory")
				.mockRejectedValue(new Error(errorMessage));

			await productController.findByBrandAndCategory(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
		});
	});
});
