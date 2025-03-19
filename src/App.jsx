import React from "react";
import Clubs from "./components/Clubs";
import AboutUs from "./components/AboutUs";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import FAQs from "./components/FAQs";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
// import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

function MainLayout() {
    return(
      <>
        <HomePage />
        <Clubs />
        <AboutUs />
        <FAQs />
        <Footer />
      </>
    );
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

