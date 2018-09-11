import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.css']
})
export class UploadProductComponent implements OnInit {
    registerForm: FormGroup;
    @Input() product: Product; 
    filled: boolean; 
    errorMessage: string; 
 
    constructor(
        private formBuilder: FormBuilder, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) { }
 
    ngOnInit() {
        this.filled = false; 
    }

}
