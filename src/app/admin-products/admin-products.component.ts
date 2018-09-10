import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  
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
    switch (product.productStatus){
      case 'PENDING':
        return false;
      case 'ENABLED':
        return true;
      case 'DISABLED':  
        return false;
    }
  }

  getColor(product) { 
    switch (product.productStatus) {
      case 'PENDING':
        return '#e6e6e6';
      case 'ENABLED':
        return '#8AEF95';
      case 'DISABLED':  
        return '#FF9698';
    }
  }
  
 //works
  onDeActivateProduct(event, product: Product){
    if(product.productStatus === "PENDING"){
      product.productStatus = "ENABLED"; 
      this.adminService.activateProduct(product)
        .subscribe();
      return; 
    }
    
    
    if(product.productStatus === "DISABLED"){
      product.productStatus = "ENABLED"; 
      this.adminService.activateProduct(product)
        .subscribe();
      return; 
    }
    
    if(product.productStatus === "ENABLED"){
      product.productStatus = "DISABLED"; 
      this.adminService.deactivateProduct(product)
        .subscribe();
      return; 
    }
  }



  onFeatureProduct($event, product){
    console.log("In");
    if(product.featuredProduct === 0){
      // product.featuredProduct = 1 ; 
      this.adminService.featureProduct(product)
        .subscribe();
        return ; 
    }
    
    if(product.featuredProduct === 1){
      // product.featuredProduct = 0 ; 
      this.adminService.unFeatureProduct(product)
        .subscribe();
        return ; 
    }
    
  }


  showProduct(product){
     this.router.navigate(['/productDetails', {id: product.id} ]);
  }

}
