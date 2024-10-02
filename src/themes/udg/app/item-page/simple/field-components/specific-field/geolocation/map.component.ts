import { Component, AfterViewInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
//import { initializeLeafletMap } from './map-utils'; // Import the Leaflet initialization function

@Component({
  selector: 'ds-map',
  //template: '<div id="map" leaflet></div>',
  template: '<div id="map"></div>',
  styles: ['#map { height: 400px; width: 100%; }']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map;

  constructor(private ngZone: NgZone) {}
/*
  ngAfterViewInit() {
      this.map = initializeLeafletMap('map', [51.505, -0.09], 13);

      if (this.map === null) {
        // Handle the error (e.g., display an error message)
        console.error('Error initializing Leaflet map.');
      } else {
        // Map initialized successfully
        console.log('Leaflet map initialized!');
      }
  }
  */

  ngAfterViewInit(): void {
    //setTimeout(() => {
      this.initMap();
    //}, 1000);
  }

  private initMap(): void {
    // Run Leaflet initialization outside of Angular's zone
    this.ngZone.runOutsideAngular(() => {
      this.map = L.map('map').setView([51.505, -0.09], 13);

      console.log(this.map);


      /*
      // Define tile layers
      const openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        });
  
        const openTopoMapLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenTopoMap contributors'
        });
  
        const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        });
  

      const marker = L.marker([51.5, -0.09]).addTo(this.map);
      marker.setIcon(L.icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
        iconUrl: 'images/marker-icon.png',
        shadowUrl: 'images/marker-shadow.png'
      }));

      // Add layer control to toggle between layers
      L.control.layers({
          'OpenStreetMap': openStreetMapLayer,
          'OpenTopoMap': openTopoMapLayer,
          'CartoDB': cartoDBLayer
        }).addTo(this.map);

      //L.marker([51.5, -0.09]).addTo(this.map);
      */



      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      
      L.marker([51.5, -0.09]).addTo(this.map)
          .bindPopup('A pretty CSS popup.<br> Easily customizable.')
          .openPopup();

      this.map.on('ready', () => {
        console.log('Map is ready');
      });
      this.map.on('click', (e) => {
        console.log(e.latlng);
      });
      this.map.on('moveend', () => {
        console.log(this.map.getCenter());
      });
      // map events dragend
      this.map.on('dragend', () => {
        console.log(this.map.getCenter());
      });
      // get element by id map
      const map2 = document.getElementById('map');
      console.log(map2);
    });

    console.log(this.map.getCenter());

    // Refresh the map's size
    this.map.invalidateSize();
    
  }


}