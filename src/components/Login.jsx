import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      if(data.user.role=== "admin") {
        navigate("/");
      }
      else {
        navigate("/stu");
      }
    } else {
      alert(data.error);
    }
  };

  const handleGoogleLogin = () => {
    const clientId = "174309633375-kdevml88gr8793kp2pn4f6qpel57iihe.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:5173/auth/callback");
    const scope = encodeURIComponent("profile email");
    
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
  };

  return (
    <div className="login">
      <div className="logo">
        <img src="./images/cspit.webp" alt="" />
      </div>
      <div className="mainuser">
        <div className="limg">
          <img src="./images/LOGO.png" alt="" />
          <h2>Login</h2>
        </div>

      <form onSubmit={handleLogin} className="user">
        
        <input
          type="email"
          placeholder="Email"   //&#xf406;
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        <button type="submit">Login</button>
      </form>
      <div className="oauth-divider">
          <span className="divider-line"></span>
          <span className="divider-text">OR</span>
          <span className="divider-line"></span>
        </div>

        <button onClick={handleGoogleLogin} className="google-login-btn">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google logo" 
            className="google-logo"
          />
          Continue with Google
        </button>
      <Link className="forgot" to="/forgot-password">Forgot Password</Link>
      <p>
        Don't have an account : <Link id="signup" to="/register">Sign Up</Link>
      </p>
      </div>
    </div>
  );
};

export default Login;