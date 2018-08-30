import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import {from, Observable} from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = "/api/product";
  
  //For testing purposes: 
  product: Product = new Product(
    "Slack chat", 
    "Next generation chat for the modern office communication", 
    "12.34", 
    new User("prodan123"),
    "http://www.slack-bot.com/download",
    "http://github/slac-chat", 
    [new Tag("chat"), new Tag("chatbot"), new Tag("machine learning") ], 
    1234, 
    12,
    421, 
    new Date(), 
    "pending", 
    123
);

  product2: Product = new Product(
    "Math app", 
    "Next generation chat for the modern office communication", 
    "12.34", 
    new User("prodan123"),
    "http://www.slack-bot.com/download",
    "http://github/slac-chat", 
    [new Tag("chat"), new Tag("chatbot"), new Tag("machine learning") ], 
    1234, 
    12,
    421, 
    new Date(), 
    "pending", 
    123
  ); 
  product3: Product = new Product("New bootstrap", 
    "Next generation chat for the modern office communication", 
    "12.34", 
    new User("prodan123"),
    "http://www.slack-bot.com/download",
    "http://github/slac-chat", 
    [new Tag("chat"), new Tag("chatbot"), new Tag("machine learning") ], 
    1234, 
    12,
    421, 
    new Date(), 
    "pending", 
    123
  ); 

  //For test purposes : 
  
  products: Product[] = [
    this.product, 
    this.product2, 
    this.product3
  ];  


  constructor(private http: HttpClient) { }  
  
  
  public getProducts(sortedBy: string){
    //TODO: 
    //switch statement  to determine the sorting
 
    const productsAsObservable = from(this.products);
    return productsAsObservable; 
    //return this.http.get<Product[]>(this.productsURL);
  }

  public getAllProducts(){
    return this.http.get<Product[]>(AppComponent.API_URL+"/productsOld")
  }

  public getNewProducts(){
  }

  public getPopularProducts(){
  }

  public getFeaturedProducts(){
  }


  get productDetails() : Product{
    return JSON.parse(localStorage.getItem("productDetails"));   
  }

  set productDetails(product : Product){
    // this.productDetails = product; 
    localStorage.setItem("productDetails", JSON.stringify(product)); 
  }

  public save(product: Product){
    // console.log("From save product input");
    // console.log(product);
    return this.http.post<Product>(`${this.productsURL}/save`, product);
  }


  public getProductsByUser(user: User): Observable<Product>{
    return from(this.products); 
  }

  public update(product: Product){
    console.log("product updated: ");
    console.log(product);
    
    
  }

}
