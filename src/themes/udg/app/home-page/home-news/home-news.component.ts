import { Component, OnInit } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  //styleUrls: ['../../../../../app/home-page/home-news/home-news.component.scss'],
  templateUrl: './home-news.component.html'
  //templateUrl: '../../../../../app/home-page/home-news/home-news.component.html'
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent implements OnInit {
  /*
  images: string[] = [
    '/assets/udg/images/banner/claustre_udg.jpg',
    '/assets/udg/images/banner/dret.jpg',
    '/assets/udg/images/banner/girona.jpg',
    '/assets/udg/images/banner/lletres.jpg'
  ];
  */
  images: string[] = [
    '/assets/udg/images/banner/girona_1.jpg',
    '/assets/udg/images/banner/girona_2.jpg',
    '/assets/udg/images/banner/girona_3.jpg',
    '/assets/udg/images/banner/girona_4.jpg',
    '/assets/udg/images/banner/b_bvell.jpg',
    '/assets/udg/images/banner/b_montilivi.jpg'
  ];
  selectedImage: string;


  ngOnInit(): void {
    this.setRandomImage();
  }

  setRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[randomIndex];
  }
}
