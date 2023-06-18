import { of } from "rxjs";
import { Product } from "../../model/product";
import { ProductComponent } from "./product.component";
import { ProductService } from "../../service/product.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ProductComponent", () => {
	let component: ProductComponent;
	let fixture: ComponentFixture<ProductComponent>;
	let productService: ProductService;

	beforeEach(async () => {
		const productServiceMock = jasmine.createSpyObj("ProductService", [
			"getProductsByFilters",
			"getProducts",
			"getBrands",
			"getCategories",
		]);

		await TestBed.configureTestingModule({
			declarations: [ProductComponent],
			providers: [{ provide: ProductService, useValue: productServiceMock }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductComponent);
		component = fixture.componentInstance;
		productService = TestBed.inject(ProductService);
	});

	it("should fetch products, brands, and categories on initialization", () => {
		const mockProducts: Product[] = [
			{
				gtin: "1234567890",
				name: "Product 1",
				image: "jacket.png",
				category: "Category 1",
				stock: 10,
				price: 9.99,
				brand: "Brand 1",
			},
			{
				gtin: "2345678901",
				name: "Product 2",
				image: "jacket.png",
				category: "Category 2",
				stock: 5,
				price: 19.99,
				brand: "Brand 2",
			},
			{
				gtin: "3456789012",
				name: "Product 3",
				image: "jacket.png",
				category: "Category 3",
				stock: 2,
				price: 14.99,
				brand: "Brand 3",
			},
		]; // Add mock products
		const mockBrands = ["Brand 1", "Brand 2", "Brand 3"]; // Add mock brands
		const mockCategories = ["Category 1", "Category 2", "Category 3"]; // Add mock categories
    jasmine.getEnv().allowRespy(true);
		spyOn(productService, "getProducts").and.returnValue(of(mockProducts));
		spyOn(productService, "getBrands").and.returnValue(of(mockBrands));
		spyOn(productService, "getCategories").and.returnValue(of(mockCategories));

		fixture.detectChanges();

		expect(productService.getProducts).toHaveBeenCalled();
		expect(productService.getBrands).toHaveBeenCalled();
		expect(productService.getCategories).toHaveBeenCalled();

	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should render the filter section", () => {
		const filterSection = fixture.nativeElement.querySelector(".filters");
		expect(filterSection).toBeTruthy();
	});

	// it("should render the product grid view", () => {
  //   const productsSection = fixture.nativeElement.querySelector(".products-grid");
  //   console.log("product Section:", productsSection);
  //   console.log("nativ Section:",fixture.nativeElement)
	// 	expect(productsSection).toBeTruthy();
	// });
});
