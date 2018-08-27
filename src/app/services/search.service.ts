import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  public search(prouctName: string){
    return "Product Name"; 
  }
}
