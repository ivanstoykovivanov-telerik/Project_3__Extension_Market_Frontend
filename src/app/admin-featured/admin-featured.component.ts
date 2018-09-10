import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-featured',
  templateUrl: './admin-featured.component.html',
  styleUrls: ['./admin-featured.component.css']
})
export class AdminFeaturedComponent implements OnInit {
  
  products : Product[] ; 
  
  constructor(
      private adminService: AdminService, 
      private userService: UserService, 
      private productService: ProductService,
      private router: Router, 
  ) { }

  ngOnInit() {
    
    //get all products
    this.adminService.getAllProducts()
      .subscribe(data => {
        console.log(data)
        this.products = data
      })
  }


  getStatus(product){
    return product.featuredProduct ; 
  }
  
 
  onFeatureProduct($event, product){
    console.log("In");
    if(product.featuredProduct === false ){
      this.adminService.featureProduct(product)
          .subscribe();
      product.featuredProduct = !product.featuredProduct; 
      return ; 
    }
    
    if(product.featuredProduct === true ){
      this.adminService.unFeatureProduct(product)
          .subscribe();
      product.featuredProduct = !product.featuredProduct; 
        return ; 
    }
  }


  showProduct(product){
     this.router.navigate(['/productDetails', {id: product.id} ]);
  }

}
