import React, { useState } from 'react';
import './Navbar.css'
import logo from '../../assets/Iconos/logo.jpg'
import SearchBar from "../SeachBar/searchBar"
import { SearchResultsList } from "../SeachBar/SearchResultsList"


function Navbar() {
  const [results, setResults] = useState([]);

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="" className="logo"/>
      </div>
      <div className="navbar_search">
        <SearchBar setResults={setResults}/>
        <div className="search_results">
          {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar

 