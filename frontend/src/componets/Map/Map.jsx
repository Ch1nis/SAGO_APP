import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';
import { savePolygonData, getPolygonData, getAllPolygonData } from './idb';

const $url = `${import.meta.env.VITE_APP_RUTA}/poligonos`;

const Map = ({ center = [-40.57377, -73.10702], zoom = 16.5, maxZoom = 18, minZoom = 17, setPolygonData, updatePolygon }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const polygonLayers = useRef({});

  // Estilos de los polígonos
  const polygonStyle = {
    color: '#F05A11', // Color por defecto
    weight: 0.8,
    opacity: 1,
    fillOpacity: 0.3,
  };

  const fetchPolygonData = async (id_poligono) => {
    try {
      const response = await fetch($url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_poligono }),
      });
      const data = await response.json();
      if (data) {
        await savePolygonData(data); // Guarda los datos en IndexedDB
      }
      return data || null;
    } catch (error) {
      console.error('Error al obtener los datos del backend:', error);
      return getPolygonData(id_poligono); // Recupera los datos de IndexedDB
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
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
            const { name_poligono, info_poligono, hora_poligono, coordinates, dia_poligono, url } = polygonData;

            const geoJsonLayer = L.geoJSON(coordinates, {
              style: polygonStyle,
              onEachFeature: (feature, layer) => {
                layer.bindPopup(`
                                    <div>
                                        <strong>Nombre:</strong> ${name_poligono}<br>
                                        <strong>Info:</strong> ${info_poligono}<br>
                                        <strong>Hora:</strong> ${hora_poligono}<br>
                                        <strong>Días Hábiles:</strong> ${dia_poligono}<br>
                                        <strong>Enlace:</strong> <a href="${url}" target="_blank">${url}</a>

                                    </div>
                                `);
                layer.on('click', () => {
                  setPolygonData({
                    id_poligono: id,
                    name_poligono,
                    info_poligono,
                    hora_poligono,
                    coordinates,
                    dia_poligono,
                    url,
                  });
                });
              }
            }).addTo(mapInstance.current);

            polygonLayers.current[id] = geoJsonLayer;
          }
        };

        const polygonIds = [3, 4, 5, 6, 7, 8,9,10,11,12];
        for (const id of polygonIds) {
          await addPolygonToMap(id);
        }
      }
    };

    initializeMap();
  }, [center, zoom, maxZoom, minZoom, setPolygonData]);

  useEffect(() => {
    if (updatePolygon && mapInstance.current) {
      const { id_poligono, name_poligono, info_poligono, hora_poligono, coordinates, dia_poligono, url } = updatePolygon;

      if (polygonLayers.current[id_poligono]) {
        mapInstance.current.removeLayer(polygonLayers.current[id_poligono]);
      }

      const geoJsonLayer = L.geoJSON(coordinates, {
        style: polygonStyle,
        onEachFeature: (feature, layer) => {
          const popupContent = `
                                    <div>
                                        <strong>Nombre:</strong> ${name_poligono}<br>
                                        <strong>Info:</strong> ${info_poligono}<br>
                                        <strong>Hora:</strong> ${hora_poligono}<br>
                                        <strong>Días Hábiles:</strong> ${dia_poligono}<br>
                                        <strong>Enlace:</strong> <a href="${url}" target="_blank">${url}</a>

                                    </div>
                                `;
          layer.bindPopup(popupContent);

          layer.on('click', (e) => {
            e.target.openPopup();
            setPolygonData(prevData => {
              if (prevData.id_poligono !== id_poligono) {
                return {
                  id_poligono,
                  name_poligono,
                  info_poligono,
                  hora_poligono,
                  coordinates,
                  dia_poligono,
                  url,
                };
              }
              return prevData;
            });
          });
        }
      }).addTo(mapInstance.current);

      polygonLayers.current[id_poligono] = geoJsonLayer;
      savePolygonData(updatePolygon); // Guarda los datos en IndexedDB
    }
  }, [updatePolygon]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div ref={mapContainer} style={{ height: "90vh", width: "100%" }} />
  );
};

export default Map;
