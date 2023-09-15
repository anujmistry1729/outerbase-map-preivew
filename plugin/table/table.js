import { OuterbasePluginConfig_$PLUGIN_ID } from '../config';
import { templateTable_$PLUGIN_ID } from './view/table-view';


export class OuterbasePluginTable_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    config = new OuterbasePluginConfig_$PLUGIN_ID({})
    items = []

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateTable_$PLUGIN_ID.content.cloneNode(true))
    }

    connectedCallback() {

                this.loadExternalScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js").then(
                    ()=>{
                        this.useExternalScript()
                    }
                ).catch((error) => {
                    console.error('Error loading external script:', error);
                });


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

        var e = L.map(map).setView([51.505, -.09], 13);

        // var e = L.map("map-to-render").setView([51.505, -.09], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(e);
    }
}