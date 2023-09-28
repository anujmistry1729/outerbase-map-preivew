const { LEAFLET_JS_CSS } = require("../../dependency/leaflet-css")

var templateConfiguration = document.createElement('template')
templateConfiguration.innerHTML = `
<style>
    #configuration-container {
        display: flex;
        height: 100%;
        overflow-y: scroll;
        padding: 40px 50px 65px 40px;
    }

    .field-title {
        font: "Inter", sans-serif;
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        margin: 0 0 8px 0;
    }

    select {
        width: 320px;
        height: 40px;
        margin-bottom: 16px;
        background: transparent;
        border: 1px solid #343438;
        border-radius: 8px;
        color: black;
        font-size: 14px;
        padding: 0 8px;
        cursor: pointer;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="32"><path fill="black" d="M480-380 276-584l16-16 188 188 188-188 16 16-204 204Z"/></svg>');
        background-position: 100%;
        background-repeat: no-repeat;
        appearance: none;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
    }

    input {
        width: 320px;
        height: 40px;
        margin-bottom: 16px;
        background: transparent;
        border: 1px solid #343438;
        border-radius: 8px;
        color: black;
        font-size: 14px;
        padding: 0 8px;
    }

    button {
        border: none;
        background-color: #834FF8;
        color: white;
        padding: 6px 18px;
        font: "Inter", sans-serif;
        font-size: 14px;
        line-height: 18px;
        border-radius: 8px;
        cursor: pointer;
    }

    .preview-card {
        margin-left: 80px;
        width: 240px;
        background-color: white;
        border-radius: 16px;
        overflow: hidden;
    }

    .preview-card > img {
        width: 100%;
        height: 165px;
    }

    .preview-card > div {
        padding: 16px;
        display: flex; 
        flex-direction: column;
        color: black;
    }

    .preview-card > div > p {
        margin: 0;
    }

    .dark {
        #configuration-container {
            background-color: black;
            color: white;
        }
    }

    .dark > div > div> input {
        color: white !important;
    }

    .dark > div > div> select {
        color: white !important;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="32"><path fill="white" d="M480-380 276-584l16-16 188 188 188-188 16 16-204 204Z"/></svg>');
    }

    /** Config View  */
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
        color: 	#A9A9A9;
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

    #preview-map{
      height: 185px;
    }


    /**
     * TOGGLE BUTTON
    */
    .switch {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 17px;
        margin-top: 10px;
      }
      
      .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: #2196F3;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
      }
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 17px;
      }
      
      .slider.round:before {
        border-radius: 50%;
      }

    ${LEAFLET_JS_CSS}
</style>

<div id="theme-container">
    <div id="configuration-container">
        <!-- Config View -->
    <div style="flex: 1;">

    <div class="input-fields">
        <div>
            <label id="longitude-label" for="select">Longitude Key</label>
        </div>
        <div class="field-options">
            <select name="" id="longitudeKeySelect">
                
            </select>
        </div>
    </div>

    <div class="input-fields">
        <div>
            <label id="latitude-label" for="select">Latitude Key</label>
        </div>
        <div class="field-options">
            <select name="" id="latitudeKeySelect">
            
            </select>
        </div>
    </div>

    <div class="input-fields">
        <label> Clustering: </label>
        <label class="switch">
        <input id="is-clustering" type="checkbox">
        <span class="slider round"></span>
        </label>
    </div>

    <div class="input-fields">
        <div>
            <label id="icon" for="icon">Custom Icon URL: OPTIONAL</label>
        </div>
        <div class="field-options">
            <input name="icon" id="iconURL" type="url"  placeholder="https://icon-image.com" pattern="https://.*"/>
            </input>
        </div>
    </div>

    <!-- <div class="input-fields">
      <div>
          <label for="icon-img"> Icon Image </label>
      </div>
      <div>
          <input type="url">
      </div>
    </div> -->

    <div style="margin-top: 8px;">
        <button id="saveButton">Save View</button>
    </div>
</div>




<div style="position: relative;">
    <div class="preview-card">

        <div>
            <div id="preview-map"></div>
        </div>
    </div>
</div>
    </div>
</div>
`

module.exports = {templateConfiguration}