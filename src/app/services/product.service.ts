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


  constructor(
    private http: HttpClient
  ) { }


  set productDetails(product : Product){
    // this.productDetails = product;
    localStorage.setItem("productDetails", JSON.stringify(product));
  }


  public getProducts(sortedBy: string){
    //TODO: change to top10
    let params = new HttpParams().set('sortBy', sortedBy);
    return this.http.get<Product[]>(AppComponent.API_URL + "/products", { params: params });
  }


  public getAllProducts(){
    return this.http.get<Product[]>(AppComponent.API_URL+"/products")
  }


  public getProductById(id : number){
    return this.http.get<Product>(`${AppComponent.API_URL}/products/${id}`); 
  }  


  public getProductByName(){
    // return this.http.get<Product>(AppComponent.API_URL+"/products")  
  } 


  public deleteProduct(product: Product){
    return this.http.delete<Product>(`${AppComponent.API_URL}/admin/products/delete/${product.id}`); 
  }

  
  public deleteUserProduct(product: Product){
    return this.http.delete<Product>(`${AppComponent.API_URL}/products/delete/${product.id}`); 
  }


  //TODO:
  public save(product: Product){
    console.log("Save product service");
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
