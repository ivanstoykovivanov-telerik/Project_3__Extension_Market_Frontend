import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  loginForm : FormGroup; 
  submitted = false; 
  errorMesssage : string;  
  
  constructor( 
    private formBuilder: FormBuilder, 
    private searchService : SearchService, 
    private router: Router
  ) { }


  ngOnInit() {
  }

  onSearch(){
    console.log("Searching for : ");
  }

}
