import React, { useState, useEffect } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import Map from '../Map/Map.jsx';
import './EditorMapa.css';
import { Form, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2';

const EditorMapa = () => {
  const [polygonData, setPolygonData] = useState({
    id_poligono: '',
    name_poligono: '',
    info_poligono: '',
    hora_poligono: '',
    coordinates: [],
  });
  const [updatedPolygon, setUpdatedPolygon] = useState(null);
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [orientation, setOrientation] = useState('vertical');

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth <= 600 ? 'horizontal' : 'vertical');
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!polygonData.name_poligono || !polygonData.info_poligono || !polygonData.hora_poligono) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, rellene todos los campos correspondientes.',
      });
      return;
    }

    console.log('polygonData', polygonData);
    try {
      const response = await fetch('http://localhost:3000/poligonos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(polygonData),
      });

      if (response.ok) {
        console.log('Datos actualizados con éxito:', polygonData);
        setUpdatedPolygon({ ...polygonData });
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Datos actualizados con éxito',
        });

        setPolygonData({
          id_poligono: '',
          name_poligono: '',
          info_poligono: '',
          hora_poligono: '',
          coordinates: [],
        });
        setIsFormEnabled(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron actualizar los datos',
        });
      }
    } catch (error) {
      console.error('Error al actualizar los datos del backend:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron actualizar los datos',
      });
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Seleccione un polígono primero
    </Tooltip>
  );

  return (
    <ReflexContainer orientation={orientation} style={{ height: '100vh', width: '100%' }}>
      <ReflexElement className="left-pane" minSize={200} maxSize={1000} flex={0.5}>
        <div className="pane-content">
        <Map
          style={{ height: '100%' }}
          setPolygonData={(data) => {
            setPolygonData(data);
            setIsFormEnabled(true);
          }}
          updatePolygon={updatedPolygon}
        />
        </div>
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement className="right-pane" minSize={200} maxSize={1000} flex={0.5}>
        <div className="pane-content">
          <div className="title-section"></div>
          <div className="form-section">
            <Form onSubmit={handleFormSubmit}>
              <h1>Edición de mapa SAGO</h1>
              <Form.Group as={Col}>
                <Form.Label>ID Poligono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="   "
                  className="form-input cursor-not-allowed"
                  value={polygonData.id_poligono}
                  disabled
                />
              </Form.Group>

              <div>
                <Form.Group as={Col}>
                  <Form.Label>Nombre</Form.Label>
                  <OverlayTrigger placement="top" overlay={!isFormEnabled ? renderTooltip : <></>}>
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese texto"
                        className="form-input"
                        value={polygonData.name_poligono}
                        onChange={(e) => setPolygonData({ ...polygonData, name_poligono: e.target.value })}
                        disabled={!isFormEnabled}
                      />
                    </div>
                  </OverlayTrigger>
                </Form.Group>

                <Form.Group as={Col}>
                  <OverlayTrigger placement="top" overlay={!isFormEnabled ? renderTooltip : <></>}>
                    <div>
                      <Form.Label>Info</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese texto"
                        className="form-input"
                        value={polygonData.info_poligono}
                        onChange={(e) => setPolygonData({ ...polygonData, info_poligono: e.target.value })}
                        disabled={!isFormEnabled}
                      />
                    </div>
                  </OverlayTrigger>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Horario</Form.Label>
                  <OverlayTrigger placement="top" overlay={!isFormEnabled ? renderTooltip : <></>}>
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese texto"
                        className="form-input"
                        value={polygonData.hora_poligono}
                        onChange={(e) => setPolygonData({ ...polygonData, hora_poligono: e.target.value })}
                        disabled={!isFormEnabled}
                      />
                    </div>
                  </OverlayTrigger>
                </Form.Group>
              </div>
              <br />
              <OverlayTrigger placement="top" overlay={!isFormEnabled ? renderTooltip : <></>}>
                <div>
                  <Button variant="success" type="submit" className="submit-button" disabled={!isFormEnabled}>
                    Guardar Cambios
                  </Button>
                </div>
              </OverlayTrigger>
            </Form>
          </div>
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
};

export default EditorMapa;