import { Component, OnInit } from '@angular/core';
import  'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simplemap';
    private myMap: any;
    private vehicleMarker: any;
    private pathCoordinates: [number, number][] = [
      [36.7998, 10.1830],
      [36.8268, 10.1850],
      [36.8320, 10.1888],
      [36.8885, 10.1899],
      [36.8900, 10.1910],
      [36.8950, 10.1955],

      [36.7998,10.1830]
    ];
    private currentIndex = 0;
    private animationInterval: any;
  
    ngOnInit() {
      this.myMap = L.map('map').setView([36.8065, 10.1815], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.myMap);
      // Créer une icône personnalisée pour le marqueur 
      const customIcon = L.icon({
        iconUrl: 'assets/vehicle-icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
  
      this.vehicleMarker = L.marker([36.7998, 10.1830], { icon: customIcon }).addTo(this.myMap);
    }
  
    startAnimation() {
      if (!this.animationInterval) {
        this.animationInterval = setInterval(() => {
          this.currentIndex++;
          if (this.currentIndex < this.pathCoordinates.length) {
            const newCoordinate = this.pathCoordinates[this.currentIndex];
            this.vehicleMarker.setLatLng(newCoordinate);
            this.myMap.panTo(newCoordinate);
          } else {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
            this.currentIndex = 0;
            console.log('Animation terminée.');
          }
        }, 1000); 
      }
    }
  }
  