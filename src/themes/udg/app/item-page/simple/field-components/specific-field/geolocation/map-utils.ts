   // map-utils.ts
   import * as L from 'leaflet';
   import { fromEvent } from 'rxjs';
   import { map, catchError } from 'rxjs/operators';

   export function initializeLeafletMap(mapContainerId: string, center: [number, number], zoom: number) {
     try {
       const map = L.map(mapContainerId).setView(center, zoom);

       // ... (add layers and markers) ...

       // Handle dragend event asynchronously
       fromEvent(map, 'dragend').pipe(
         map(() => 'Map dragged!'),
         catchError(error => {
           console.error('Error handling dragend event:', error);
           return []; // Return an empty array to prevent errors from propagating
         })
       ).subscribe(message => console.log(message));

       return map;
     } catch (error) {
       console.error('Error initializing Leaflet map:', error);
       return null; // Return null to indicate an error
     }
   }