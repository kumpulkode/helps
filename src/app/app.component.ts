import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    gkey: string = "AIzaSyD-oMdz0k7vXKVsOlYs9HuGuhamFjeaK8s";
    lat: number = -7.0553899;
    lng: number = 110.3809564;
    searchText: string = "Find Location";
    listSaved = [];
    temp = [];
    ntemp = [];
    latlng = '';

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    onDragMarker(event){
        // console.log(event);
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;

        // this.searchText = this.temp;
        this.latToName();

    }

    addSaveLocation(){
        this.listSaved.push(this.searchText);
    }

    findLocation(){        
        this.nameToLat();
    }

    listShowMap(i){
        // console.log(this.listSaved[i]);
        this.searchText = this.listSaved[i];
        this.nameToLat();
    }

    latToName(){
        this.latlng = this.lat+','+this.lng;
        this.temp= [];
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +this.latlng+'&key='+this.gkey)
            .subscribe(data => { this.searchText = data['results']['0'].formatted_address});
    }
    nameToLat() {
        this.ntemp = [];
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +this.searchText.split(' ').join('+')+'&key=' + this.gkey)
            .subscribe(data => { this.lat = data['results']['0'].geometry.location.lat, this.lng = data['results']['0'].geometry.location.lng, this.searchText = data['results']['0'].formatted_address });
    }
}
