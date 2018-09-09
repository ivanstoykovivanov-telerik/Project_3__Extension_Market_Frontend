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

  isApproved(product: Product): boolean{
    if(product.productStatus === "ENABLED"){
      return true ; 
    }
    
    if(product.productStatus === "PENDING"){
      return false; 
    }
  }

  isActive(product: Product): boolean{
    if(product.productStatus === "ENABLED"){
      return true ; 
    }
    
    if(product.productStatus === "DISABLED"){
      return false ; 
    }
  }


  deActivateProduct($event, product){
      console.log("In");
      if(product.productStatus = "ENABLED"){
        product.productStatus = "DISABLED";   
        this.adminService.deactivateProduct(product)
          .subscribe();
      }
  }

  onApproveProduct($event, product){
    console.log("In");
    if(product.productStatus === "PENDING"){
      product.productStatus = "ENABLED"; 
      this.adminService.approveProduct(product)
        .subscribe();
    } 
  }


  showProduct(product){
     this.router.navigate(['/productDetails', {id: product.id} ]);
  }

}
