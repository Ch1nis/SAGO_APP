import React, { useRef, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
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
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Verificar si algún campo está vacío
    if (!polygonData.name_poligono || !polygonData.info_poligono || !polygonData.hora_poligono) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, rellene todos los campos correspondientes.',
      });
      return;
    }

    console.log('polygonData', polygonData)
    try {
      const response = await fetch('http://localhost:3000/poligonos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(polygonData),
      });

      if (response.ok) {
        console.log('Datos actualizados con éxito:', polygonData)
        setUpdatedPolygon({ ...polygonData });
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Datos actualizados con éxito',
        });

        // Limpiar campos después de la actualización
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
    <SplitPane split="vertical" defaultSize="50%" className="split-pane">
      <div className="pane-left">
        <Map
          setPolygonData={(data) => {
            setPolygonData(data);
            setIsFormEnabled(true);
          }}
          updatePolygon={updatedPolygon}
        />
      </div>
      <div className="pane-right">
        <div className="title-section"></div>
        <div className="form-section">
          <Form onSubmit={handleFormSubmit}>
            <h1>Edición de mapa SAGO</h1>
            <Form.Group as={Col}>
              <Form.Label>ID Poligono</Form.Label>
              <Form.Control
                type="text"
                placeholder="   "
                className='form-input cursor-not-allowed'
                value={polygonData.id_poligono}
                disabled
              />
            </Form.Group>

            {/* <OverlayTrigger
              placement="top"
              overlay={renderTooltip}
            > */}

            <div>
              <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <OverlayTrigger
                  placement="top"
                  overlay={!isFormEnabled ? renderTooltip : <></>}
                >
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese texto"
                      className='form-input'
                      value={polygonData.name_poligono}
                      onChange={(e) => setPolygonData({ ...polygonData, name_poligono: e.target.value })}
                      disabled={!isFormEnabled}
                    />
                  </div>
                </OverlayTrigger>
              </Form.Group>

              <Form.Group as={Col}>
                <OverlayTrigger
                  placement="top"
                  overlay={!isFormEnabled ? renderTooltip : <></>}

                >
                  <div>
                    <Form.Label>Info</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese texto"
                      className='form-input'
                      value={polygonData.info_poligono}
                      onChange={(e) => setPolygonData({ ...polygonData, info_poligono: e.target.value })}
                      disabled={!isFormEnabled}
                    />
                  </div>
                </OverlayTrigger>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Horario</Form.Label>
                <OverlayTrigger
                  placement="top"
                  overlay={!isFormEnabled ? renderTooltip : <></>}

                >
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese texto"
                      className='form-input'
                      value={polygonData.hora_poligono}
                      onChange={(e) => setPolygonData({ ...polygonData, hora_poligono: e.target.value })}
                      disabled={!isFormEnabled}
                    />
                  </div>
                </OverlayTrigger>
              </Form.Group>

              {/* <Form.Group as={Col}>
          <Form.Label>Select</Form.Label>
          <Form.Control as="select" className='form-input'>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Form.Control>
        </Form.Group> */}

              {/* <Form.Group as={Col}>
          <Form.Label>Subir Imagen</Form.Label>
          <Form.Control type="file" className='form-input' />
        </Form.Group> */}
            </div>
            <br />
            <OverlayTrigger
              placement="top"
              overlay={!isFormEnabled ? renderTooltip : <></>}

            >
              <div>
                <Button variant="success" type="submit" className="submit-button" disabled={!isFormEnabled}>
                  Guardar Cambios
                </Button>
              </div>
            </OverlayTrigger>
          </Form>
        </div>
      </div>
    </SplitPane>
  );
};

export default EditorMapa;