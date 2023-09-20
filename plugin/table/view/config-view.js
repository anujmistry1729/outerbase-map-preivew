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

    ${LEAFLET_JS_CSS}
</style>

<div id="theme-container">
    <div id="configuration-container">
        
    </div>
</div>
`

module.exports = {templateConfiguration}