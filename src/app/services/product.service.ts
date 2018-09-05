import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  
 // For test purposes: 
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

  constructor(
    private http: HttpClient
  ) { }  
  
  
  public getProducts(sortedBy: string){
    
    //TODO: change to top10 
    let params = new HttpParams().set('sortBy', sortedBy);
    
    return this.http.get<Product[]>(AppComponent.API_URL + "/products", { params: params }); 

          
    // TEST
    // const productsAsObservable = from(this.products);
    // return productsAsObservable; 
    //return this.http.get<Product[]>(this.productsURL);
  }

  public getAllProducts(){
    return this.http.get<Product[]>(AppComponent.API_URL+"/products")
  }


  get productDetails() : Product{
    return JSON.parse(localStorage.getItem("productDetails"));   
  }

  set productDetails(product : Product){
    // this.productDetails = product; 
    localStorage.setItem("productDetails", JSON.stringify(product)); 
  }


  //TODO: 
  public save(product: Product){
    console.log("From save product input");
    console.log(product);
    return this.http.post(AppComponent.API_URL + "/products/add",  product);
  }

  //TODO: 
  public getProductsByUser(userID: number): Observable<Product[]>{
    // let params = new HttpParams().set('id', userID.toString());
    
    return this.http.get<Product[]>(`${AppComponent.API_URL}/users/products/${userID}`); 
  }


  //TODO:
  public update(product: Product, id: number){
    console.log("product updating: ");
    console.log(product.id);
    console.log(id);
    return this.http.post<Product>(`${AppComponent.API_URL}/products/update/${id}`, product); 
  }

}
