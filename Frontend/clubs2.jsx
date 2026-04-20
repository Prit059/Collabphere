import React, { useState } from "react";
import "./clubs.css";

const Clubs = () => {
  const [clubs, setClubs] = useState([
    { id: 1, name: "Artificial Intelligence & Machine Learning Club", description: "Dive into the world of AI and ML", icon: "fa-graduation-cap" },
    { id: 2, name: "Cybersecurity Club", description: "Create a profile to showcase your skills and join projects.", icon: "fa-star" },
    { id: 3, name: "Networking Club", description: "The Networking Club explores computer networks, cloud computing, and security.", icon: "fa-video" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newClub, setNewClub] = useState({ name: "", description: "" });

  const handleAddClub = () => {
    if (newClub.name && newClub.description) {
      setClubs([...clubs, { id: clubs.length + 1, ...newClub, icon: "fa-users" }]);
      setNewClub({ name: "", description: "" });
      setShowModal(false);
    }
  };

  return (
    <section className="container-fluid highlights py-5 sec1">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center clubs">
            <h1>Discover Our Engineering <br /> Clubs</h1>
            <p>Join a vibrant community where innovation and teamwork drive success in your college experience.</p>
          </div>
        </div>

        <div className="row gy-4 text-center top4">
          {clubs.map((club) => (
            <div key={club.id} className="col-lg-4 col-sm-6 col-12">
              <div className="bg-white p-3 gap-3 shadow-lg book1">
                <i className={`mb-3 fa-solid ${club.icon}`}></i>
                <div className="details">
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  <div className="ej">
                     <button><a href="">Explore</a></button>
                     <button>JOIN</button>
                    <button onClick={() => handleRemoveClub(club.id)}>Remove</button>
                   </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Club Button at Cybersecurity Club Position */}
          <div className="col-lg-4 col-sm-6 col-12">
             <div className="bg-white p-3 gap-3 shadow-lg book1 add-club" onClick={() => setShowModal(true)}>
               <div className="details" id="addnew">
                 <i className="mb-3 fa-solid fa-plus"></i>
                 <h3>Add New Club</h3>
               </div>
             </div>
          </div>
        </div>

        {/* Pop-up Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add a New Club</h3>
              <input type="text" placeholder="Club Name" value={newClub.name} onChange={(e) => setNewClub({ ...newClub, name: e.target.value })} />
              <input type="text" placeholder="Description" value={newClub.description} onChange={(e) => setNewClub({ ...newClub, description: e.target.value })} />
              <button className="btn btn-success" onClick={handleAddClub}>Submit</button>
              <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="but4">
          <button id="eclub"><a href="index.html">Explore Clubs</a></button>
        </div>
      </div>
    </section>
  );
};

export default Clubs;




/*
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.add-club-btn {
  display: block;
  margin: auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
*/ 