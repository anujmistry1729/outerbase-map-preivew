import {map, tileLayer, icon , featureGroup, marker} from 'leaflet';
import { ATTRIBUTION, ICON_URL, TILE_LAYER } from '../constant';


export function renderMapSingleLatLng(mapEl, iconUrl = ICON_URL, lat, lng){
    let previewMap = map(mapEl).setView([lat, lng], 10)

    tileLayer(TILE_LAYER, {
      maxZoom: 19,
      attribution: ATTRIBUTION
    }).addTo(previewMap);

    let myIcon = icon({
    //   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconUrl: iconUrl,
  })
    marker([lat, lng], {icon: myIcon}).bindPopup(`${lat}, ${lng}`).addTo(previewMap);

    return previewMap;
}