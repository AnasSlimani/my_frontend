import React, { useEffect } from "react";
import '../styles/clients.css';
import client1 from '../images/anas.jpg';
import client2 from '../images/badr.jpg';
import client3 from '../images/ihab.jpg';
import client4 from '../images/said.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import AOS from "aos";
import "aos/dist/aos.css";
import ParticlesBackground from '../Components/ParticlesBackground';

function Clients() {
  useEffect(() => {
    new Swiper(".review-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      grabCursor: true,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },
    });
  }, []);
  return (
    
    <section className="review" id='review' >
      <ParticlesBackground />
      <h1 className='headingee' data-aos="fade-up">client's <span>REVIEW</span></h1>
      <div className="swiper review-slider">
        <div className="swiper-wrapper">
          <div className="swiper-slide box">
            <img src={client1} alt="" />
            <div className="content">
              <p>aqwad agence hhhhhhhhhhhhhhhhhhhhhh</p>
              <h3>Anas Slimani</h3>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>

            </div>
          </div>
          <div className="swiper-slide box">
            <img src={client2} alt="" />
            <div className="content">
              <p>agence dial zab a wlad qhab</p>
              <h3>Badr Ezziyati</h3>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>

            </div>
          </div>
          <div className="swiper-slide box">
            <img src={client3} alt="" />
            <div className="content">
              <p>dacia daial zab jibo clio hh</p>
              <h3>Ihab Hilal</h3>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>

            </div>
          </div>
          <div className="swiper-slide box">
            <img src={client4} alt="" />
            <div className="content">
              <p>t3iiiiiiiiiiiiich DACIA a lkhout hh</p>
              <h3>Said Yassine</h3>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>

            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section>
  )
}

export default Clients;