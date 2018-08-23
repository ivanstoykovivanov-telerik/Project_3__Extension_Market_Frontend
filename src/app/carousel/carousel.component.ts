import { Component, OnInit, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  imgags: string[];
  @Input() title: string; 

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  constructor() {}

  ngOnInit() {
    //these could be the products: 
    this.imgags = [
      'assets/bg.jpg',
      'assets/car.png',
      'assets/canberra.jpg',
      'assets/holi.jpg'
    ];

    this.carouselTileOne = {
      grid: { xs: 2, sm: 3, md: 4, lg: 6, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: false,  //make the points underneath active or not
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            background: #6b6b6b;
            padding: 5px;
            margin: 0 3px;
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
              border: 2px solid rgba(0, 0, 0, 0.55);
              transform: scale(1.2);
              background: transparent;
            }
        `
      },
      load: 2,
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

    this.carouselTileOneLoad();
  }

  onmoveFn(data) {
    // console.log(data);
  }

  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    // const len = 3; 
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileOneItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

}
