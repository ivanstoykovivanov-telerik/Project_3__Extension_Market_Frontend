import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public http: HttpClient
  ) { }


  public getAllUsers(){
    return this.http.get<User[]>(AppComponent.API_URL + '/admin/users/listAll' );
  }

  public disableUser(user: User){
    return this.http.post(`${AppComponent.API_URL}/admin/users/disableUser/${user.id}`, {}); 
  }

  public enableUser(user: User){
    return this.http.post(`${AppComponent.API_URL}/admin/users/enableUser/${user.id}`, {}); 
  } 

  public approveProduct(product: Product){
    console.log("In");
    return this.http.post(`${AppComponent.API_URL}/admin/products/approve/${product.id}`, {}); 
  }

  public getAllProducts(){
    return this.http.get<Product[]>(`${AppComponent.API_URL}/admin/products/listAll`); 
  }

  public deactivateProduct(product: Product){
    console.log("In");
    return this.http.post(`${AppComponent.API_URL}/admin/products/disable/${product.id}`, {}); 
  }

  public activateProduct(product: Product){
    console.log("In");
    return this.http.post(`${AppComponent.API_URL}/admin/products/approve/${product.id}`, {}); 
  }

  public featureProduct(product: Product){
    console.log("In");
    return this.http.post(`${AppComponent.API_URL}/admin/products/feature/${product.id}`, {}); 
  }

  public unFeatureProduct(product: Product){
    console.log("In");
    return this.http.post(`${AppComponent.API_URL}/admin/products/unfeature/${product.id}`, {}); 
  }

}
