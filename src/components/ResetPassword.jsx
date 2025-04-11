import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [data, setData] = useState({ resetToken: "", newPassword: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, data);
      alert("Password Reset Successful!");
    } catch (err) {
      alert("Failed to reset password!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="resetToken" placeholder="Reset Token" onChange={handleChange} />
      <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
