import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [captchaSolution, setCaptchaSolution] = useState("");
  const captchaAnswerRef = useRef(null); // Use ref for captcha input
  const [captchaError, setCaptchaError] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    const gmailRegex = /^[0-9]{2}[cC][eE][0-9]{3}@charusat\.edu\.in$/;
    const strongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!name.trim()) formErrors.name = "Name is required";

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!gmailRegex.test(email)) {
      formErrors.email = "Email must be Your College gmail address and CE-(Computer Department) Only Register";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (!strongPassword.test(password)) {
      formErrors.password =
        "Password must be at least 8 characters and include a number and special character";
    }

    if (confirmPassword !== password) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

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

  const handleRegister = async (e) => {
    e.preventDefault();
    // Check captcha answer from the ref
    const captchaAnswer = captchaAnswerRef.current.value.trim();
    if (captchaAnswer !== captchaSolution) {
      document.getElementById('captcha-error').classList.remove('hidden');
      generateCaptcha(); // Regenerate new captcha
      setCaptchaError(true);
      return;
    } else {
      setCaptchaError(false);
    }

    if (!validateForm()) return;

    const response = await fetch("http://localhost:5001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("Username", data.name);
      navigate("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="register">
      <div className="slogo">
        <img src="./images/cspit.webp" alt="college logo" />
      </div>

      <div className="inr">
        <div className="signimg">
          <img src="./images/LOGO.png" alt="logo" />
          <h2>Sign Up</h2>
        </div>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <input
            type="email"
            placeholder="Email (college Mail Address)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="password"
            placeholder="Password (min 8 chars, number & special char)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
          <div className="flex items-center space-x-2" id="capin">
            <div className="captcha">
              <div>
                CAPTCHA : 
              </div>
              <div className="font-bold px-1 py-1 rounded bg-gray-200 bg-white text-black text-lg tracking-widest select-none rotate-[2deg] skew-x-2"    id="cap">
                {captchaSolution}
              </div>
            </div>
            <input
              ref={captchaAnswerRef}
              type="text"
              className="border border-gray-400 p-2 rounded w-20"
              placeholder="ENTER VAILD CAPTCHA"
              required
            />
          </div>
          {captchaError && (
          <span id="captcha-error" className="text-red-500 text-sm hidden">
            Incorrect CAPTCHA. Try again
          </span>
          )}
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
