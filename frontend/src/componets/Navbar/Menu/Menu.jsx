import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import menu from '../Iconos/menu.svg';
import './Menu.css';

function Menu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow} className="icon_container">
        <img src={menu} alt="Menu" className="menu_icon" />
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <a href="/mapa-casamiento" onClick={handleClose}>Mapa Casamiento</a>
          <a href="/mapa-sago" onClick={handleClose}>Mapa Sago</a>
          <a href="/nuestro-gremio" onClick={handleClose}>Nuestro Gremio</a>
          <a href="/directorio" onClick={handleClose}>Directorio</a>
          <a href="/historia" onClick={handleClose}>Historia</a>
          <a href="/gremiales" onClick={handleClose}>Gremiales</a>
          <a href="/agricolas" onClick={handleClose}>Agricolas</a>
          <a href="/columnas-de-opinion" onClick={handleClose}>Columnas de Opinion</a>
          <a href="/estadisticas" onClick={handleClose}>Estadisticas</a>
          <a href="/mision-y-vision" onClick={handleClose}>Mision y Vision</a>
          <a href="/desafios" onClick={handleClose}>Desafios</a>
          <a href="/contacto" onClick={handleClose}>Contacto</a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;
