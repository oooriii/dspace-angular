/// <reference types="leaflet" />
import * as L from 'leaflet';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//import { latLng, tileLayer, MapOptions } from 'leaflet';
import { TranslateModule } from '@ngx-translate/core';

import { JsonPipe } from '@angular/common';


@Component({
  selector: 'ds-item-page-geo-map-field',
  templateUrl: './item-page-geo-map-field.component.html',
  styleUrls: ['./item-page-geo-map-field.component.scss'],
  standalone: true,
  imports: [LeafletModule, TranslateModule, JsonPipe]
})
//export class ItemPageGeoMapFieldComponent implements OnInit, AfterViewInit {
export class ItemPageGeoMapFieldComponent implements OnInit {
  @Input() item: Item;
  @Input() fields: string[] = ['dc.coverage.geolocation'];
  @Input() label = 'item.page.geomap';

  private map: L.Map;
  geoData: any[];

  /*
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
*/
options: L.MapOptions;

ngOnInit() {
  this.options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909)
  };
}


}