import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = "/api/product";

  //For test purposes : 
  private user1 = new User("ivansivanov", "bonbon"); 
  private tags1: Tag[] = [
    new Tag("windows"), 
    new Tag("os"), 
    new Tag("great") 
  ]; 
  private products: Product[] = [
    new Product("windows", "operational system", "2.33", this.user1, 23, "www.win.com", "http://www.github.com",12, this.tags1, new Date()), 
    new Product("linux", "operational system", "7.43", this.user1, 3, "www.lin.com", "http://www.github.com",6, this.tags1, new Date()  )
  ];  
  
  constructor(private http: HttpClient) { }  
  
  
  public getAllproducts(){
    
    //return this.http.get<Product[]>(this.productsURL);
  }

  public save(product: Product){
    // console.log("From save product input");
    // console.log(product);
    return this.http.post<Product>(`${this.productsURL}/save`, product);
  }


}
