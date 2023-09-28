const { LEAFLET_JS_CSS } = require("../../dependency/leaflet-css");
const { MARKER_CLUSTER_CSS, MARKER_CLUSTER_DEFAULT_CSS } = require("../../dependency/marker-cluster-css");

var templateTable = document.createElement("template");

templateTable.innerHTML = `
<style>
    .leaflet-control-zoom{display:none}
    ${LEAFLET_JS_CSS}
    ${MARKER_CLUSTER_CSS}
    ${MARKER_CLUSTER_DEFAULT_CSS}
    #map{
        height: 100%;
        width: 100%;
    }

    .btn{
        padding: 5px 16px;
        background: linear-gradient(rgb(23, 23, 23) 0%, rgb(38, 38, 38) 79.91%, rgb(10, 10, 10) 100%);
        box-shadow: rgba(250, 250, 250, 0.5) 0px 0px 2px 1.5px inset, rgb(10, 10, 10) 0px -2px 2px 0.5px inset;
        cursor: pointer;
        border-style: none;
        border-radius: 6px;
        color: #FAFAFA;
    }
</style>
<div id="map"></div>

<div id="pagination" style="position: fixed; bottom:80px; right:40px; z-index:10001; display: flex; align-items:center;     background: linear-gradient(rgb(23, 23, 23) 0%, rgb(38, 38, 38) 79.91%, rgb(10, 10, 10) 100%); color: #FAFAFA; padding: 7px 16px; border-radius: 10px">
    <div id="page-info" class="mx-3 text-sm text-neutral-900 dark:text-neutral-50" style="margin-left:12px">
        Viewing 1-50 of 240
    </div>
    <div class="flex-1" style="flex: 1 1 0%;">
    </div>
    <div id="previous-page-btn" class="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 text-neutral-300 dark:text-neutral-700" style="margin-left:12px; width: 32px; height: 32px; display:flex; align-items: center; justify-content: center; border-radius: 3px; cursor:pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z">
            </path>
        </svg>
    </div>
    <div id="current-page" class="text-light-gray-800 dark:text-dark-gray-800" style="margin-left: 4px;">
        1
    </div>
    <div id="next-page-btn" class="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50" style="margin-left: 12px; width:32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 3px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
            </path>
        </svg>
    </div>
    <div class="flex-1" style="flex: 1 1 0%;">
    </div>
</div>
`;


module.exports = { templateTable };
