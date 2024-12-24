import React, { useEffect } from 'react';
import car from '../../images/about.png';
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 200, // Offset for triggering animations
      easing: 'ease-in-out', // Easing function
    });
  }, []);

  return (
    <section className="about container" id="about">
      <div className="about-img" data-aos="fade-right">
        <img src={car} alt="About Us Car" />
      </div>
      <div className="about-text" data-aos="fade-left">
        <span>About Us</span>
        <h2>Cheap Prices With Quality Cars</h2>
        <p>
          Nous offrons des véhicules de qualité supérieure à des prix abordables pour répondre à tous vos besoins de déplacement.
        </p>
        <a href="#contact" className="cta-btn">Learn More</a>
      </div>
    </section>
  );
}

export default About;
