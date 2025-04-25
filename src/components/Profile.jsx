import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState("");
  const [email,setemail] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.get("http://localhost:5001/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setUser(response.data.user_name);
      setemail(response.data.user_email);
  
    } catch (error) {
      console.log("Error fetching user data:", error);
      setError("Failed to fetch user data.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src="/images/avatar.png" alt="Profile" className="avatar" />
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h2>{user}</h2>
            <p><strong>Email:</strong> {email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
