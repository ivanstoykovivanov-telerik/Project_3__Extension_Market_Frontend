import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  product: Product; 

  constructor( 
    private productService: ProductService 
  ) { }

  ngOnInit() {
    this.product = this.data; 
    console.log("Product details: ");
    
    console.log(this.product);
    
  }


  downloadProduct(){
    
  }

  get data(): Product { 
    return this.productService.productDetails; 
  } 
}
