import { OuterbasePluginConfig_$PLUGIN_ID } from '../config';
import { ATTRIBUTION, ICON_URL, MAX_ZOOM_LEVEL, TILE_LAYER } from '../constant';
import { templateTable_$PLUGIN_ID } from './view/table-view';
import  { Map, tileLayer, icon, featureGroup, marker} from 'leaflet';
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
                this.useExternalScript()


    }
    useExternalScript() {

        var map = this.shadowRoot.getElementById('map');
        var renderMap =new Map(map).setView([51.505, -.09], 13);

        tileLayer(TILE_LAYER, {
            maxZoom: MAX_ZOOM_LEVEL,
            attribution: ATTRIBUTION 
        }).addTo(renderMap);

        let markersGroupArray = this.getMarkersFromTableValue();
        featureGroup(markersGroupArray).addTo(renderMap)
        // if(markersGroupArray.length && markersGroupArray.length > 0){
        //     featureGroup(markersGroupArray).addTo(renderMap)
        // }
    }

    getMarkersFromTableValue(){
        const tableValue = this.config.tableValue;

        if(tableValue.length && tableValue.length != 0){
            // TODO ADD CUSTOM ICON SUPPORT
            let myIcon = icon({
                iconUrl: ICON_URL,
            })
            return tableValue.map((singleColumnValues, index)=>{
                let lat = singleColumnValues[this.config.latitudeKey];
                let lng = singleColumnValues[this.config.latitudeKey];
                return marker([lat, lng], {icon : myIcon}).bindPopup(`${index}, ${lat}, ${lng}`);
            })
        }else{
            return [];
        }
    }
}