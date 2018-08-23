import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  
  carouselTitle: string  = "New Extensions" 

  constructor() { }

  ngOnInit() {
  }

}
