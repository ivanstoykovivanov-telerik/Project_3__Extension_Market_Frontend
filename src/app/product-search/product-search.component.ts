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
  searchedValue: string ; 



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
  
  
  //make it like the tags
  // onSubmit(){
  //   let searched: string = this.f.searched.value; 
  //   console.log("Searching for : ");
  //   console.log(searched);
      
  // }


  onSearch($event){
    let searched: string = $event.target.value; 
    console.log("Searching for : ");
    console.log(searched);
    
    this.searchedValue ="";
    
    this.searchService.searchProducts(searched)
      .subscribe(data => console.log(data)
      ); 

    // let tag: Tag = new Tag($event.target.value);  
    // console.log(tag);
    // this.tags.push(tag);
    // this.addTagValue ="";  
    // this.tagAddedEvent.emit(tag);
  }
}
