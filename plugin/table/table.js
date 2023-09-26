import { OuterbasePluginConfig } from '../config';
import { ATTRIBUTION, ICON_URL, MAX_ZOOM_LEVEL, TILE_LAYER } from '../constant';
import { templateTable } from './view/table-view';
import  { Map, tileLayer, icon, featureGroup, marker, Layer, control} from 'leaflet';
export class OuterbasePluginTable extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    //assign global configuration to config property 
    config = new OuterbasePluginConfig(JSON.parse(this.getAttribute("configuration")));
    items = []

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateTable.content.cloneNode(true))
    }

    connectedCallback() {

                this.config.tableValue = JSON.parse(this.getAttribute("tableValue"));
                this.config.items = this.config.tableValue;

                this.render()
    }

    render(){
        this.useExternalScript();


        const previousPageButtonEl = this.shadow.getElementById("previous-page-btn");
        const nextPageButtonEl = this.shadow.getElementById("next-page-btn");
        const currentPageEl = this.shadow.getElementById("current-page");


        //Event Listeners for pagination
        previousPageButtonEl.addEventListener("click", (event)=>{
            console.log("Previous page button clicked");
        });

        nextPageButtonEl.addEventListener("click", (event)=>{
            console.log("Next page button clicked");
        });
    }
    useExternalScript() {
        const firstRowData = this.config.tableValue[0];

        var mapEl = this.shadowRoot.getElementById('map');
        var renderMap =new Map(mapEl);

        tileLayer(TILE_LAYER, {
            maxZoom: MAX_ZOOM_LEVEL,
            attribution: ATTRIBUTION 
        }).addTo(renderMap);

        const markersArray = this.createMarkersFromTableData();

        const markersGroup = featureGroup(markersArray);    

        renderMap.fitBounds(markersGroup.getBounds());

        markersGroup.addTo(renderMap)
    }

    createMarkersFromTableData(){
        const tableValue = this.config.tableValue;

        if(tableValue.length && tableValue.length != 0){
            // TODO ADD CUSTOM ICON SUPPORT
            let myIcon = icon({
                iconUrl: ICON_URL,
            })
            return tableValue.map((singleColumnValues, index)=>{
                let lat = singleColumnValues[this.config.latitudeKey];
                let lng = singleColumnValues[this.config.longitudeKey];
                return marker([lat, lng], {icon : myIcon}).bindPopup(`${singleColumnValues.id}, ${lat}, ${lng}`);
            })
        }else{
            return [];
        }
    }

    pagination(){

    }
}