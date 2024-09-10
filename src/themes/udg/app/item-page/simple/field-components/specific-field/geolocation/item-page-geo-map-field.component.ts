import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Item } from '../../../../../../../../app/core/shared/item.model';

@Component({
  selector: 'ds-item-page-geo-map-field',
  templateUrl: './item-page-geo-map-field.component.html',
  styleUrls: ['./item-page-geo-map-field.component.scss']
})
export class ItemPageGeoMapFieldComponent implements OnInit, AfterViewInit {
  @Input() item: Item;
  @Input() fields: string[] = ['dc.coverage.geolocation'];
  @Input() label = 'item.page.geomap';

  private map: L.Map;
  geoData: any[];

  ngOnInit() {
    this.geoData = this.genLocalizationJSON();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  private genLocalizationJSON(): any[] {
    // Implementation of genLocalizationJSON
    return [];
  } 
}