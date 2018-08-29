import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-products-of-user',
  templateUrl: './products-of-user.component.html',
  styleUrls: ['./products-of-user.component.css']
})
export class ProductsOfUserComponent implements OnInit {
  
  products: Product[] = [] ; 
  
  @Input() user: User ;
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    //TODO:
    this.productService.getProductsByUser(this.user)
      .subscribe(
        data => this.products.push(data)
      ) 
    // this.products.push(this.productService.product ); 
    // this.products.push(this.productService.product ); 
    // this.products.push(this.productService.product ); 
    // this.products.push(this.productService.product ); 
    // this.products.push(this.productService.product ); 
  }



}
