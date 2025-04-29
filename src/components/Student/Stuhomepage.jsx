import React, { useState, useEffect } from "react";
import "./HomePage.css"; 
import "./media2.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setusername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const storedname = localStorage.getItem("Username");
    if(token){
      setIsLoggedIn(true);
      if(storedname) setusername(storedname);
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setShowConfirm(true);
  };

  const handleconfirm = () => {
    // Perform action on confirm
  }

  const scrollToClub = () => {
    const eventsSection = document.getElementById('club-section-student');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-student');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <main className="hm"> 
      <header className="container-fluid py-2 shadow-lg top-0">
        <div className="container head">
          <div className="row align-items-center">
            <input
              id="input"
              type="search"
              placeholder="You Search..."
              style={{ display: searchVisible ? "flex" : "none" }}
            />
            <figure className="col-lg-4 col-12 text-lg-start mb-0 pb-0 fig">
              <img src="./images/LOGO.png " alt="Logo" />
            </figure>
            <div className="col-lg-8 col-12">
              <div className="btn-outer d-flex gap-3 justify-content-end but">
                <Link  className="f">Home</Link>
                <Link  className="f" onClick={scrollToAbout}>About</Link>
                <Link  className="f" onClick={scrollToClub}>Clubs</Link>
                <Link  className="f">FAQs</Link>
                {/* <Link to="/dashboard" className="f">Dashboard</Link> */}

                {/* Show Login/Signup if NOT logged in, otherwise show Logout */}
                {!isLoggedIn ? (
                  <>
                    <button className="btn btn-primary">
                      <Link id="in" to="/login">Log in</Link>
                    </button>
                    <button id="sign1" className="btn btn-primary">
                      <Link id="up" to="/register">Register</Link>
                    </button>
                  </>
                ) : (
                  <>
                  <Link to="/stuprofile" className="f">Profile</Link>
                  <button className="btn btn-danger" onClick={handleLogout} >
                    Logout
                  </button>
                  </>
                )}

                <div className="icon">
                  <div id="search" onClick={() => setSearchVisible(!searchVisible)}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div id="hamburger" onClick={() => setMenuVisible(!menuVisible)}>
                    <i className="fa-solid fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Menu */}
        <div className="menu2" style={{ display: menuVisible ? "flex" : "none" }}>
                <Link to="/" className="f">Home</Link>
                <Link to="/" className="f">About</Link>
                <Link to="/" className="f">Clubs</Link>
                <Link to="/" className="f">FAQs</Link>
                {/* <Link to="/dashboard" className="f">Dashboard</Link> */}

                {/* Show Login/Signup if NOT logged in, otherwise show Logout */}
                {!isLoggedIn ? (
                  <>
                    <button className="btn btn-primary">
                      <Link id="in" to="/login">Log in</Link>
                    </button>
                    <button id="sign1" className="btn btn-primary">
                      <Link id="up" to="/register">Sign Up</Link>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/stuprofile" className="f">Profile</Link>
                  <button className="btn btn-danger" onClick={handleLogout} >
                    Logout
                  </button>
                  </>
                )}
        </div>
      </header>

      <section className="container-fluid py-lg-5 py-sm-4 py-3">
        <div className="container">
          <div className="row justify-content-between gy-4 align-items-center">
            <div className="col-lg-12">
              <div className="bannerContent">
                <h1>Welcome To <span>Collabsphere</span></h1>
                <p className="mt-4">Empowering Collaboration and Innovation in Education.</p>
                <div className="bannerContentBtn d-flex gap-3">
                  <a href="/explore"></a>
                  {!isLoggedIn ? (
                    <>
                      <button className="py-2 btu2">
                        <i className="fa-solid fa-download"></i>
                        <Link id="fup" to="/signup"> Sign Up</Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 id="hello">Hello  You Are Smart Student...</h5>
                    </>
                  )}
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Section */}
        <div className="container shadow-lg mt-5 counterSection">
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 p-4">
            <div className="col p1">
              <h3>1000+</h3>
              <p>Student Joined</p>
            </div>
            <div className="col p2">
              <h3>5 - 6</h3>
              <p>Running Clubs</p>
            </div>
            <div className="col p3">
              <h3>15+</h3>
              <p>Faculty Projects</p>
            </div>
            <div className="col p4">
              <h3>10+ / 5</h3>
              <p>Events Running / Upcoming</p>
            </div>
            <div className="col p6">
              <h3>11th May</h3>
              <p>Hackathon</p>
            </div>
          </div>
        </div>

        {showConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Confirm Action</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to Log-Out? This action cannot be undone.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleconfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
