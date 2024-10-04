import { Component, OnInit } from '@angular/core';
import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';

@Component({
  selector: 'ds-top-level-community-list',
  styleUrls: ['./top-level-community-list.component.scss'],
  //styleUrls: ['../../../../../app/home-page/top-level-community-list/top-level-community-list.component.scss'],
  templateUrl: './top-level-community-list.component.html'
  //templateUrl: '../../../../../app/home-page/top-level-community-list/top-level-community-list.component.html'
})
export class TopLevelCommunityListComponent extends BaseComponent implements OnInit {
  images: string[] = [
    '/assets/images/claustre.jpg',
    '/assets/images/dret.jpg',
    '/assets/images/girona.jpg',
    '/assets/images/lletres.jpg'
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

