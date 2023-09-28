import {Map, tileLayer, icon , featureGroup, marker, popup} from 'leaflet';

import { OuterbasePluginConfig } from "../config";
import { renderMapSingleLatLng } from "../map/renderMapSingleLatLng";
import { templateConfiguration } from "./view/config-view";
import { ATTRIBUTION, MAX_ZOOM_LEVEL, TILE_LAYER, continentsBoundingBox } from '../constant';
export class OuterbasePluginTableConfiguration extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig(JSON.parse(this.getAttribute("configuration")));
  items = JSON.parse(this.getAttribute("tableValue"));

  constructor() {
    super();

    //attach shadow clone
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateConfiguration.content.cloneNode(true));

    //get sample data for preview
    let sample = this.items.length ? this.items[0] : {};
    let keys = Object.keys(sample);
    let lat = sample[this.config.latitudeKey];
    let lng = sample[this.config.longitudeKey];

    console.log(this.config)

    //get options for select tag 
    let latitudeKeyOptions =   ` + ${keys.map((key) => `<option value="${key}" ${key===this.config.latitudeKey ? 'selected' : '' }>${key}</option>`).join("")} + `;
    let longitudeKeyOptions = ` + ${keys.map((key) => `<option value="${key}" ${key===this.config.longitudeKey ? 'selected' : '' }>${key}</option>`).join("")} + `;

    //render options 
    this.shadow.querySelector("#latitudeKeySelect").innerHTML =latitudeKeyOptions;
    this.shadow.querySelector("#longitudeKeySelect").innerHTML =longitudeKeyOptions;

    //Latitude Select
    const latitudeKeySelect = this.shadow.getElementById("latitudeKeySelect");
    latitudeKeySelect.addEventListener("change", ()=>{

      //validate latitude key sample value
      const latitudeLabelEl = this.shadow.querySelector("#latitude-label");
      latitudeLabelEl.innerHTML = 'Latitude Key';
      // if(latLongRegex.exec(sample[latitudeKeySelect.value])){
        this.config.latitudeKey = latitudeKeySelect.value;
      // }else{
      //   latitudeLabelEl.innerHTML += '<span style="color:red;"> Please select valid Latitude Key</span>'
      // }
      
      this.render();
    });

    //Longitude Select
    const longitudeKeySelect = this.shadow.getElementById("longitudeKeySelect");
    longitudeKeySelect.addEventListener("change", ()=>{
      this.config.longitudeKey = longitudeKeySelect.value;
      this.render();
    })

    //Clustering Toggle
    const clusteringInput = this.shadow.querySelector("#is-clustering");

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

    //save and update config keys
    const saveButton = this.shadow.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      console.log("save button");
      console.log(this.config.toJSON())
      this.callCustomEvent({
        action: "onsave",
        value: this.config.toJSON(),
      });
    });

    
    const previewMapElement = this.shadowRoot.getElementById('preview-map');
    
    // let previewMap = renderMapSingleLatLng(previewMapElement, lat, lng);
    this.previewMap = new Map(previewMapElement);
    this.previewMap.fitWorld();
    tileLayer(TILE_LAYER, {
      maxZoom: MAX_ZOOM_LEVEL,
      attribution: ATTRIBUTION
    }).addTo(this.previewMap);


  }

  connectedCallback() {
    // Manually render dynamic content
    this.render();
  }



  render() {
    
    


    
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
