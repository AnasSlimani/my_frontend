import React, { useEffect } from "react";
import '../../styles/cars.css';
import vec1 from '../../images/mercedes.png';
import vec2 from '../../images/bmw.png';
import vec3 from '../../images/toyota.png';
import AOS from "aos";
import "aos/dist/aos.css";
import 'swiper/css';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { useNavigate } from "react-router-dom";




function Cars() {
    const navigate = new useNavigate()
    useEffect(() => {
        AOS.init({
          duration: 1000,     
        });

        // Initialisation de Swiper
        new Swiper(".vehicules-slider", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop:true,
            autoplay: {
                delay: 9500,
                disableOnInteraction: false,
            },
            grabCursor:true,
            centeredSlides:true,
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

    const toCars=() =>{
        navigate('/signup')
    }

      return (
        <section className='vehicules' id='vehicules'  >
            <h1 className="headinge" data-aos="fade-up" >
                Popular <span>marques</span>
            </h1>
            <div className="swiper vehicules-slider" data-aos="fade-up">
                <div className="swiper-wrapper">
                <div className="swiper-slide box" >
                    <img src={vec1} alt="" />
                    <div className="content">
                        <h3>new model</h3>
                        <div className="price">
                            <span>price : </span> $65000/-
                        </div>
                        <p>
                            new
                            <span className='fas fa-circle'></span> 2021
                            <span className='fas fa-circle'></span> automatic
                            <span className='fas fa-circle'></span> petrol
                            <span className='fas fa-circle'></span> 183mph
                        </p>
                        <a href="#" className='btn' onClick={toCars} >check out</a>
                    </div>
                </div>
                <div className="swiper-slide box">
                    <img src={vec2} alt="" />
                    <div className="content">
                        <h3>new model</h3>
                        <div className="price">
                            <span>price : </span> $65000/-
                        </div>
                        <p>
                            new
                            <span className='fas fa-circle'></span> 2021
                            <span className='fas fa-circle'></span> automatic
                            <span className='fas fa-circle'></span> petrol
                            <span className='fas fa-circle'></span> 183mph
                        </p>
                        <a href="#" className='btn'>check out</a>
                    </div>
                </div>
                <div className="swiper-slide box">
                    <img src={vec3} alt="" />
                    <div className="content">
                        <h3>new model</h3>
                        <div className="price">
                            <span>price : </span> $65000/-
                        </div>
                        <p>
                            new
                            <span className='fas fa-circle'></span> 2021
                            <span className='fas fa-circle'></span> automatic
                            <span className='fas fa-circle'></span> petrol
                            <span className='fas fa-circle'></span> 183mph
                        </p>
                        <a href="#" className='btn'>check out</a>
                    </div>
                </div>
                <div className="swiper-slide box">
                    <img src={vec2} alt="" />
                    <div className="content">
                        <h3>new model</h3>
                        <div className="price">
                            <span>price : </span> $65000/-
                        </div>
                        <p>
                            new
                            <span className='fas fa-circle'></span> 2021
                            <span className='fas fa-circle'></span> automatic
                            <span className='fas fa-circle'></span> petrol
                            <span className='fas fa-circle'></span> 183mph
                        </p>
                        <a href="#" className='btn'>check out</a>
                    </div>
                </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>

        </section>
    )
}

export default Cars;
