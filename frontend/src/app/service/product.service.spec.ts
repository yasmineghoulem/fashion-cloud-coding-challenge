import { TestBed } from "@angular/core/testing";
import {
	HttpClientTestingModule,
	HttpTestingController,
} from "@angular/common/http/testing";
import { ProductService } from "./product.service";

describe("ProductService", () => {
	let service: ProductService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ProductService],
		});
		service = TestBed.inject(ProductService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should retrieve products from the API", () => {
		const mockProducts = [
			{
				gtin: "123456789",
				name: "Product A",
				image: "product-a.jpg",
				category: "Category A",
				stock: 10,
				price: 9.99,
				brand: "Brand A",
			},
			{
				gtin: "987654321",
				name: "Product B",
				image: "product-b.jpg",
				category: "Category B",
				stock: 5,
				price: 14.99,
				brand: "Brand A",
			},
		];

		service.getProducts().subscribe((products) => {
			expect(products).toEqual(mockProducts);
		});

		const req = httpMock.expectOne("http://localhost:3000/products");
		expect(req.request.method).toBe("GET");
		req.flush(mockProducts);
	});

	it("should retrieve brands from the API", () => {
		const mockBrands = ["Brand A", "Brand B"];

		service.getBrands().subscribe((brands) => {
			expect(brands).toEqual(mockBrands);
		});

		const req = httpMock.expectOne("http://localhost:3000/products/brands");
		expect(req.request.method).toBe("GET");
		req.flush(mockBrands);
	});

	it("should retrieve categories from the API", () => {
		const mockCategories = ["Category A", "Category B"];

		service.getCategories().subscribe((categories) => {
			expect(categories).toEqual(mockCategories);
		});

		const req = httpMock.expectOne("http://localhost:3000/products/categories");
		expect(req.request.method).toBe("GET");
		req.flush(mockCategories);
	});

	it("should retrieve filtered products from the API", () => {
		const mockFilteredProducts = [
			{
				gtin: "123456789",
				name: "Product A",
				image: "product-a.jpg",
				category: "Category A",
				stock: 10,
				price: 9.99,
				brand: "Brand A",
			},
			{
				gtin: "987654321",
				name: "Product B",
				image: "product-b.jpg",
				category: "Category B",
				stock: 5,
				price: 14.99,
				brand: "Brand A",
			},
		];

		const brand = "Brand A";
		const category = "Category B";
		const sort = "price";

		service
			.getProductsByFilters(brand, category, sort)
			.subscribe((products) => {
				expect(products).toEqual(mockFilteredProducts);
			});

		const req = httpMock.expectOne(
			`http://localhost:3000/products/${brand}/${category}/${sort}`
		);
		expect(req.request.method).toBe("GET");
		req.flush(mockFilteredProducts);
	});
});
