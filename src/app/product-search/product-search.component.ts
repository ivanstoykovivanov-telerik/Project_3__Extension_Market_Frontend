import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  searchForm : FormGroup; 
  submitted = false; 
  errorMesssage : string;  
  
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
  
  // onSearch(){
  //   console.log("Searching for : ");
  // }
  
  onSubmit(){
    let searched: string = this.f.searched.value; 
    console.log("Searching for : ");
    console.log(searched);
    
    //Connect to search service
    //this.searchService.search(searched)
      
  }
}
