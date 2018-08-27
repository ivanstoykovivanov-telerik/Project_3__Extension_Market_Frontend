import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Product } from '../models/product.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  icons: string[] ; 
  icon: string; 
  
  product: Product = new Product("Slack chat", 
      "Next generation chat for the modern office communication", 
      "12.34", 
      new User("prodan123"),
      1234, 
      "http://www.slack-bot.com/download",
      "http://github/slac-chat", 
      12,
      [new Tag("chat"), new Tag("chatbot"), new Tag("machine learning") ], 
      421, 
      new Date(), 
      "pending", 
      123
  ); 

  constructor( 
    private router: Router, 
    private productService: ProductService 
  ) { }

  ngOnInit() {
    this.icons = [
      "fa fa-car", 
      "fa fa-binoculars", 
      "fa fa-bell-o", 
      "fa fa-bicycle", 
      "fa fa-briefcase", 
      "fa fa-bath", 
      "fa fa-meetup", 
      "fa fa-microchip", 
      "fa fa-podcast",
      "fa fa-free-code-camp",
      "fa fa-eercast", 
      "fa fa-university",
      "fa fa-caret-square-o-down"
    ]; 
    
    this.icon = this.getRandomIcon()
  }

  productClicked(product : Product){
    console.log("Product clicked:  ");
    this.data = product; 
    console.log(this.data);
    this.router.navigate(['/productDetails']);
  }

  get data(): Product { 
    return this.productService.productDetails; 
  } 
  set data(value: Product) { 
    this.productService.productDetails = value; 
  }
  
  // get icon(): string{
  //   let icon = this.icons[Math.floor(Math.random() * this.icons.length)]; 
  //   return icon;   
  // }


  getRandomIcon(){
    let icon = this.icons[Math.floor(Math.random() * this.icons.length)]; 
    return icon; 
  }
}
