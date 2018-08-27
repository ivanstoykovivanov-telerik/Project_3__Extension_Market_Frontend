import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-of-user',
  templateUrl: './products-of-user.component.html',
  styleUrls: ['./products-of-user.component.css']
})
export class ProductsOfUserComponent implements OnInit {
  // products: Product[]; 
  products: Product[] = [] ; 
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    //TODO:
    //this.products = this.productService.product; 
    this.products.push(this.productService.product ); 
    this.products.push(this.productService.product ); 
    this.products.push(this.productService.product ); 
    this.products.push(this.productService.product ); 
    this.products.push(this.productService.product ); 
  }



}
