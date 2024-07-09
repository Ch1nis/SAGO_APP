import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.offline'; // Importa leaflet.offline
import { savePolygonData, getPolygonData, getAllPolygonData } from './idb';

const $url = `${import.meta.env.VITE_APP_RUTA}/poligonos`;

const Map = ({ center = [-40.57377, -73.10702], zoom = 16.5, maxZoom = 18, minZoom = 17, setPolygonData, updatePolygon }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const polygonLayers = useRef({});

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

        const tileLayer = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        tileLayer.addTo(mapInstance.current);

        const saveTiles = async (bounds, minZoom, maxZoom) => {
          for (let z = minZoom; z <= maxZoom; z++) {
            const tiles = tileLayer._getTilesFromCenterAndZoom(bounds.getCenter(), z);
            for (const tile of tiles) {
              await tileLayer.saveTile(tile);
            }
          }
        };

        const bounds = mapInstance.current.getBounds();
        await saveTiles(bounds, minZoom, maxZoom);

        const addPolygonToMap = async (id) => {
          const polygonData = await fetchPolygonData(id);
          if (polygonData) {
            const { name_poligono, info_poligono, hora_poligono, coordinates } = polygonData;

            const geoJsonLayer = L.geoJSON(coordinates).addTo(mapInstance.current);
            polygonLayers.current[id] = geoJsonLayer;

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

        const polygonIds = [3, 4, 5];
        for (const id of polygonIds) {
          await addPolygonToMap(id);
        }
      }
    };

    initializeMap();
  }, [center, zoom, maxZoom, minZoom, setPolygonData]);

  useEffect(() => {
    if (updatePolygon && mapInstance.current) {
      const { id_poligono, name_poligono, info_poligono, hora_poligono, coordinates } = updatePolygon;

      if (polygonLayers.current[id_poligono]) {
        mapInstance.current.removeLayer(polygonLayers.current[id_poligono]);
      }

      const geoJsonLayer = L.geoJSON(coordinates, {
        onEachFeature: (feature, layer) => {
          const popupContent = `Nombre: ${name_poligono}<br>Info: ${info_poligono}<br>Hora: ${hora_poligono}`;
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

  return <div ref={mapContainer} style={{ height: "90vh", width: "100%" }} />;
};

export default Map;
