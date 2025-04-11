import React from 'react';
import './StatsSection.css';

const stats = [
  {
    number: '500+',
    title: 'Members To Join',
    description: 'Join our growing community of cybersecurity enthusiasts',
    icon: '👥',
    color: '#00b4d8'
  },
  {
    number: '50+',
    title: 'More Activities',
    description: 'Regular workshops, hackathons, and learning sessions',
    icon: '🎯',
    color: '#90e0ef'
  },
  {
    number: '20+',
    title: 'Events',
    description: 'Industry meetups, competitions, and networking events',
    icon: '📅',
    color: '#00b4d8'
  }
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2>Our Impact</h2>
          <p className="section-subtitle">Join a thriving community of cybersecurity professionals</p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-content">
                <div className="stat-number" style={{ color: stat.color }}>{stat.number}</div>
                <h3>{stat.title}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;