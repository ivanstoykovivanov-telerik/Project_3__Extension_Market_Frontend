import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FileService } from '../services/file.service';
import { AppComponent } from '../app.component';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product; 
  productPicture: string; 
  productPictureLocation : string ; 

  constructor( 
    private productService: ProductService, 
    private fileService: FileService 
  ) { }

  ngOnInit() {
    this.product = this.data; 
    console.log("Product details: ");
    console.log(this.product);
    
    //get the picture from DB
    this.getProductPicture(this.product.id); 
  }

  //TODO: 
  downloadProduct(){ }

  getProductPicture(id: number){
    this.fileService.getFile(id) 
      .subscribe(
       ( data: any) => {
        console.log("Getting File");
        console.log(data);
       // console.log(data.blob);
        saveAs(data, "Bucky"); 


        // console.log(data.fileLocation)
        //  this.productPictureLocation = AppComponent.FILE_STORAGE + data.fileLocation.slice(3, data.fileLocation.length); 
        //  console.log(this.productPictureLocation);
        }
      )
  }

  get data(): Product { 
    console.log("Getting the product data...");
    return this.productService.productDetails; 
  } 
}
