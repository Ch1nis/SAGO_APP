import React from 'react';
import SplitPane from 'react-split-pane';
import Map from '../Map/Map.jsx';
import './EditorMapa.css';
import { Form, Col, Button } from 'react-bootstrap';


const EditorMapa = () => {
  return (
    <SplitPane split="vertical" defaultSize="50%" className="split-pane">
      <div className="pane-left">
        <Map />
      </div>
      <div className="pane-right">
        <div className="title-section">

        </div>
        <div className="form-section">
          <Form>
            <h1>Edición de mapa SAGO</h1>
            <Form.Group as={Col}>
              <Form.Label>ID Poligono</Form.Label>
              <Form.Control type="text" placeholder="   " className='form-input cursor-not-allowed' disabled/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese texto" className='form-input' />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Info</Form.Label>
              <Form.Control type="text" placeholder="Ingrese texto" className='form-input' />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Horario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese texto" className='form-input' />
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
            <br />
            <Button variant="success" type="submit" className="submit-button">
              Guardar Cambios
            </Button>

          </Form>
        </div>
      </div>
    </SplitPane>
  );
};

export default EditorMapa;