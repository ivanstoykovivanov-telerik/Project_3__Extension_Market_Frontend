import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-upload-product-form',
  templateUrl: './upload-product-form.component.html',
  styleUrls: ['./upload-product-form.component.css']
})
export class UploadProductFormComponent implements OnInit {
    // This component is used for both Upload Extension Page , and the user's extension card 
    
    @Input() product: Product; 
    @Input() filled: boolean = false; 
    @Output() onFormSubmitted = new EventEmitter<boolean>();  // for the modal in products of user comp 
    uploadProductForm: FormGroup;
    submitted = false;
    loading = false;  //making the submit button of the form active
    tags: Tag[] = []; 
    //  currentUser: User ; 
    errorMessage: string; 

  constructor(
      private formBuilder: FormBuilder, 
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private productService: ProductService, 
      private authService: AuthService,
      private tagService: TagService
  ) { }

  ngOnInit() {
        this.uploadProductForm = this.formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          version: ['', Validators.minLength(3)],
          downloadLink: ['', Validators.minLength(3)],
          sourceRepositoryLink: ['', Validators.minLength(3)],
        });
        
        //get product data if in  editting mode 
        if(this.filled){
            this.populateValues();
        }

        //this.tagService.observableTags.subscribe()
  }

    // a getter for easy access to form fields
  get f() { return this.uploadProductForm.controls; }
  
  

  onSubmit() {
    this.submitted = true;
    console.log("Product Submitted");
    
    // stop here if form is invalid
    if (this.uploadProductForm.invalid) {
      console.log("Invalid product form");
      return;
    }

    let name = this.f.name.value;  
    let description = this.f.description.value;  
    //get the current user : 
    let owner: User; 
    this.filled ?  
        owner = this.product.owner
        : 
        this.authService.currentUser.subscribe( user => owner = user) 
    let version = this.f.version.value; 
    let downloadLink = this.f.downloadLink.value; 
    let sourceRepositoryLink = this.f.sourceRepositoryLink.value;
    
    //TODO:  
    let tags = this.tags; 
    let product: Product = new Product(name, description, version, owner, downloadLink,sourceRepositoryLink, tags);   
    console.log('Product to submit: ');
    console.log(product);

    //SAVE OR UPDATE PRODUCT TODO:
    if ( this.filled){
        //UPDATE
        this.productService.update(product)
            .subscribe(); 
        //CLOSE THE MODAL, 
        this.onFormSubmitted.emit(true); 
    }else{
        //SAVE
        this.productService.save(product)
            .subscribe(); 
    } 

  }

    populateValues(){
        if(this.filled){
            this.f.name.setValue(this.product.name);
            this.f.description.setValue(this.product.description);
            this.f.version.setValue(this.product.version);
            this.f.downloadLink.setValue(this.product.downloadLink);
            this.f.sourceRepositoryLink.setValue(this.product.sourceRepositoryLink);
             //TODO: 
        }
    }
  
  receiveNewTag($event){
      console.log("Tag received: ");
      console.log($event);
      this.tags.push($event); 
    }  

    deleteTag($event){
      console.log("Deleting tag");
      let tag = $event; 
      console.log(tag);
      this.tags = this.tags.filter(e => tag.tagName !== e.tagName); 
    }

  movetToLogin(){
      this.router.navigate(['../login'], {relativeTo: this.activatedRoute}); 
  }

  onTagDeleted($event){
    let tag = $event; 
    this.tags = this.tags.filter(el => tag.tagName !== el.tagName); 
  }

}
