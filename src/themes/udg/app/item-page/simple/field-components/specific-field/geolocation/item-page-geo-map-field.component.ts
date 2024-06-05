//import { Component } from '@angular/core';
//import { Component, Input, OnInit } from '@angular/core';
//import { Component, Input} from '@angular/core';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
//import { leaflet } from 'leaflet';
//import { tileLayer, latLng, control, marker, icon, divIcon, LatLngBounds, Map, MapOptions } from 'leaflet';
//import type * as L from 'leaflet';
import L from 'leaflet';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import {
  ItemPageFieldComponent
} from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';


//import { GeoMapModule } from './geo-map.module';

//import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'ds-item-page-geomap-field',
  styleUrls: ['./item-page-geo-map-field.component.scss'],
  templateUrl: './item-page-geo-map-field.component.html',
})
//export class ItemPageGeoMapFieldComponent extends ItemPageFieldComponent implements OnInit {
  export class ItemPageGeoMapFieldComponent extends ItemPageFieldComponent{

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   * In this component, we want to display values for metadata 'dc.coverage.geolocation'
   */
  fields: string[] = [
    'dc.coverage.geolocation'
  ];

  /**
   * Label i18n key for the rendered metadata
   */
  label = 'item.page.geomap';


  /***
   * geo data
   */
  geoData: string[];

  /**
   *  geo json
   */
  //geoJSON: Object;

/* google maps
  lat = 48.75606;
  lng = -118.859;

  selectedMarker = null;

  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }
  ];
*/

private map!: L.Map;

markers: L.Marker[] = [
  L.marker([31.9539, 35.9106]), // Amman
  L.marker([32.5568, 35.8469]) // Irbid
];

 /**
   * gen Localizations json
   *
   * @param values                    metadata values
   */
genLocalizationJSON(): string[] {
  let values = this.item.allMetadataValues(this.fields);
  let data = [];

  values.forEach(element => {
    //let geoObj;
    //console.log(element);
    let temp = element.split('; ');
    //console.log(temp);

    if (temp.length > 1){
      let lat = temp[0].split('=');
      let long = temp[1].split('=');
      let name = temp[2].split('=');

      /*
      geoObj.lat = lat[1];
      geoObj.long = long[1];
      geoObj.name = name[1];
      */

      let geoObj = {lat: lat[1], long: long[1], name:name[1]};
      //data.push(element);
      data.push(geoObj);
      //console.log(element);
    }

  });
  return data;
}

ngOnInit(): void {
  //console.log('GEOLOCATION!');
  this.geoData = this.genLocalizationJSON();
  //console.log(this.geoData);
}



/* google maps
addMarker(lat: number, lng: number) {
  this.markers.push({ lat, lng, alpha: 0.4 });
}

max(coordType: 'lat' | 'lng'): number {
  return Math.max(...this.markers.map(marker => marker[coordType]));
}

min(coordType: 'lat' | 'lng'): number {
  return Math.min(...this.markers.map(marker => marker[coordType]));
}

selectMarker(event) {
  this.selectedMarker = {
    lat: event.latitude,
    lng: event.longitude
  };
}
*/

ngAfterViewInit() {
  console.log('GEOLOCATION!');
  this.initializeMap();
  this.addMarkers();
  this.centerMap();
}


private initializeMap() {
  const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  this.map = L.map('map');
  L.tileLayer(baseMapURl).addTo(this.map);
  console.log('GEOLOCATION!222222');
}


private addMarkers() {
  // Add your markers to the map
  this.markers.forEach(marker => marker.addTo(this.map));
  console.log('GEOLOCATION!33333333');
}

private centerMap() {
  // Create a LatLngBounds object to encompass all the marker locations
  const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
  // Fit the map view to the bounds
  this.map.fitBounds(bounds);
  console.log('GEOLOCATION!44444444');
}

}
