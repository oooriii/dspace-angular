/// <reference types="leaflet" />
import * as L from 'leaflet';
import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { MetadataValue } from '../../../../../../../../app/core/shared/metadata.models';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TranslateModule } from '@ngx-translate/core';

interface GeolocationData {
  latitude: number;
  longitude: number;
  label?: string;
  isValid: boolean;
}


@Component({
  selector: 'ds-item-page-geo-map-field',
  templateUrl: './item-page-geo-map-field.component.html',
  styleUrls: ['./item-page-geo-map-field.component.scss'],
  standalone: true,
  imports: [CommonModule, LeafletModule, TranslateModule]
})
export class ItemPageGeoMapFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() item: Item;
  @Input() fields: string[] = ['dc.coverage.geolocation'];
  @Input() label = 'item.page.geomap';

  private map: L.Map;
  geoData: GeolocationData[] = [];
  mapOptions: L.MapOptions;
  hasValidCoordinates = false;

  ngOnInit(): void {
    this.parseGeolocationMetadata();
    this.initMapOptions();
  }

  ngAfterViewInit(): void {
    if (this.hasValidCoordinates) {
      setTimeout(() => this.initMap(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private parseGeolocationMetadata(): void {
    if (!this.item) {
      return;
    }

    const geoMetadata: MetadataValue[] = this.item.allMetadata(this.fields);
    this.geoData = [];

    geoMetadata.forEach((metadata) => {
      const parsed = this.parseCoordinates(metadata.value);
      if (parsed.isValid) {
        this.geoData.push(parsed);
      }
    });

    this.hasValidCoordinates = this.geoData.length > 0;
  }

  private parseCoordinates(value: string): GeolocationData {
    if (!value || typeof value !== 'string') {
      return { latitude: 0, longitude: 0, isValid: false };
    }

    // Remove extra whitespace and normalize
    const cleaned = value.trim();
    
    // Support multiple formats:
    // "41.9028,2.1734"
    // "Barcelona: 41.9028,2.1734"
    // "41.9028, 2.1734"
    // "lat:41.9028,lng:2.1734"
    
    let coords: string;
    let label: string | undefined;
    
    if (cleaned.includes(':')) {
      const parts = cleaned.split(':');
      if (parts.length === 2) {
        label = parts[0].trim();
        coords = parts[1].trim();
      } else {
        // Handle lat:41.9028,lng:2.1734 format
        const coordMatch = cleaned.match(/lat\s*:\s*([\d.-]+)\s*,\s*lng\s*:\s*([\d.-]+)/i);
        if (coordMatch) {
          const lat = parseFloat(coordMatch[1]);
          const lng = parseFloat(coordMatch[2]);
          return this.validateCoordinates(lat, lng, label);
        }
        coords = cleaned;
      }
    } else {
      coords = cleaned;
    }
    
    // Parse coordinate pair
    const coordParts = coords.split(',').map(part => part.trim());
    if (coordParts.length !== 2) {
      return { latitude: 0, longitude: 0, isValid: false };
    }
    
    const latitude = parseFloat(coordParts[0]);
    const longitude = parseFloat(coordParts[1]);
    
    return this.validateCoordinates(latitude, longitude, label);
  }

  private validateCoordinates(lat: number, lng: number, label?: string): GeolocationData {
    const isValidLat = !isNaN(lat) && lat >= -90 && lat <= 90;
    const isValidLng = !isNaN(lng) && lng >= -180 && lng <= 180;
    
    return {
      latitude: lat,
      longitude: lng,
      label,
      isValid: isValidLat && isValidLng
    };
  }

  private initMapOptions(): void {
    // Default center (Girona, Spain - appropriate for UDG)
    let center: L.LatLngExpression = [41.9794, 2.8214]; // Girona coordinates
    let zoom = 10;

    // If we have valid coordinates, center on first location
    if (this.hasValidCoordinates && this.geoData.length > 0) {
      const firstLocation = this.geoData[0];
      center = [firstLocation.latitude, firstLocation.longitude];
      zoom = this.geoData.length === 1 ? 12 : 8; // Closer zoom for single location
    }

    this.mapOptions = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ],
      zoom,
      center: L.latLng(center[0], center[1])
    };
  }

  private initMap(): void {
    const mapElement = document.getElementById('geomap');
    if (!mapElement) {
      console.error('Map container element not found');
      return;
    }

    try {
      this.map = L.map('geomap', this.mapOptions);
      
      // Add markers for all valid locations
      this.addMarkersToMap();
      
      // Fit map bounds if multiple locations
      if (this.geoData.length > 1) {
        this.fitMapBounds();
      }
      
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private addMarkersToMap(): void {
    if (!this.map || !this.geoData.length) {
      return;
    }

    this.geoData.forEach((location, index) => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(this.map);
      
      // Create popup content
      const popupContent = this.createPopupContent(location, index);
      marker.bindPopup(popupContent);
      
      // Open first popup if only one location
      if (this.geoData.length === 1) {
        marker.openPopup();
      }
    });
  }

  private createPopupContent(location: GeolocationData, index: number): string {
    const title = location.label || `Location ${index + 1}`;
    const coords = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
    
    return `
      <div class="geomap-popup">
        <strong>${title}</strong><br>
        <small>Coordinates: ${coords}</small>
      </div>
    `;
  }

  private fitMapBounds(): void {
    if (!this.map || this.geoData.length <= 1) {
      return;
    }

    const group = new L.FeatureGroup();
    this.geoData.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude]);
      group.addLayer(marker);
    });
    
    this.map.fitBounds(group.getBounds().pad(0.1));
  }


}