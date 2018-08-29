import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Product } from '../models/product.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  @Input() product: Product;
  @Input() editMode;    //when true the edit button is visualized
  icons: string[] ; 
  icon: string; 
  productToEdit: Product; 
  filled : boolean ; 
  modalRef: BsModalRef;
 

  constructor( 
    private router: Router, 
    private productService: ProductService , 
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    // this.product = this.productService.product; 
    
    //A list of random icons
    this.icons = [
      "fa fa-car", 
      "fa fa-binoculars", 
      "fa fa-bell-o", 
      "fa fa-bicycle", 
      "fa fa-briefcase", 
      "fa fa-bath", 
      "fa fa-meetup", 
      "fa fa-microchip", 
      "fa fa-podcast",
      "fa fa-free-code-camp",
      "fa fa-eercast", 
      "fa fa-university",
      "fa fa-caret-square-o-down"
    ]; 
    
    this.icon = this.getRandomIcon()
  }

  productClicked(product : Product){
    this.data = product; 
    this.router.navigate(['/productDetails']);
  }

  get data(): Product { 
    return this.productService.productDetails; 
  } 
  set data(value: Product) { 
    this.productService.productDetails = value; 
  }

  getRandomIcon(){
    let icon = this.icons[Math.floor(Math.random() * this.icons.length)]; 
    return icon; 
  }

  onEditClicked(event){
    event.stopPropagation();
    this.productToEdit = this.product; 
    
    //this.filled = true; 
    //open edit Product modal
    //this.router.navigate(['/home']); 
  }

  // closeMod($event){
  //   if($event == true ){
  //     lgModal.hide(); 
  //   }
  // }

  // closeModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.hide(template);
  //   this.modalRef = this.modalService.hide(template);
  // }
  
}
