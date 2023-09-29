import { Map, tileLayer, icon, featureGroup, marker, popup } from 'leaflet';
import {MarkerClusterGroup} from 'leaflet.markercluster/src';
import { OuterbasePluginConfig } from '../config';
import { ATTRIBUTION, ICON_URL, MAX_ZOOM_LEVEL, TILE_LAYER, continentsBoundingBox } from '../constant';
import { OuterbaseTableEvent } from '../outerbase-events';
import { templateTable } from './view/table-view';


export class OuterbasePluginTable extends HTMLElement {
    static get observedAttributes() {
        return [
            // The value of the table that the plugin is being rendered in
            "tablevalue",
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
        this.renderedMap = new Map(mapEl);

        this.renderedMap.setView([0, 0], 2);

        this.renderedMap.fitBounds(continentsBoundingBox);

        tileLayer(TILE_LAYER, {
            maxZoom: MAX_ZOOM_LEVEL,
            attribution: ATTRIBUTION
        }).addTo(this.renderedMap);

        //init markers
        this.markers = []


        //pagination
        this.previousPageButtonEl = this.shadow.getElementById("previous-page-btn");
        this.nextPageButtonEl = this.shadow.getElementById("next-page-btn");
        this.currentPageEl = this.shadow.getElementById("current-page");
        this.pageInfoEl = this.shadow.getElementById("page-info")


        this.previousPageButtonEl.addEventListener("click", (event) => {
            console.log("Previous page button clicked");
            this.triggerEvent(this, {
                action: OuterbaseTableEvent.getPreviousPage,
                value: {}
            });
        });

        this.nextPageButtonEl.addEventListener("click", (event) => {
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


    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attribute changed")

        if (name === "configuration") {
            this.config = new OuterbasePluginConfig(JSON.parse(this.getAttribute("configuration")));
            console.log(this.config)
        }

        if (name === "metadata") {
            //get meta data
            let metadata = JSON.parse(this.getAttribute("metadata"));
            //pagination data
            this.config.count = metadata?.count
            this.config.limit = metadata?.limit
            this.config.offset = metadata?.offset
            this.config.theme = metadata?.theme
            this.config.pageCount = metadata?.pageCount
            this.config.page = metadata?.page

            // if(this.config.pageCount === this.config.page){
            //     this.cursorNotAllowed()
            // }else{
            //     this.nextPageButtonEl.style.cursor = 'pointer'
            // }
            // //Start page
            // if(this.config.page === 1){
            //     this.cursorNotAllowed()

            // }else{
            //     this.previousPageButtonEl.style.cursor = 'pointer';
            // }
        }

        if (name === "tablevalue") {
            this.clearMarkers();
            this.addMarkers();
        }

        this.render()
    }

    render() {

        this.pageInfoEl.innerText = `Viewing ${this.config.offset} - ${this.config.limit} of ${this.config.count} results`;

        this.currentPageEl.innerText = `Page ${this.config.page} of ${this.config.pageCount}`;

    }

    // cursorNotAllowed(element){
    //     element.style.pointerEvents = 'none';
    // }

    showNoMarkersPopup() {
        const noMarkerPopup = popup().setLatLng(this.renderedMap.getCenter()).setContent('No markers to display');
        noMarkerPopup.addTo(this.renderedMap);
    }
    //clear Markers
    clearMarkers() {
        this.markers.forEach(marker => {
            marker.removeFrom(this.renderedMap);
        });
        this.markers = [];
    }


    //add Markers to Map
    addMarkers() {
        this.markers = this.createMarkersFromTableValue();

        if (this.markers.length === 0) {
            this.showNoMarkersPopup();
        } else {
            if(this.config.isClustering){
                
            const clusterMarker = new MarkerClusterGroup();

            this.markers.map((singleMarker)=>{
                clusterMarker.addLayer(singleMarker);
            })

            this.renderedMap.addLayer(clusterMarker)
            }else{

                const markerGroup = featureGroup(this.markers);
                markerGroup.addTo(this.renderedMap)
            }
        }
    }

    //create markers from table value
    createMarkersFromTableValue() {
        const tableValue = JSON.parse(this.getAttribute("tableValue"));

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

            return tableValue.map((singleColumnValues, index) => {
                let lat = singleColumnValues[this.config.latitudeKey];
                let lng = singleColumnValues[this.config.longitudeKey];
                return marker([lat, lng], { icon: markerIcon }).bindPopup(`${singleColumnValues.id}, ${lat}, ${lng}`);
            })

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