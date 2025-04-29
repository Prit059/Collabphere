import React, { useState, useEffect } from "react";
import "./stuclubs.css";
import "./clubs_media.css";
import { Navigate, useNavigate, Link } from "react-router-dom";

const Clubs = () => {
  const defaultClubs = [
    { id: 1, name: "Artificial Intelligence & Machine Learning Club", description: "Dive into the world of AI and ML", icon: "fa-graduation-cap" },
    { id: 2, name: "Cybersecurity Club", description: "Create a profile to showcase your skills and join projects.", icon: "fa-star" },
  ];

  const [clubs, setClubs] = useState(() => {
    const savedClubs = localStorage.getItem("clubs");
    return savedClubs ? JSON.parse(savedClubs) : defaultClubs;
  });

  const [showAll, setShowAll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ stuname: "", studentid: "", email: "", year: "", sem: "" });

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
  
    // Check auth on component mount
    checkAuth();
  
    // Set up storage event listener to sync across tabs
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  useEffect(() => {
    localStorage.setItem("clubs", JSON.stringify(clubs));
  }, [clubs]);
  
  
  const alret = () => {
    //custom alert 
    alert("Please Login...");
  }



const fetchClubs = async () => {
    try {
      const response = await fetch("http://localhost:5000/clubs");
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);
  const handleSubmit = async () => {
    if (!formData.stuname || !formData.studentid || !formData.email || !formData.year || !formData.sem) {
      alert("Please fill in all fields.");
      return;
    }
  
    const studentData = {
      name: formData.stuname,
      student_id: formData.studentid,  // Fix key to match backend
      email: formData.email,
      year: formData.year,
      semester: formData.sem,  // Fix key to match backend
    };
  
    try {
      console.log("Sending data to server:", studentData);
  
      const response = await fetch("http://localhost:5000/join-club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error message from server
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Server Response:", data);
      alert("Student added successfully!");
      setShowForm(false);
      setFormData({ stuname: "", studentid: "", email: "", year: "", sem: "" });
  
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert(`Error: ${error.message}`);
    }
  };
  
  

  return (
    <section className="container-fluid highlights py-5 sec1" id="club-section-student">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center clubs">
            <h1>Discover Our Engineering <br /> Clubs</h1>
            <p>Join a vibrant community where innovation and teamwork drive success in your college experience.</p>
          </div>
        </div>
        
        <div className="row gy-4 text-center top4">
          {clubs.slice(0, showAll ? clubs.length : 3).map((club) => (
            <div key={club.id} className="col-lg-4 col-sm-6 col-12">
              <div className="bg-white p-3 gap-3 shadow-lg book1">
                {/* Show the uploaded image */}
                {club.image && <img src={club.image} alt="Club" className="club-image" />}
                {/* <i className={`mb-3 fa-solid ${club.icon}`}></i> */}
                <div className="details">
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  <h4>Faculty Name: {club.faclty}</h4>
                  <h6>Student Coordinator: {club.student}</h6>
                </div>
                <div className="ej">
                  {isLoggedIn ? (
                    <button><Link id="in" to="/stuevent">Explore</Link></button>
                  ) : (
                    <button onClick={()=> alret()}>
                      <Link id="in" to="/login">Explore</Link>
                    </button>
                  )}
                 
                  {isLoggedIn ? (
                    <button onClick={() => setShowForm(true)}>Join</button>
                  ) : (
                    <button onClick={()=> alret()}>
                      <Link id="in" to="/login">Join</Link>
                    </button>
                  
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        

        <div className="text-center mt-4">
          <button className="btn btn-primary load-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less ▲" : "Load More ▼"}
          </button>
        </div> 

        

        {isLoggedIn && showForm && (
          
          <div className="modal-overlay-join">
            <div className="modal-content-join">
              <h3>Join Club</h3>
              {Object.keys(formData).map((key) => (
                <input key={key} type="text" placeholder={key} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} />
              ))}
              <button id="join-sub" className="btn btn-success" onClick={handleSubmit}>Submit</button>
              <button id="join-close" className="btn btn-danger" onClick={() => setShowForm(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clubs;
