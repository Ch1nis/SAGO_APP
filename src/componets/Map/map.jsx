import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const lat = -40.57377;
const lon = -73.10702;
const zoom = 18;

const styles = {
  poligonoStyle: { color: 'blue', weight: 0, opacity: 1, fillOpacity: 0.2 },
  recintoStyle: { color: 'green', weight: 0, opacity: 1, fillOpacity: 0.2 },
  oesteStyle: { color: 'red', weight: 0, opacity: 1, fillOpacity: 0.2 },
  norteStyle: { color: 'cyan', weight: 0, opacity: 1, fillOpacity: 0.2 },
  ayudaStyle: { color: '#007A78', weight: 0, opacity: 1, fillOpacity: 0.2 },
};

const layers = [
  { url: './Poligonos/poligono.geojson', style: styles.poligonoStyle, name: 'Polígono' },
  { url: './Poligonos/sur.geojson', style: styles.recintoStyle, name: 'Recinto Sur' },
  { url: './Poligonos/oeste.geojson', style: styles.oesteStyle, name: 'Recinto Oeste' },
  { url: './Poligonos/norte.geojson', style: styles.norteStyle, name: 'Recinto Norte' },
  { url: './Poligonos/ayuda.geojson', style: styles.ayudaStyle, name: 'Recinto Ayuda' },
];

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

class LeafletMap extends React.Component {
  componentDidMount() {
    layers.forEach(layer => {
      fetch(layer.url)
        .then(response => response.json())
        .then(geojson => {
          const polygonLayer = L.geoJSON(geojson, {
            style: layer.style,
            onEachFeature: function (feature, layer) {
              layer.bindTooltip(layer.name);
              layer.bindPopup(`<b>${layer.name}</b><br>Esta zona es el área interior de "archivo ${layer.url.split('/').pop()}"`);
            }
          });
          polygonLayer.addTo(this.map);
        })
        .catch(error => console.error(`Error loading ${layer.name} GeoJSON:`, error));
    });
  }

  render() {
    return (
      <MapContainer center={[lat, lon]} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
        <SetViewOnClick coords={[lat, lon]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }
}

export default LeafletMap;