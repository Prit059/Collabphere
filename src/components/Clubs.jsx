import React, { useState, useEffect } from "react";
import "./clubs.css";
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

  const [showModal, setShowModal] = useState(false);
  const [newClub, setNewClub] = useState({ name: "", description: "", faclty: "", student: "",image: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [clubToRemove, setClubToRemove] = useState(null);
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
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    // No need for setShowConfirm(true) here unless it's for a different purpose
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClub({...newClub, image: reader.result});  //base64 string
      };
      reader.readAsDataURL(file); // convert base64
    }
  };
  const alret = () => {
    //custom alert 
    alert("Please Login...");
  }
  const handleAddClub = async () => {
    if (!newClub.name || !newClub.description || !newClub.faclty || !newClub.student || !newClub.image) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/add-club", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                club_name: newClub.name,  // ✅ Ensure this matches the database column
                description: newClub.description,
                faclty: newClub.faclty,
                student: newClub.student,
                image: newClub.image 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! Status: ${response.status}`);
        }

        alert(data.message);

        // 🔥 Add new club directly to UI
        setClubs([...clubs, { id: data.insertId, ...newClub }]);

        // Clear form and close modal
        setNewClub({ name: "", description: "", faclty: "", student: "" });
        setShowModal(false);

    } catch (error) {
        console.error("Error adding club:", error);
        alert("Error adding club: " + error.message);
    }
};



const fetchClubs = async () => {
  try {
      const response = await fetch("http://localhost:5000/clubs");
      const data = await response.json();
      setClubs(data);
  } catch (error) {
      console.error("Error fetching clubs:", error);
  }
};

// Fetch clubs when component loads
useEffect(() => {
  fetchClubs();
}, []);



  const handleConfirmRemove = (id) => {
    setClubToRemove(id);
    setShowConfirm(true);
  };

  const handleRemoveClub = () => {
    setClubs(clubs.filter((club) => club.id !== clubToRemove));
    setShowConfirm(false);
    setClubToRemove(null);
  };

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
    <section className="container-fluid highlights py-5 sec1" id="club-section">
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
                    <button><Link id="in" to="/event">Explore</Link></button>
                  ) : (
                    <button onClick={()=> alret()}>
                      <Link id="in" to="/login">Explore</Link>
                    </button>
                  )}
                  {isLoggedIn && (
                  <button onClick={() => handleConfirmRemove(club.id)}>Remove</button>
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

        {!isLoggedIn ? (
          <div></div>
        ):(
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="bg-white p-3 gap-3 shadow-lg book1 add-club" onClick={() => setShowModal(true)}>
              <div className="details" id="addnew">
                <i className="mb-3 fa-solid fa-plus"></i>
                <h3>Add New Club</h3>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* <div className="text-center mt-4">
          <button className="btn btn-primary load-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less ▲" : "Load More ▼"}
          </button>
        </div> */}

        {isLoggedIn && showModal ? (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add a New Club</h3>
              <input type="text" placeholder="Club Name" value={newClub.name} onChange={(e) => setNewClub({ ...newClub, name: e.target.value })} />
              <input type="text" placeholder="Description" value={newClub.description} onChange={(e) => setNewClub({ ...newClub, description: e.target.value })} />
              <input type="text" placeholder="Faculty Name" value={newClub.faclty} onChange={(e) => setNewClub({ ...newClub, faclty: e.target.value })} />
              <input type="text" placeholder="Student Coordinator Name" value={newClub.student} onChange={(e) => setNewClub({ ...newClub, student: e.target.value })} />
              {/* Image Upload Field */}
              <input type="file" accept="image/*" onChange={handleImageUpload} />
      
              {/* Preview the selected image */}
              {newClub.image && <img src={newClub.image} alt="Preview" className="preview-img" />}
              <button className="btn btn-success" onClick={handleAddClub}>Submit</button>
              <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        ):(
          <div></div>
        )}

        {showConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Are you sure you want to remove this club?</h3>
              <button className="btn btn-danger" onClick={handleRemoveClub}>Yes, Remove</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {isLoggedIn && showForm && (
          
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Join Club</h3>
              {Object.keys(formData).map((key) => (
                <input key={key} type="text" placeholder={key} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} />
              ))}
              <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
              <button className="btn btn-danger" onClick={() => setShowForm(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clubs;
