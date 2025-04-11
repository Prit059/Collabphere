import React from 'react';
import './ClubFooter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Cyber Security Club</h3>
          <p>
            Empowering the next generation of cybersecurity professionals through education,
            hands-on experience, and community engagement.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#join">Join Us</a></li>
          </ul>
        </div>

        {/* <div className="footer-section resources">
          <h3>Resources</h3>
          <ul>
            <li><a href="#learning">Learning Materials</a></li>
            <li><a href="#tools">Security Tools</a></li>
            <li><a href="#ctf">CTF Challenges</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#newsletter">Newsletter</a></li>
          </ul>
        </div> */}

        {/* <div className="footer-section contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <i className="fas fa-envelope"></i>
              <span>contact@cybersecurityclub.com</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Security Street, Tech City, TC 12345</span>
            </li>
          </ul>
        </div> */}
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Cyber Security Club. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;