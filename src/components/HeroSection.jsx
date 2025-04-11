import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('club-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Cyber Security Club</h1>
        <p className="hero-subtitle">Empowering the next generation of cybersecurity professionals</p>
        <div className="hero-buttons">
          <button className="join-button" onClick={scrollToEvents}>
            Join Now
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 