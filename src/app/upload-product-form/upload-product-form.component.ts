import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-upload-product-form',
  templateUrl: './upload-product-form.component.html',
  styleUrls: ['./upload-product-form.component.css']
})
export class UploadProductFormComponent implements OnInit {
    @Input() product: Product; 
    @Input() filled: boolean = false; 
    @Output() onFormSubmitted = new EventEmitter<boolean>();   
    uploadExtensionForm: FormGroup;
    submitted = false;
    loading = false;  //making the submit button of the form active
  
  //user: User ; 
  errorMessage: string; 

  constructor(
      private formBuilder: FormBuilder, 
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private productService: ProductService
  ) { }

  ngOnInit() {
        this.uploadExtensionForm = this.formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          version: ['', Validators.minLength(3)],
          downloadLink: ['', Validators.minLength(3)],
          sourceRepositoryLink: ['', Validators.minLength(3)],
        });

        this.populateValues();
         
  }

  // a getter for easy access to form fields
  get f() { return this.uploadExtensionForm.controls; }
  

  //confirm if password and repeated password match 
  passwordValidator(control: AbstractControl) {
      if (control && (control.value !== null || control.value !== undefined)) {
          const cnfpassValue = control.value;
  
          const passControl = control.root.get('password'); // magic is this
          if (passControl) {
              const passValue = passControl.value;
              if (passValue !== cnfpassValue || passValue === '') {
                  return {
                      isError: true
                  };
              }
          }
      }
      return null;
  }

  onSubmit() {
    this.submitted = true;
    console.log("Submitted");
    
    // stop here if form is invalid
    if (this.uploadExtensionForm.invalid) {
      console.log("Invalid registration form");
      return;
    }
    
   
     //TODO: 
    let name = this.f.name.value;  
    let description = this.f.description.value;  
    let owner = this.product.owner; 
    let version = this.f.version.value; 
    let downloadLink = this.f.downloadLink.value; 
    let sourceRepositoryLink = this.f.sourceRepositoryLink.value;
    let tags = this.product.tags; 
  
    //TODO: 
    let product: Product = new Product(name, description, version, owner, downloadLink,sourceRepositoryLink, tags);   
    console.log('Product updated : ');
    console.log(product);
    //UPDATE PRODUCT
    this.productService.update(product); 

    //CLOSE THE MODAL
    this.onFormSubmitted.emit(true); 

  }

  register(product: Product) {
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
       //console.log("Populating");
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
