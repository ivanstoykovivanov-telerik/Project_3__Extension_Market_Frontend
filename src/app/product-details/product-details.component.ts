import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  product: Product; 
  productPicture: string; 

  constructor( 
    private productService: ProductService, 
    private fileService: FileService 
  ) { }

  ngOnInit() {
    this.product = this.data; 
    console.log("Product details: ");
    console.log(this.product);

    this.getProductPicture(this.product.id); 
  }


  //TODO: 
  downloadProduct(){
  }

  getProductPicture(id: number){
    this.fileService.getFile(id)
      .subscribe(
        data => console.log(data)
      )
  }


  get data(): Product { 
    console.log("Getting the product data...");

    return this.productService.productDetails; 

  } 
}
