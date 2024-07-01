import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

<<<<<<< Updated upstream
const Map = ({ center = [-40.57377, -73.10702], zoom = 16.5, maxZoom = 20, minZoom = 17, setPolygonData, updatePolygon }) => {
=======
const Map = ({ center = [-40.57377, -73.10702], zoom = 16.5, maxZoom = 20, setPolygonData, updatePolygon }) => {
>>>>>>> Stashed changes
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const polygonLayers = useRef({});

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
        maxZoom: maxZoom,
        minZoom: minZoom
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      const addPolygonToMap = async (id) => {
        const polygonData = await fetchPolygonData(id);
        if (polygonData) {
          const { name_poligono, info_poligono, hora_poligono, coordinates } = polygonData;

          // Convierte las coordenadas del polígono al formato GeoJSON esperado por Leaflet
          const geoJsonLayer = L.geoJSON(coordinates, {
            style: {
              fillColor: 'blue',     // Color de relleno
              fillOpacity: 0.2,       // Opacidad de relleno
              color: 'blue',           // Color del borde
              weight: 0.1,              // Grosor del borde
              opacity: 0              // Opacidad del borde
            }
          }).addTo(mapInstance.current);
          polygonLayers.current[id] = geoJsonLayer;

          // Añade popups a cada capa del GeoJSON y configura el clic
          geoJsonLayer.eachLayer(layer => {
            layer.bindPopup(`Nombre: ${name_poligono}<br>Info: ${info_poligono}<br>Hora: ${hora_poligono}`);
            layer.on('click', () => {
              setPolygonData({
                id_poligono: id,
                name_poligono,
                info_poligono,
                hora_poligono,
                coordinates,
              });
            });
          });
        }
      };

      // Obtener datos de los polígonos con ids 3 y 4 (ejemplo)
      addPolygonToMap(3);
      addPolygonToMap(4);
      addPolygonToMap(5);
<<<<<<< Updated upstream
=======
      addPolygonToMap(6);
      addPolygonToMap(7);
>>>>>>> Stashed changes
    }
  }, [setPolygonData, center, zoom, maxZoom]);


  useEffect(() => {
    if (updatePolygon && mapInstance.current) {
      const { id_poligono, name_poligono, info_poligono, hora_poligono, coordinates } = updatePolygon;

      // Eliminar el polígono antiguo del mapa si existe
      if (polygonLayers.current[id_poligono]) {
        mapInstance.current.removeLayer(polygonLayers.current[id_poligono]);
      }

      // Crear el nuevo polígono
      const geoJsonLayer = L.geoJSON(coordinates, {
        style: {
          fillColor: 'blue',        // Color de relleno
          fillOpacity: 0.6,         // Opacidad de relleno
          color: 'black',           // Color del borde
          weight: 3,                // Grosor del borde
          opacity: 1                // Opacidad del borde
        },
        onEachFeature: (feature, layer) => {
          const popupContent = `Nombre: ${name_poligono}<br>Info: ${info_poligono}<br>Hora: ${hora_poligono}`;
          layer.bindPopup(popupContent);

          layer.on('click', (e) => {
            // Abrir el popup sin redibujar el polígono
            e.target.openPopup();

            // Actualizar el estado solo si es necesario
            setPolygonData(prevData => {
              if (prevData.id_poligono !== id_poligono) {
                return {
                  id_poligono,
                  name_poligono,
                  info_poligono,
                  hora_poligono,
                  coordinates,
                };
              }
              return prevData;
            });
          });
        }
      }).addTo(mapInstance.current);

      // Almacenar la referencia al nuevo polígono
      polygonLayers.current[id_poligono] = geoJsonLayer;
    }
  }, [updatePolygon]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return <div ref={mapContainer} style={{ height: "90vh", width: "100%" }} />;
};

export default Map;
