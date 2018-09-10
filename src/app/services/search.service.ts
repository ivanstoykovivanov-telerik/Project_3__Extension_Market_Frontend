import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public http: HttpClient) { }


  searchProducts(searched: string){
    console.log("In searchproducts");
    return this.http.post(`${AppComponent.API_URL}/search`, searched); 
  }

}
