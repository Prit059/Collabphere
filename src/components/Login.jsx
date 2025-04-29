import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaSolution, setCaptchaSolution] = useState("");
  const captchaAnswerRef = useRef(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const generateCaptcha = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaSolution(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check CAPTCHA first
    const captchaAnswer = captchaAnswerRef.current.value.trim();
    if (captchaAnswer !== captchaSolution) {
      document.getElementById('captcha-error').classList.remove('hidden');
      generateCaptcha(); // Regenerate new captcha
      setCaptchaError(true);
      return;
    } else {
      setCaptchaError(false);
    }

    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      if(data.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/stu");
      }
    } else {
      alert(data.error);
      generateCaptcha(); // Regenerate CAPTCHA on failed login
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} eye-icon`}
              onClick={() => setShowPassword((prev) => !prev)}
            ></i>
          </div>

          <div className="flex items-center space-x-2" id="capin">
            <div className="captcha">
              <div>CAPTCHA : </div>
              <div className="font-bold px-1 py-1 rounded bg-gray-200 bg-white text-black text-lg tracking-widest select-none rotate-[2deg] skew-x-2" id="cap">
                {captchaSolution}
              </div>
            </div>
            <input
              ref={captchaAnswerRef}
              type="text"
              className="border border-gray-400 p-2 rounded w-20"
              placeholder="ENTER CAPTCHA"
              required
            />
          </div>
          {captchaError && (
            <span id="captcha-error" className="text-red-500 text-sm hidden">
              Incorrect CAPTCHA. Try again
            </span>
          )}

          <button type="submit">Login</button>
        </form>

        <Link className="forgot" to="/forgot-password">Forgot Password</Link>
        <p>
          Don't have an account : <Link id="signup" to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;