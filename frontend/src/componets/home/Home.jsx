import React, { useEffect, useState } from 'react';
import './Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../Navbar/Navbar';
import sagorecinto from './gallery/sagorecinto.jpeg';

const Gallery = () => {
  const images = [
    { src: sagorecinto, link: 'inicio/', label: 'Edición de mapa recinto SAGO' },
  ];

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <section id="gallery" className="gallery">
          <div className="row gy-4 justify-content-center">
            {images.map((image, index) => (
              <div className="col-lg-10 col-md-12" key={index}>
                <a href={image.link} className="gallery-item-wrapper">
                  <div className="gallery-item">
                    <img src={image.src} className="img-fluid" alt={image.label} />
                    <div className="gallery-links">
                      <span className="details-link">{image.label}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </section>
      {showScroll && (
        <div className="scroll-top" onClick={scrollTop}>
          <i className="bi bi-arrow-up-short"></i>
        </div>
      )}
    </>
  );
};

export default Gallery;