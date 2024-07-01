// App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './componets/Map/Map.jsx';
import Login from './componets/Login/Login.jsx';
import Navbar from './componets/Navbar/Navbar.jsx';
import EditorMapa from './componets/EditorMapa/EditorMapa.jsx';
import Home from './componets/home/Home.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Map />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inicio" element={<>
            <Navbar />
            <EditorMapa />
          </>
          } />





        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
serviceWorkerRegistration.register();
