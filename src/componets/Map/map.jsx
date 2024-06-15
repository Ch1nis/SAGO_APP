import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const lat = -40.57377;
const lon = -73.10702;
const zoom = 16.5; // Ahora puedes usar un zoom decimal

const geojsons = ['./Poligonos/norte.geojson', './Poligonos/oeste.geojson'];

const Map = () => {
  const mapContainer = useRef(null);
  let mapInstance = null; // Add this line

  useEffect(() => {
    if (!mapInstance) { // Add this line
      mapInstance = L.map(mapContainer.current).setView([lat, lon], zoom); // Modify this line

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance); // Modify this line

      geojsons.forEach(geojson => {
        fetch(geojson)
          .then(response => response.json())
          .then(data => {
            // Crear la capa GeoJSON
            const geoJsonLayer = L.geoJSON(data);
      
            // Añadir un popup a cada polígono
            geoJsonLayer.eachLayer(layer => {
              const properties = layer.feature.properties;
              layer.bindPopup(`Nombre: ${properties.name}<br>Área: ${properties.area}`);
            });
      
            // Añadir la capa al mapa
            geoJsonLayer.addTo(mapInstance);
      
            // Cambiar el nivel de zoom cuando se selecciona un GeoJSON
            geoJsonLayer.on('click', function() {
              mapInstance.fitBounds(geoJsonLayer.getBounds(), { maxZoom: 20 });
            });
          });
      });
    } // Add this line
  }, []);

  return <div ref={mapContainer} style={{ height: "90svh", width: "100%" }} />;
};

export default Map;