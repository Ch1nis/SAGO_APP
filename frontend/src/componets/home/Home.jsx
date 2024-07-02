import React, { useEffect, useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../Navbar/Navbar';
import eventos from './gallery/eventos.png';
import sagorecinto from './gallery/sagorecinto.jpeg';

const Gallery = () => {
  const images = [
    { src: eventos, link: 'inicio/', label: 'Edicion de mapa recino SAGO' },
    { src: sagorecinto, link: 'Si/', label: 'Edicion de mapa eventos SAGO' },
  ];

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <section id="gallery" className="gallery">
        <div className="container-fluid">
          <div className="row gy-4 justify-content-center">
            {images.map((image, index) => (
              <div className="col-md-6" key={index}>
                <div className="gallery-item h-100">
                  <a href={image.link}>
                    <img src={image.src} className="img-fluid" alt={image.label} />
                    <div className="gallery-links d-flex align-items-center justify-content-center">
                      <span className="details-link">{image.label}</span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showScroll && (
        <div className="scroll-top active d-flex align-items-center justify-content-center" onClick={scrollTop}>
          <i className="bi bi-arrow-up-short"></i>
        </div>
      )}
    </>
  );
};

export default Gallery;
