import { Component, OnInit, Input } from '@angular/core';
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
        //   productState: ['', [ Validators.email] ],
        //   password: ['', [ Validators.minLength(3)]],
        //   confirm_password: ['', [ Validators.minLength(3), this.passwordValidator]]
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
    
    console.log('REGISTERED FORM SUBMITTED: ');
    console.log(this.f.username.value);
    console.log(this.f.email.value);
     //TODO: 
    let firstName = this.f.firstName.value;  
    let lastName = this.f.lastName.value;  
    let username = this.f.username.value; 
    let email = this.f.email.value; 
    let password = this.f.password.value;
    let active = true; 
  
    //TODO: 
  //  let product: Product = new Product();   
   // let user: User = new User(username, password, firstName, lastName, email, active);  
    // console.log(product);
    
    // this.register(product);   
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
        console.log("Populating");
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
