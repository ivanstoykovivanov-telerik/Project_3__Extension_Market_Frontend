import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FileService } from '../services/file.service';
import { AppComponent } from '../app.component';
import {saveAs} from 'file-saver';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
 
  product: Product; 
  productPicture: string; 
  productPictureLocation : string ; 
  id: number; 
  tagsCount: number; 

  constructor( 
    private productService: ProductService, 
    private fileService: FileService, 
    private route: ActivatedRoute
  ){
    this.id =  Number(route.snapshot.params.id); 
   }

  ngOnInit() {
    //get the id from the url
    this.id =  Number(this.route.snapshot.params.id);
    
    this.productService.getProductById(this.id)
      .subscribe(data => {
        this.product = data
        this.getProductPicture(this.product.id); 
        this.tagsCount = this.product.tags.length
      }); 

    //get the picture from DB
  }

  
  //TODO: , saves the file as a json  . works
  downloadProduct(){
    console.log(this.product.id);
    this.fileService.downloadFileT(this.product.id)
      .subscribe(data => saveAs(data, "Product")); 
  }


  getProductPicture(id: number){
    this.fileService.downloadFile(id) 
      .subscribe(
       ( data: any) => {
        console.log("Getting File");
        console.log(data);
       // console.log(data.blob);
        saveAs(data, "File_Name"); 


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
