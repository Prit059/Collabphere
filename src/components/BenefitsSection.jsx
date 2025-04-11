import React from 'react';
import './BenefitsSection.css';

const benefits = [
  {
    title: 'Networking & Community',
    description: 'Build your professional network and connect with the cybersecurity community',
    icon: '🤝',
    details: [
      'Access to exclusive industry events and meetups',
      'Mentorship opportunities with industry experts',
      'Professional networking sessions and workshops',
      'Alumni connections and career guidance',
      'Community events and knowledge sharing sessions'
    ]
  },
  {
    title: 'Skill Development & Training',
    description: 'Master cutting-edge cybersecurity and AI/ML technologies',
    icon: '💻',
    details: [
      'Hands-on workshops and practical labs',
      'Real-world project experience',
      'Latest tools and technologies training',
      'Expert-led training sessions',
      'Team-based learning and collaborative projects'
    ]
  },
  {
    title: 'Career Development & Placement',
    description: 'Comprehensive career support and placement assistance',
    icon: '🎯',
    details: [
      'Resume building and portfolio development',
      'Mock interviews and technical assessments',
      'Industry insights and trends sessions',
      'Job placement assistance and referrals',
      'Career counseling and growth planning'
    ]
  },
  {
    title: 'Competitions & Events',
    description: 'Participate in exciting challenges and showcase your skills',
    icon: '🏆',
    details: [
      'Hackathons and cybersecurity competitions',
      'Team-based projects and challenges',
      'Knowledge sharing and tech talks',
      'Industry collaboration events',
      'Skill showcase opportunities'
    ]
  }
];

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2>Club Benefits</h2>
          <p className="section-subtitle">Unlock your potential with our comprehensive support system</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-card-content">
                <div className="benefit-icon-container">
                  <div className="benefit-icon">{benefit.icon}</div>
                </div>
                <h3>{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
                <ul className="benefit-details">
                  {benefit.details.map((detail, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      <span className="detail-text">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;