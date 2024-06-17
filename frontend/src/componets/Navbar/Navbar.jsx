import React, { useState } from 'react';
import './Navbar.css'
import logo from '../../assets/Iconos/logo.png'
import menu from './Iconos/menu.svg'
import search from './Iconos/search.svg'

function Navbar() {
  const [results, setResults] = useState([]);

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="" className="logo"/>
      </div>
      <div className="navbar_links">
        <details>
          <summary>Mapa Interactivo</summary>
          <a href="/mapa-casamiento">Mapa Casamiento</a>
          <a href="/mapa-sago">Mapa Sago</a>
        </details>
        <details>
          <summary>Nuestro A G</summary>
          <a href="/nuestro-gremio">Nuestro Gremio</a>
          <a href="/directorio">Directorio</a>
          <a href="/historia">Historia</a>
        </details>
        <details>
          <summary>Servicios Noticias</summary>
          <a href="/gremiales">Gremiales</a>
          <a href="/agricolas">Agricolas</a>
          <a href="/columnas-de-opinion">Columnas de Opinion</a>
          <a href="/estadisticas">Estadisticas</a>
        </details>
        <details>
          <summary>Plan Estratégico</summary>
          <a href="/mision-y-vision">Mision y Vision</a>
          <a href="/desafios">Desafios</a>
        </details>
        <a href="/contacto">Contacto</a>
      </div>
      <div className="navbar_icons">
        <div className="icon_container">
          <img src={search} alt="Search" style={{width: '20px', height: '20px'}} />
        </div>
        <div className="icon_container">
          <img src={menu} alt="Menu" style={{width: '20px', height: '20px'}} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;