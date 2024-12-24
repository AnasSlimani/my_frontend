import React, { useEffect } from "react";

function Services() {
    useEffect(() => {
        const boxes = document.querySelectorAll(".block");
    
        // Intersection Observer to handle visibility
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible"); // Add 'visible' class when in view
                    } else {
                        entry.target.classList.remove("visible"); // Remove 'visible' class when out of view
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the box is visible
        );
    
        // Attach observer to all boxes
        boxes.forEach((box) => observer.observe(box));
    
        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, []);
    

  return (
    <section className="services" id="services">
      <h1 className="heading">
        our <span>services</span>
      </h1>
      <div className="box-container">
        <div className="box block">
          <i className="fas fa-car"></i>
          <h3>car selling</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, aliquam!</p>
        </div>
        <div className="box block">
          <i className="fas fa-tools"></i>
          <h3>parts repair</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, aliquam!</p>
        </div>
        <div className="box block">
          <i className="fas fa-car-crash"></i>
          <h3>car insurance</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, aliquam!</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
