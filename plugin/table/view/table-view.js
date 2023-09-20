const { LEAFLET_JS_CSS } = require("../../dependency/leaflet-css");

var templateTable_$PLUGIN_ID = document.createElement("template");

templateTable_$PLUGIN_ID.innerHTML =`
<style>
    .leaflet-control-zoom{display:none}
    ${LEAFLET_JS_CSS}
    
    #map{
        height: 100%;
        width: 100%;
    }
</style>
<div id="map"/>
`;


module.exports = { templateTable_$PLUGIN_ID };
