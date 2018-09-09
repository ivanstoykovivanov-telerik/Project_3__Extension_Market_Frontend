import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public http: HttpClient) { }

  // public search(prouctName: string){
  //   return "Product Name"; 
  // }

  searchProducts(searched: string){
    console.log("searched");
    return this.http.post(`${AppComponent.API_URL}/search`, searched); 
  }

}
