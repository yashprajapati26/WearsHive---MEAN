import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // message: string = "9";
  totleProducts: number = 0;
  faCart = faShoppingCart;


  images = [
    { title: 'First Slide', short: 'First Slide Short', src: "../../../assets/slider1.jpg" },
    { title: 'Second Slide', short: 'Second Slide Short', src: "../../../assets/slider2.jpg" },
    { title: 'Third Slide', short: 'Third Slide Short', src: "../../../assets/slider3.jpg" }
  ];


  constructor(private title:Title,config: NgbCarouselConfig) { 
    config.interval = 20000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.title.setTitle("Wears Hive - Get Trending Products")
    
  }


}
