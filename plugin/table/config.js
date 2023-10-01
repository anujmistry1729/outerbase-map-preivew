import {Map, tileLayer, icon , featureGroup, marker, popup, latLng, LatLng} from 'leaflet';
import {MarkerClusterGroup} from 'leaflet.markercluster/src';

import { OuterbasePluginConfig } from "../config";
import { templateConfiguration } from "./view/config-view";
import { ATTRIBUTION, MAX_ZOOM_LEVEL, TILE_LAYER, continentsBoundingBox, ICON_URL } from '../constant';
export class OuterbasePluginTableConfiguration extends HTMLElement {
  static get observedAttributes() {
    return [
      "tablevalue",
      "configuration"
    ];
  }

  config = new OuterbasePluginConfig(JSON.parse(this.getAttribute("configuration")));
  clusterMarker = undefined

  constructor() {
    super();
    
    this.previewMarkers = [];
    this.config.tableValue = JSON.parse(this.getAttribute("tablevalue"))

    //attach shadow clone
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateConfiguration.content.cloneNode(true));
    
    const previewMapElement = this.shadowRoot.getElementById('preview-map');
    const latitudeKeySelect = this.shadow.getElementById("latitudeKeySelect");
    const longitudeKeySelect = this.shadow.getElementById("longitudeKeySelect");
    const clusteringInput = this.shadow.querySelector("#is-clustering");
    const iconURLInputEl = this.shadow.querySelector("#iconURL");
    const saveButton = this.shadow.getElementById("saveButton");

    this.previewMap = new Map(previewMapElement);
    
    this.previewMap.fitWorld();

    tileLayer(TILE_LAYER, {
      maxZoom: MAX_ZOOM_LEVEL,
      attribution: ATTRIBUTION
    }).addTo(this.previewMap);
    
    //get sampleData for preview
    this.sampleData = this.config.tableValue.length ? this.config.tableValue[0] : {};
    this.dataKeys = Object.keys(this.sampleData);
    let lat = this.sampleData[this.config.latitudeKey];
    let lng = this.sampleData[this.config.longitudeKey];
    
    console.log(this.config)
    
    //get options for select tag 
    let latitudeKeyOptions =   ` + ${this.dataKeys.map((key) => `<option value="${key}" ${key===this.config.latitudeKey ? 'selected' : '' }>${key}</option>`).join("")} + `;
    let longitudeKeyOptions = ` + ${this.dataKeys.map((key) => `<option value="${key}" ${key===this.config.longitudeKey ? 'selected' : '' }>${key}</option>`).join("")} + `;
    
    //dropdown options 
    this.shadow.querySelector("#latitudeKeySelect").innerHTML =latitudeKeyOptions;
    this.shadow.querySelector("#longitudeKeySelect").innerHTML =longitudeKeyOptions;
    
    //Latitude Select
    latitudeKeySelect.addEventListener("change", ()=>{
      this.config.latitudeKey = latitudeKeySelect.value;
      this.render();
    });

    //Longitude Select
    longitudeKeySelect.addEventListener("change", ()=>{
      this.config.longitudeKey = longitudeKeySelect.value;
      this.render();
    })

    //Clustering Toggle
    if(this.config.isClustering){
      clusteringInput.checked = this.config.isClustering
    }
    clusteringInput.addEventListener("change", ()=>{
      console.log(clusteringInput.checked)
      if (clusteringInput.checked) {
        this.config.isClustering = true;
      } else{
        this.config.isClustering = false;
      }
      this.render()
    })

    //url input
    if(this.config.iconurl){
      iconURLInputEl.value = this.config.iconurl
    }
    iconURLInputEl.addEventListener("input", ()=>{
      if(iconURLInputEl.value){
        this.config.iconurl = iconURLInputEl.value;
      }
      this.render()
    })

    //save and update config keys
    saveButton.addEventListener("click", () => {
      console.log(this.config.toJSON())
      this.callCustomEvent({
        action: "onsave",
        value: this.config.toJSON(),
      });
    });

  }

  connectedCallback() {
    // Manually render dynamic content
    this.render();
  }



  render() {
    console.log("Render condition", this.config.latitudeKey && this.config.longitudeKey)
    if(this.config.latitudeKey && this.config.longitudeKey){
      this.clearMarkers();
      this.addMarkers()
    }
    
  }


  clearMarkers() {
    this.previewMarkers.forEach(marker => {
        marker.removeFrom(this.previewMap);
    });
    if(this.clusterMarker != null){
      this.previewMap.removeLayer(this.clusterMarker)
    }
    this.previewMarkers = [];
}


//add previewMarkers to Map
addMarkers() {
    this.previewMarkers = this.createMarkersFromTableValue(5);

    if (this.previewMarkers.length === 0) {
        this.showNoMarkersPopup();
    } else {
        if(this.config.isClustering){
            
        this.clusterMarker = new MarkerClusterGroup();

        this.previewMarkers.map((singleMarker)=>{
            this.clusterMarker.addLayer(singleMarker);
        })

        this.previewMap.addLayer(this.clusterMarker)
        }else{

            const markerGroup = featureGroup(this.previewMarkers);
            markerGroup.addTo(this.previewMap)
        }
    }
}

//create previewMarkers from table value
createMarkersFromTableValue(numOfMarkers) {
    const tableValue = this.config.tableValue;

    if (tableValue.length === 0) {
        return [];
    } else {
        // TODO ADD CUSTOM ICON SUPPORT
        let markerIcon;
        if(this.config.iconurl){
            markerIcon = icon({
                iconUrl: this.config.iconurl,
                iconSize:[32,32]
            })
        }else{
            markerIcon = icon({
                iconUrl: ICON_URL,
            })
        }

        let markers = [];

        for (let index = 0; index < numOfMarkers; index++) {
          const lat = tableValue[index][this.config.latitudeKey];
          const lng = tableValue[index][this.config.longitudeKey];
          console.log(lat, lng)
          console.log(this.config)
          const latLng = new LatLng(parseFloat(lat), parseFloat(lng))
          markers.push(marker(latLng, { icon: markerIcon }).bindPopup(`<h3> ID: ${tableValue[index].id}</h3> <h4>Latitude: ${lat}</h4> <h4>Longitude: ${lng}</h4> `)) ;
        }

        return markers;
    }
}


  callCustomEvent(data) {
    const event = new CustomEvent("custom-change", {
      detail: data,
      bubbles: true, // If you want the event to bubble up through the DOM
      composed: true, // Allows the event to pass through shadow DOM boundaries
    });

    this.dispatchEvent(event);
  }

}
