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

    // The shadow DOM is a separate DOM tree that is attached to the element.
    // This allows us to encapsulate our styles and markup. It also prevents
    // styles from the parent page from leaking into our plugin.
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
    this.render();
  }

  render() {
    let sample = this.items.length ? this.items[0] : {};
    let keys = Object.keys(sample);

    this.shadow.querySelector("#container").innerHTML =
      `
      
            <style>
            .input-fields {
                display: flex;
                flex-direction: column;
                margin-top: 10px;
            }

            label {
                color: #111827;
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
                        ` + keys.map((key) => `<option value="${key}" ${key===this.config.titleKey ? 'selected' : '' }>${key}
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
                    ` + keys.map((key) => `<option value="${key}" ${key===this.config.titleKey ? 'selected' : '' }>${key}
                    </option>`).join("") + `
                    </select>
                </div>
            </div>
        
            <div style="margin-top: 8px;">
                <button id="saveButton">Save View</button>
            </div>
        </div>
        `;

    var saveButton = this.shadow.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      this.callCustomEvent({
        action: "onsave",
        value: this.config.toJSON(),
      });
    });
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
