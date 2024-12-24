import React, { useEffect, useRef } from 'react';
import bgLight from '../../images/bg-light.jpg';
import bgDark from '../../images/bg.jpg';
import Typed from "typed.js";

function Header() {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const typedRef = useRef(null); // Declare typedRef for Typed.js

    useEffect(() => {
        const heroBg = heroRef.current;

        const interval = setInterval(() => {
            heroBg.style.backgroundImage = `url(${bgLight})`;
            setTimeout(() => {
                heroBg.style.backgroundImage = `url(${bgDark})`;
            }, 1000);
        }, 2200);

        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        // Intersection Observer for text animation
        const textElement = textRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    textElement.classList.add('visible'); // Add the 'visible' class when in view
                } else {
                    textElement.classList.remove('visible'); // Remove the 'visible' class when out of view
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the text is visible
        );

        if (textElement) observer.observe(textElement);

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    useEffect(() => {
        // Initialize Typed.js
        const options = {
            strings: ["Style", "Confort", "Élégance"], // Words to type dynamically
            typeSpeed: 100, // Speed of typing
            backSpeed: 50, // Speed of deleting
            backDelay: 1000, // Pause before backspacing
            loop: true, // Loop the animation
        };

        const typed = new Typed(typedRef.current, options);

        // Cleanup Typed.js instance on component unmount
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div ref={heroRef} className="hero" id='hero'>
            <div ref={textRef} className="text">
                <h4>VOTRE VOYAGE</h4>
                <h1>ROULEZ AVEC <br /> <span className="typed-text" ref={typedRef}>STYLE</span></h1>
                <p>Pour Ceux Qui Exigent le Meilleur !</p>
                <a href="#" className="btn">VIVEZ L'EXPÉRIENCE</a>
            </div>
        </div>
    );
}

export default Header;
