import { OuterbasePluginConfig_$PLUGIN_ID } from '../config';
import { templateTable_$PLUGIN_ID } from './view/table-view';
import * as L from 'leaflet';
export class OuterbasePluginTable_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    //assign global configuration to config property 
    config = new OuterbasePluginConfig_$PLUGIN_ID(JSON.parse(this.getAttribute("configuration")));
    items = []

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateTable_$PLUGIN_ID.content.cloneNode(true))
    }

    connectedCallback() {

                this.config.tableValue = JSON.parse(this.getAttribute("tableValue"));

                // this.loadExternalScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js").then(
                //     ()=>{
                        this.useExternalScript()
                    // }
                // ).catch((error) => {
                //     console.error('Error loading external script:', error);
                // });


    }

    loadExternalScript(url) {
        return new Promise(((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
                script.type = "application/javascript",
                script.onload = () => {
                    resolve()
                };
                script.onerror = () => {
                    reject(new Error(`Failed to load script: ${url}`))
                };
                document.head.appendChild(script)
        }
        ))
    }
    loadExternalCSSLink(url) {
        return new Promise(((resolve, reject) => {
            const link = document.createElement("link");
            link.href = url;
                link.rel = "stylesheet";
                link.onload = () => {
                    resolve()
                };
            
                link.onerror = () => {
                    reject(new Error(`Failed to load link: ${url}`))
                };
                
                document.head.appendChild(link);
        }
        ))
    }
    useExternalScript() {

        var map = this.shadowRoot.getElementById('map');
        var e =L.map(map).setView([51.505, -.09], 13);

        L.markerClusterGroup();

        // var e = L.map("map-to-render").setView([51.505, -.09], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(e);

        let markersGroupArray = this.getMarkers(L);
        
        
        if(markersGroupArray.length && markersGroupArray.length > 0){
            L.featureGroup(markersGroupArray).addTo(e)
        }
    }

    getMarkers(L){
        const tableValue = this.config.tableValue;

        if(tableValue.length && tableValue.length != 0){
            let myIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            })
            return tableValue.map((singleColumnValues, index)=>{
                let lat = singleColumnValues[this.config.latitudeKey];
                let lng = singleColumnValues[this.config.latitudeKey];
                return new L.marker([lat, lng]).bindPopup(`${index}, ${lat}, ${lng}`);
            })
        }else{
            return [];
        }
    }
}