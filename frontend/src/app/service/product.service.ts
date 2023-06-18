import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../model/product";

@Injectable({
	providedIn: "root",
})
export class ProductService {
	private apiUrl = "http://localhost:3000/products";

	constructor(private http: HttpClient) {}

	getProducts(): Observable<Product[]> {
		let res = this.http.get<Product[]>(this.apiUrl);
		return res;
	}

	getBrands(): Observable<String[]> {
		let res = this.http.get<String[]>(this.apiUrl + "/brands");
		return res;
	}

	getCategories(): Observable<String[]> {
		let res = this.http.get<String[]>(this.apiUrl + "/categories");
		return res;
	}

	getProductsByFilters(
		brand: string,
		category: string,
		sort: string
	): Observable<Product[]> {
		let res = this.http.get<Product[]>(
			this.apiUrl + "/" + brand + "/" + category + "/" + sort
		);
		console.log(res);
		return res;
	}
}
