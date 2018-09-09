import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  searchForm : FormGroup; 
  submitted = false; 
  errorMesssage : string;  
  searchedValue: string ; 
  foundProducts: Product[] = []; 
  isSearching: boolean = false; 
  searchingFor: string; 

  constructor( 
    private formBuilder: FormBuilder, 
    private searchService : SearchService, 
    private router: Router
  ) { }


  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searched: ['', [ Validators.minLength(3) ]]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }
  

  onSearch($event){
    let searched: string = $event.target.value; 
    this.searchingFor = searched; 
    console.log("Searching for : ");
    console.log(searched);
    
    
    this.searchService.searchProducts(searched)
      .subscribe((data: any) => {
        console.log(data); 
        this.foundProducts = data; 
        this.isSearching = true; 
        console.log(this.foundProducts);
        } 
      ); 
  this.searchedValue ="";
  
  }
}
