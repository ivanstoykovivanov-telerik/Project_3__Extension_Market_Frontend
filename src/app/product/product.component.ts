import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../models/product.model";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private productsURL = "/api/product";

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  public getAllproducts(){
    return this.http.get<Product[]>(this.productsURL);
  }

  public save(product: Product){
    // console.log("From save task input");
    // console.log(product);
    return this.http.post<Product>(`${this.productsURL}/save`, product);
  }

}
