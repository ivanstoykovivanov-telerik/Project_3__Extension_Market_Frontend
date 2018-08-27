import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-extensions-per-user',
  templateUrl: './admin-extensions-per-user.component.html',
  styleUrls: ['./admin-extensions-per-user.component.css']
})
export class AdminExtensionsPerUserComponent implements OnInit {
  products: Product[] = []; 
  
  @Input() user: User; 
  
  constructor(
    private userService: UserService, 
    private productService: ProductService,
    private router: Router   
  ) { }

  ngOnInit() {
    this.products.push(this.productService.product) ; 
    this.products.push(this.productService.product) ; 
    this.products.push(this.productService.product) ; 
  }


  findProductsPerUser(){
    // request to get all  products
  }

  deActivateProduct($event, product){
    //TODO: 
  }

  showProduct(product){
    this.router.navigate(['/productDetails']); 
  }



}
