import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/Iconos/logo.png';
import menu from './Iconos/menu.svg';
import search from './Iconos/search.svg';
import Menu from './Menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  const [results, setResults] = useState([]);

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="navbar_links">
        <li>
          <a href="#">Mapa Interactivo</a>
          <ul className="dropdown-content">
            <li><a href="/mapa-casamiento">Mapa Casamiento</a></li>
            <li><a href="/mapa-sago">Mapa Sago</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Nuestro A G</a>
          <ul className="dropdown-content">
            <li><a href="/nuestro-gremio">Nuestro Gremio</a></li>
            <li><a href="/directorio">Directorio</a></li>
            <li><a href="/historia">Historia</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Servicios Noticias</a>
          <ul className="dropdown-content">
            <li><a href="/gremiales">Gremiales</a></li>
            <li><a href="/agricolas">Agricolas</a></li>
            <li><a href="/columnas-de-opinion">Columnas de Opinion</a></li>
            <li><a href="/estadisticas">Estadisticas</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Plan Estratégico</a>
          <ul className="dropdown-content">
            <li><a href="https://sago.cl/mision-y-vision/">Mision y Vision</a></li>
            <li><a href="/desafios">Desafios</a></li>
          </ul>
        </li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <div className="navbar_icons">
        <div className="icon_container">
          <img src={search} alt="Search" style={{ width: '20px', height: '20px' }} />
        </div>
        <div className="icon_container">
          <Menu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
