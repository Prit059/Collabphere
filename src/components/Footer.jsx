import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Us */}
        <div>
          <h2>About Us</h2>
          <p>
          Discover a world of dynamic events and engaging club activities that bring students together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2>Quick Links</h2>
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">About Us</a></li>
            <li><a href="">Explore</a></li>
            <li><a href="">Clubs</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        &copy; 2025 Collabsphere? | Designed with ❤️
      </div>
    </footer>
  );
};

export default Footer;
