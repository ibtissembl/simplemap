import { Component, OnInit } from '@angular/core';
import 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
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
      private markerCoordinates: [number, number][] = [
        [36.7980, 10.1810],
        [36.8186, 10.2162],
        [36.8266, 10.2152],
        [36.8356, 10.2142],

      ]      
      private currentIndex = 0;
      private animationInterval: any;
      showMapForm = false;
      formdata:any={
    matricule: '',
    chauffeur: '',
    couleur: '',
    longitude: 0,// Initialisez à 0
    latitude: 0// Initialisez à 0
  };

  constructor(private http: HttpClient) {}

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
        const marqueurIcon = L.icon({
            iconUrl: 'assets/green.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          });
          this.markerCoordinates.forEach(coordinate => {
            L.marker(coordinate, { icon: marqueurIcon }).addTo(this.myMap);
          });
          this.myMap.on('click', (e: L.LeafletMouseEvent) => {
            // clique sur la map
            this.showMapForm = true;
            this.formdata.longitude = e.latlng.lng;
            this.formdata.latitude = e.latlng.lat;
          });
        }
      
        showForm(event: MouseEvent) {
          event.stopPropagation();
        }
      
       submitForm() {
          /// Gérez la soumission du formulaire 
          console.log('Formulaire soumis :', this.formdata);
      
          // Réinitialisez le formulaire et masquez-le.
          this.showMapForm = false;
          this.formdata= {
            matricule: '',
            chauffeur: '',
            couleur: '',
            longitude: 0,
            latitude: 0
       };
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
          }, 1000); }}
        
      SubmitForm() {
        this.http.post('http://localhost:8080/api/save',this.formdata).subscribe(
          response => {
            console.log('Données enregistrées avec succès :', response);
            
      
          },
        ) ;       
        }
      }
    
    
  