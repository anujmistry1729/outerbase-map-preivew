import { OuterbasePluginConfig } from '../config';
import { ATTRIBUTION, ICON_URL, MAX_ZOOM_LEVEL, TILE_LAYER } from '../constant';
import { OuterbaseTableEvent } from '../outerbase-events';
import { templateTable } from './view/table-view';
import  { Map, tileLayer, icon, featureGroup, marker} from 'leaflet';

export class OuterbasePluginTable extends HTMLElement {
    static get observedAttributes() {
        return [
            // The configuration object that the user specified when installing the plugin
            "configuration",
            // Additional information about the view such as count, page and offset.
            "metadata"
        ];
    }

    //assign global configuration to config property 
    config = new OuterbasePluginConfig(JSON.parse(this.getAttribute("configuration")));

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateTable.content.cloneNode(true));

        const mapEl = this.shadowRoot.getElementById('map');
        this.renderedMap =new Map(mapEl);

        tileLayer(TILE_LAYER, {
            maxZoom: MAX_ZOOM_LEVEL,
            attribution: ATTRIBUTION 
        }).addTo(this.renderedMap);
       




        //pagination
        this.previousPageButtonEl = this.shadow.getElementById("previous-page-btn");
        this.nextPageButtonEl = this.shadow.getElementById("next-page-btn");
        this.currentPageEl = this.shadow.getElementById("current-page");
        this.pageInfoEl = this.shadow.getElementById("page-info")


        this.previousPageButtonEl.addEventListener("click", (event)=>{
            console.log("Previous page button clicked");
            this.triggerEvent(this, {
                action: OuterbaseTableEvent.getPreviousPage,
                value: {}
            });        
        });

        this.nextPageButtonEl.addEventListener("click", (event)=>{
            console.log("Next page button clicked");

            this.triggerEvent(this, {
                action: OuterbaseTableEvent.getNextPage,
                value: {}
            })
        });
    }
        
    connectedCallback() {
        this.render()
    }


    attributeChangedCallback(name, oldValue, newValue){
        console.log("attribute changed")

        if(name === "configuration"){
            this.config = new OuterbasePluginConfig(JSON.parse(this.getAttribute("configuration")));
        }
        
        if(name === "metadata"){
            //get meta data
            let metadata = JSON.parse(this.getAttribute("metadata"));
            //pagination data
            this.config.count = metadata?.count
            this.config.limit = metadata?.limit
            this.config.offset = metadata?.offset
            this.config.theme = metadata?.theme
            this.config.pageCount = metadata?.pageCount
            this.config.page = metadata?.page
        }

        this.render()
    }

    render(){
        
        const markersArray = this.createMarkersFromTableData();

        const markersGroup = featureGroup(markersArray);    

        this.renderedMap.fitBounds(markersGroup.getBounds());

        markersGroup.addTo(this.renderedMap)


        
        this.pageInfoEl.innerText = `Viewing ${this.config.offset} - ${this.config.limit} of ${this.config.count} results`;

        this.currentPageEl.innerText = `Page ${this.config.page} of ${this.config.pageCount}`;

    }

    createMarkersFromTableData(){
        const tableValue = JSON.parse(this.getAttribute('tableValue'));

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

    triggerEvent = (fromClass, data) => {
        const event = new CustomEvent("custom-change", {
            detail: data,
            bubbles: true,
            composed: true
        });
    
        fromClass.dispatchEvent(event);
    }
}