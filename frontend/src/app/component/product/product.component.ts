import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../service/product.service";
import { Product } from "../../model/product";

@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.less"],
})
export class ProductComponent implements OnInit {
	products: Product[] = [];
	brands: String[] = [];
	categories: String[] = [];
	brand: string = "";
	category: string = "";
	sort: string = "";

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.getProducts();
		this.getBrands();
		this.getCategories();
	}

	onChange(brand: string, category: string, sort: string) {
		this.productService.getProductsByFilters(brand, category, sort).subscribe({
			next: (products: Product[]) => {
				this.products = products;
			},
			error: (error) => {
				console.error("Error fetching products:", error);
			},
		});
	}

	getProducts() {
		this.productService.getProducts().subscribe({
			next: (products: Product[]) => {
				this.products = products;
			},
			error: (error) => {
				console.error("Error fetching products:", error);
			},
		});
	}

	getBrands() {
		this.productService.getBrands().subscribe({
			next: (brands: String[]) => {
				this.brands = brands;
			},
			error: (error) => {
				console.error("Error fetching brands:", error);
			},
		});
	}

	getCategories() {
		this.productService.getCategories().subscribe({
			next: (categories: String[]) => {
				this.categories = categories;
			},
			error: (error) => {
				console.error("Error fetching categories:", error);
			},
		});
	}
}
