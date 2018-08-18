import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../models/product.model";
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService : ProductComponent) { }

  ngOnInit() { }

  public getAllproducts(){

  }

  public save(product: Product){
  }

}
