import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-upload-product-form',
  templateUrl: './upload-product-form.component.html',
  styleUrls: ['./upload-product-form.component.css']
})
export class UploadProductFormComponent implements OnInit {
    // This component is used for both Upload Extension Page , and the user's extension card 
    
    @Input() product: Product; 
    @Input() filled: boolean = false; 
    @Output() onFormSubmitted = new EventEmitter<boolean>();  // for the modal
    uploadProductForm: FormGroup;
    submitted = false;
    loading = false;  //making the submit button of the form active
  
    //  currentUser: User ; 
    errorMessage: string; 

  constructor(
      private formBuilder: FormBuilder, 
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private productService: ProductService, 
      private authService: AuthService
  ) { }

  ngOnInit() {
        this.uploadProductForm = this.formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          version: ['', Validators.minLength(3)],
          downloadLink: ['', Validators.minLength(3)],
          sourceRepositoryLink: ['', Validators.minLength(3)],
        });

        this.populateValues();
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
    let owner: User ; // //TODO: current user ? 
    this.filled == false  ?  
        this.authService.currentUser.subscribe( user => owner = user) : 
        owner = this.product.owner; 
    let version = this.f.version.value; 
    let downloadLink = this.f.downloadLink.value; 
    let sourceRepositoryLink = this.f.sourceRepositoryLink.value;
    //TODO: 
    let tags = this.product.tags; 
    

    let product: Product = new Product(name, description, version, owner, downloadLink,sourceRepositoryLink, tags);   
    console.log('Product to submit: ');
    console.log(product);
    
    



    //UPDATE PRODUCT TODO:
   this.productService.update(product); 
    //CLOSE THE MODAL , check where we are
    this.onFormSubmitted.emit(true); 

  }

  create(product: Product) {
    //TODO:  
    //this.productService 

    // this.accountService.createAccount(user).subscribe(data => {
      //     this.router.navigate(['/login']);
      //     console.log("Account created successfully");
      //   }, err => {
      //     console.log(err);
      //     this.errorMessage = "username already exist";
      //   }
      // )
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

  movetToLogin(){
      this.router.navigate(['../login'], {relativeTo: this.activatedRoute}); 
  }

}
