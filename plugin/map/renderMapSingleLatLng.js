import {map, tileLayer, icon , featureGroup, marker, popup} from 'leaflet';
import { ATTRIBUTION, ICON_URL, TILE_LAYER } from '../constant';


export function renderMapSingleLatLng(mapEl, lat, lng, options = { iconUrl : ICON_URL}){
    let previewMap = map(mapEl, {closePopupOnClick: false}).setView([lat, lng], 10)

    tileLayer(TILE_LAYER, {
      maxZoom: 19,
      attribution: ATTRIBUTION
    }).addTo(previewMap);

    let myIcon = icon({
    //   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconUrl: options.iconUrl,
  })
    marker([lat, lng], {icon: myIcon}).addTo(previewMap).bindPopup(`${lat}, ${lng}`, {autoClose:false, closeButton:true, closeOnClick:false,}).openPopup();

    return previewMap;
}