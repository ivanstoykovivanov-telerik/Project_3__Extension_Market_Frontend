import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products-of-user',
  templateUrl: './products-of-user.component.html',
  styleUrls: ['./products-of-user.component.css']
})
export class ProductsOfUserComponent implements OnInit {
  currentUser: User; 
  products: Product[] = [] ; 
  
  @Input() user: User ;
  
  constructor(
    private productService: ProductService, 
    private authService: AuthService
  ) { }

  ngOnInit() {
    //TODO:  get user data from auth service 
    this.authService.currentUser
      .subscribe(data => this.currentUser = data)
    
    this.productService.getProductsByUser(this.currentUser.id)
      .subscribe(
        data => this.products = data
      ) 
  }

  deleteProduct($event){
    
    let id = $event ; 
    console.log(this.products);
    
    console.log(id);
    
    console.log("Before");
    console.log(this.products);
    this.products = this.products.filter(e => e.id !== id);  // TODO works
    console.log("After");
    console.log(this.products);
  }



}
