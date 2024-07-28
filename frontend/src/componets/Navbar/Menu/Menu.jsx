import { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import menu from '../Iconos/menu.svg';
import './Menu.css';

function Menu() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const linkSago = 'https://sago.cl'
  const links = [
    { path: "/mapa-casamiento", label: "Mapa Casamiento" },
    { path: "/mapa-sago", label: "Mapa Sago" },
    { path: "/nuestro-gremio", label: "Nuestro Gremio" },
    { path: "/directorio", label: "Directorio" },
    { path: "/historia", label: "Historia" },
    { path: "/gremiales", label: "Gremiales" },
    { path: "/agricolas", label: "Agricolas" },
    { path: "/columnas-de-opinion", label: "Columnas de Opinion" },
    { path: "/estadisticas", label: "Estadisticas" },
    { path: "/mision-y-vision", label: "Mision y Vision" },
    { path: "/desafios", label: "Desafios" },
    { path: "/contacto", label: "Contacto" }
  ];
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
          {links.map(({ path, label }) => (
            <a key={path} href={`${linkSago}${path}`} onClick={handleClose} className="menu-link">
              {label}
            </a>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;
