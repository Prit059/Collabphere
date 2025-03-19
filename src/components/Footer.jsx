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
            We bring the best experience for food lovers. Explore our wide range
            of delicious meals and enjoy the taste!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2>Quick Links</h2>
          <ul>
            <li><a href=".hm">Home</a></li>
            <li><a href=".au">About Us</a></li>
            <li><a href="/explore">Explore</a></li>
            <li><a href="/clubs">Clubs</a></li>
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
        &copy; 2025 STILL Hungry? | Designed with ❤️
      </div>
    </footer>
  );
};

export default Footer;
