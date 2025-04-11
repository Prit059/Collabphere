import React from "react";
import "./about_us.css"
import img1 from "../assets/i1.jpg";
import img2 from "../assets/i2.jpg";
import img3 from "../assets/i3.jpg";
const AboutUs = () => {
  return (
    <section className="container-fluid py-lg-5 py-sm-4 py-3 au">
    <div className="container d-flex about-us">
      <div className="col-lg-6" id="im3">
        <img id="i1" src={img1} alt="" />
        <img id="i3" src={img3} alt="" />  
        <img id="i2" src={img2} alt="" />
      </div> 

      <div className="col-lg-6">
        <div className="h3p">
        <h3><i class="fa-brands fa-studiovinari"></i>About Us</h3>
        <h1>Explore Our College <br /> <span>CLUBS</span> & Events.</h1>
        <p>Discover a world of dynamic events and engaging club activities that bring students together. Explore meetups, workshops, socials, and more to enrich your college experience.</p>
        </div>
        <div className="pmain d-flex">
        <div className="p12">
        <div className="p1 d-flex">
           <i className="mb-3 fa-solid fa-graduation-cap"></i>
          <div className="p2">
            <h4>Student Clubs</h4>
            <p>  Join diverse student-led clubs focusing on tech, arts, literature, and social causes to explore your passion.</p>
          </div>
        </div>
        <div className="p3 d-flex">
        <i className="mb-3 fa-regular fa-star"></i>
          <div className="p4">
            <h4>Event Spotlights</h4>
            <p>Stay updated with the latest <br /> happenings and exclusive club events.</p>
          </div>
        </div>
        </div>
        <div className="p5">
        <i class="fa-solid fa-code"></i>
          <p>Experience a curated selection of college club events that inspire creativity and collaboration. From themed socials to skill-building sessions, our platform keeps you connected to the heartbeat of campus life.</p>
        <i class="fa-solid fa-code i1"></i>
        </div>
        </div>
        <div id="more" >
          <button> DISCOVER MORE</button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default AboutUs;
