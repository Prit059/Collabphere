import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/profile`, { 
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setProfile(res.data))
    .catch(() => alert("Failed to fetch profile!"));
  }, [token]);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;
