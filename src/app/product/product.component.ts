import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Product } from '../models/product.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product = new Product("Slack chat", 
  "Next generation chat for the modern office communication", 
  "12.34", 
  new User("prodan123"),
  1234, 
  "http://www.slack-bot.com/download",
  "http://github/slac-chat", 
  12,
  [new Tag("chat"), new Tag("chatbot")], 
  421, 
  new Date(), 
  "pending"
)



  constructor() { }

  ngOnInit() {
   
  }


}
