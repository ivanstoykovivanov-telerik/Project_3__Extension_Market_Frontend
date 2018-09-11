import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';

/* 
 *   This component is used for both Upload Extension Page and the user's Update Extension  
*/


@Component({
  selector: 'app-upload-product-form',
  templateUrl: './upload-product-form.component.html',
  styleUrls: ['./upload-product-form.component.css']
})
export class UploadProductFormComponent implements OnInit {
    //  currentUser: User ; 
    
    @Input() product: Product; 
    @Input() filled: boolean = false; 
    @Output() onFormSubmitted = new EventEmitter<boolean>();  // for the modal in products of user comp 
    uploadProductForm: FormGroup;
    submitted = false;
    loading = false;  //making the submit button of the form active
    tags: Tag[] = []; 
    errorMessage: string; 
    binaryFileId: number;
    productPictureId: number; 
    tagsToSendToDB: string[]; 
    submitButtonDisabled: boolean = true;   // TODO: 
    githubPattern : string = "(?<remove>https:\\/\\/github\\.com\\/)(?<name>.*)";


  constructor(
      private formBuilder: FormBuilder, 
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private productService: ProductService, 
      private authService: AuthService,
    //   private tagService: TagService
  ) { }

  ngOnInit() {
        this.uploadProductForm = this.formBuilder.group({
          name: ['', Validators.required],          //TODO: Check if name is unique 
          description: ['', Validators.required],
          version: ['', Validators.minLength(1)],
          sourceRepositoryLink: ['',[ Validators.required, Validators.pattern(this.githubPattern)]], //TODO: github regex 
        });
        
        //get product data if in editting mode 
        if(this.filled){
            this.populateValues();
        }
        //this.tagService.observableTags.subscribe()
  }

  get f() { return this.uploadProductForm.controls; }

  
  checkIfProductNameIsUnique(name: string){
    //TODO:  check in DB 

  }

  checkIfGithubAccountExists(){
      
  }


  onSubmit() {
   
    this.submitted = true; // ??used in the form
    console.log("Product Submitted");
    
    // stop here if form is invalid
    if (this.uploadProductForm.invalid) {
      console.log("Invalid product form");
      return;
    }
    
    //create the product object
    let name = this.f.name.value;  
    let description = this.f.description.value;  
    let version = this.f.version.value; 
    let ownerId: number; 
    this.filled ? 
        ownerId = this.product.ownerId : 
        this.authService.currentUser.subscribe( user => ownerId = user.id) 
    let sourceRepositoryLink = this.f.sourceRepositoryLink.value;
    
    //handle files
    let fileId = this.binaryFileId ;
    
    //enable form submission
    if(fileId){
        this.submitButtonDisabled = false; 
    }

    let productPictureId = this.productPictureId; 

    let newTags = this.tags;
    let tagsToSend: string[] = this.tags.map(tag => tag.tagName); 
    console.log(tagsToSend);
    console.log("All Tags");
    console.log(newTags);
    
    //TODO: 
    let product: Product = new Product(
       name, description, 
        version, ownerId, sourceRepositoryLink, fileId, tagsToSend, productPictureId );   
    
    console.log('Product to submit: ');
    console.log(product);

    if ( this.filled){
        //UPDATE
        this.productService.update(product, this.product.id)
            .subscribe(); 
        //CLOSE THE MODAL, 
        this.onFormSubmitted.emit(true); 
    }else{
        //SAVE
        console.log(product);
        console.log("In Saving..");
        
        this.productService.save(product)
            .subscribe(
                data => console.log(data)
            );
        this.redirectToProductsOfUser(); //TODO: 
    } 
  }

    populateValues(){
        if(this.filled){
            this.f.name.setValue(this.product.name);
            this.f.description.setValue(this.product.description);
            this.f.version.setValue(this.product.version);
            this.f.fileId.setValue(this.product.fileId);
            this.f.sourceRepositoryLink.setValue(this.product.sourceRepositoryLink);
        }
    }
    
    receiveFileIdFromDB(event){
        console.log("FileID: ");
        console.log(event);
        this.binaryFileId = event; 
        
        // enable submission form 
        this.submitButtonDisabled = false; 
    }  


    receiveProductPictureId(event){
        console.log("ProductPictureID: ");
        console.log(event);
        this.productPictureId = event; 
    }

    receiveNewTag($event){
        console.log("Tag received: ");
        console.log($event);
        console.log(this.tags);
        this.tags.push($event); 
    }  

    deleteTag($event){
        console.log("Deleting tag");
        let tag = $event; 
        console.log(tag);
        this.tags = this.tags.filter(e => tag.tagName !== e.tagName); 
    }

    redirectToProductsOfUser(){
            this.router.navigate(['/home'], {relativeTo: this.activatedRoute}); 
    }

    onTagDeleted($event){
            let tag = $event; 
            this.tags = this.tags.filter(el => tag.tagName !== el.tagName); 
    }
 

}
