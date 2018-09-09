import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-extensions-per-user',
  templateUrl: './admin-extensions-per-user.component.html',
  styleUrls: ['./admin-extensions-per-user.component.css']
})
export class AdminExtensionsPerUserComponent implements OnInit {
  products: Product[]; 
  // @Input() user: User; 
  currentUser: User; 
  userFromDB; 
  
  constructor(
    private userService: UserService, 
    private productService: ProductService,
    private router: Router, 
    private adminService: AdminService   
  ) { }

  ngOnInit() {
    console.log(this.currentUser);
  }

  getProductsOfUser(id: number ){
    this.productService.getProductsByUser(this.currentUser.id)
    .subscribe(
      data => {
        console.log("DATa from AdminExtensionPerUser");
        console.log(data);
        this.products = data; 
      }
    )
  }

  //COMES FROM ADMIN COMPONENT
  getUser(user: User){
    this.currentUser = user; 
    console.log("Getting user");
    console.log( this.currentUser);
    console.log( this.currentUser.id);
    this.getProductsOfUser(this.currentUser.id); 
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
    
  }


  onApproveProduct($event, product){
    console.log("In");
    if(product.userStatus === "PENDING"){
      product.userStatus = "ENABLED"; 
      this.adminService.approveProduct(product)
        .subscribe();
    } 
  }


  showProduct(product){
     this.router.navigate(['/productDetails', {id: product.id} ]);
  }

}
