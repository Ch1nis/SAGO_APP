// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './componets/Map/Map.jsx';
import Login from './componets/Login/Login.jsx';
import Navbar from './componets/Navbar/Navbar.jsx';
import EditorMapa from './componets/EditorMapa/EditorMapa.jsx';
import Home from './componets/home/Home.jsx';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={            <>
              <Navbar />
              <EditorMapa />
            </>
          } />
          <Route path="/" element={
            <>
              <Navbar />
              <Map />
            </>
          } />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;