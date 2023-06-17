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
  brand: string = '';
  category: string = '';
  sort: string = '';

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.getProducts();
	}
  onChange(brand: string, category: string, sort: string) {
    // Access the value using event.target['value']
    const brandValue = brand;
    const categoryValue = category;
    const sortValue = sort;

    console.log(brandValue, categoryValue, sortValue);

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
}
