import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ center = [-40.57377, -73.10702], zoom = 16.5, maxZoom = 20 }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const fetchPolygonData = async (id_poligono) => {
    try {
      const response = await fetch('http://localhost:3000/poligonos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_poligono }),
      });

      const data = await response.json();
      return data || null;
    } catch (error) {
      console.error('Error al obtener los datos del backend:', error);
      return null;
    }
  };
  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = L.map(mapContainer.current, {
        center: center,
        zoom: zoom,
        maxZoom: maxZoom
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);


      // Obtener datos del polígono con id 3
      fetchPolygonData(3).then(polygonData => {
        if (polygonData) {
          const { name_poligono, info_poligono, hora_poligono, coordinates } = polygonData;

          // Convierte las coordenadas del polígono al formato GeoJSON esperado por Leaflet
          const geoJsonLayer = L.geoJSON(coordinates).addTo(mapInstance.current);

          // Añade popups a cada capa del GeoJSON
          geoJsonLayer.eachLayer(layer => {
            layer.bindPopup(`Nombre: ${name_poligono}<br>Info: ${info_poligono}<br>Hora: ${hora_poligono}`);
          });
        }
      });
    }
  }, []);


      // const geojsons = ['./Poligonos/norte.geojson', './Poligonos/oeste.geojson'];


      
    //   // Obtener datos del polígono con id 1
    //   fetchPolygonData(3).then(polygonData => {
    //     if (polygonData) {
    //       const { name_poligono, info_poligono, hora_poligono } = polygonData;

    //       geojsons.forEach(geojson => {
    //         fetch(geojson)
    //           .then(response => response.json())
    //           .then(geojsonData => {
    //             const geoJsonLayer = L.geoJSON(geojsonData);
    //             geoJsonLayer.eachLayer(layer => {
    //               layer.bindPopup(`Nombre: ${name_poligono}<br>Info: ${info_poligono}<br>Hora: ${hora_poligono}`);
    //             });
    //             geoJsonLayer.addTo(mapInstance.current);
    //           });
    //       });
    //     }
    //   });
    // }
  // }, []);
 // Se ejecuta solo una vez al montar el componente

//  const geojsons = ['./Poligonos/norte.geojson', './Poligonos/oeste.geojson'];

//  geojsons.forEach(geojson => {
//    fetch(geojson)
//      .then(response => response.json())
//      .then(data => {
//        const geoJsonLayer = L.geoJSON(data);
//        geoJsonLayer.eachLayer(layer => {
//          const properties = layer.feature.properties;
//          layer.bindPopup(`Nombre: ${properties.name}<br>Área: ${properties.area}`);
//        });
//        geoJsonLayer.addTo(mapInstance.current);
//      });
//  });
// }
// }, []);



  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView(center, zoom);
    }
  }, [center, zoom]); // Se ejecuta cada vez que cambian las props center o zoom

  return <div ref={mapContainer} style={{ height: "90vh", width: "100%" }} />;
};

export default Map;