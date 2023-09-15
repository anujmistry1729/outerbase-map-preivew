import { OuterbasePluginConfig_$PLUGIN_ID } from "../config";
import { templateConfiguration } from "./view/config-view";
export class OuterbasePluginTableConfiguration_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});
  items = [];

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateConfiguration.content.cloneNode(true));
  }

  connectedCallback() {
    // Parse the configuration object from the `configuration` attribute
    // and store it in the `config` property.
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );

    // Set the items property to the value of the `tableValue` attribute.
    if (this.getAttribute("tableValue")) {
      this.items = JSON.parse(this.getAttribute("tableValue"));
    }

    // Manually render dynamic content
    // and store it in the `config` property.
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );

    // Set the items property to the value of the `tableValue` attribute.
    if (this.getAttribute("tableValue")) {
      this.items = JSON.parse(this.getAttribute("tableValue"));
    }

    // Manually render dynamic content
    this.render();
  }



  render() {
    let sample = this.items.length ? this.items[0] : {};
    let keys = Object.keys(sample);

    this.shadow.querySelector("#configuration-container").innerHTML =
      `
      
            <style>
            .input-fields {
                display: flex;
                flex-direction: column;
                margin-top: 10px;
            }

            label {
                color: #777;
            }

            .field-options {
                margin-top: 10px;
            }

            select {
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid #cfcfcf;
                width: 100%;
            }

            #saveButton {
                margin-top: 8px;
                padding: 4px 8px;
                border-radius: 8px;
                border: 1px solid #111827;
            }
            </style>

            <div style="flex: 1;">

            <div class="input-fields">
                <div>
                    <label for="select">Longitude Key</label>
                </div>
                <div class="field-options">
                    <select name="" id="longitudeKeySelect">
                        ` + keys.map((key) => `<option value="${key}" ${key===this.config.latitudeKey ? 'selected' : '' }>${key}
                        </option>`).join("") + `
                    </select>
                </div>
            </div>
        
            <div class="input-fields">
                <div>
                    <label for="select">Latitude Key</label>
                </div>
                <div class="field-options">
                    <select name="" id="latitudeKeySelect">
                    ` + keys.map((key) => `<option value="${key}" ${key===this.config.longitudeKey ? 'selected' : '' }>${key}
                    </option>`).join("") + `
                    </select>
                </div>
            </div>
        
            <div style="margin-top: 8px;">
                <button id="saveButton">Save View</button>
            </div>
        </div>




        <div style="position: relative;">
            <div class="preview-card">

                <div>
                    <p style="margin-bottom: 8px; font-weight: bold; font-size: 16px; line-height: 24px; font-family: 'Inter', sans-serif;">${sample[this.config.latitudeKey]}</p>
                    <p style="margin-bottom: 8px; font-size: 14px; line-height: 21px; font-weight: 400; font-family: 'Inter', sans-serif;">${sample[this.config.longitudeKey]}</p>
                </div>
            </div>
        </div>
        `;

    var saveButton = this.shadow.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      console.log("save button");
      
      this.callCustomEvent({
        action: "onsave",
        value: this.config.toJSON(),
      });
    });


    var latitudeKeySelect = this.shadow.getElementById("latitudeKeySelect");
    latitudeKeySelect.addEventListener("change", ()=>{
      this.config.latitudeKey = latitudeKeySelect.value;
      this.render();
    });

    var longitudeKeySelect = this.shadow.getElementById("longitudeKeySelect");
    longitudeKeySelect.addEventListener("change", ()=>{
      this.config.longitudeKey = longitudeKeySelect.value;
      this.render();
    })

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
