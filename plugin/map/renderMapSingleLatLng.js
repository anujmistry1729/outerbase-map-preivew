import {map, tileLayer, icon , featureGroup, marker} from 'leaflet';


export function renderMapSingleLatLng(mapEl, iconUrl, lat, lng){
    let previewMap = map(mapEl).setView([lat, lng], 10)

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(previewMap);

    let myIcon = icon({
    //   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconUrl: iconUrl,
  })
    marker([lat, lng], {icon: myIcon}).bindPopup(`${lat}, ${lng}`).addTo(previewMap);

    return previewMap;
}