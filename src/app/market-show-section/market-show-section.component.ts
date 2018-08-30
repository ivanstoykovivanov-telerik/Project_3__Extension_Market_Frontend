import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-market-show-section',
  templateUrl: './market-show-section.component.html',
  styleUrls: ['./market-show-section.component.css']
})
export class MarketShowSectionComponent implements OnInit {

  @Input() carouselTitle: string; 
  @Input() sortedBy: string 

  products: Product[] = []; 

  constructor(
    private productService : ProductService 
  ) { }

  ngOnInit() {
    
    //GET PRODUCTS 
    //OLD VERSION : 
    // this.productService.getProducts(this.sortedBy)
    //   .subscribe(
    //     data => this.products.push(data) 
    //   )
      
    //   console.log(this.products);

    //GET PRODUCTS 
    this.productService.getAllProducts()
      .subscribe( 
        data => {
          this.products = data; 
          console.log(data); 
        }
      
      );
  }

}
