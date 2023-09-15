var templateTable_$PLUGIN_ID = document.createElement("template");

templateTable_$PLUGIN_ID.innerHTML =`
<style>
    .leaflet-control-zoom{display:none}
</style>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"> +
<div id="map" style="height:100%"/>
`;


module.exports = { templateTable_$PLUGIN_ID };
