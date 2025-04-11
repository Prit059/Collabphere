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
import Profile from "./components/Profile";
import AuthCallback from "./components/AuthCallback";
import Stuhomepage from "./components/Student/Stuhomepage";
import Stuclubs from "./components/Student/Stuclubs";
import HeroSection from "./components/HeroSection";
import BenefitsSection from "./components/BenefitsSection";
import StatsSection from "./components/StatsSection";
import EventsSection from "./components/EventsSection";
import ClubFooter from "./components/ClubFooter";
// import Profile from "./components/Profile";
// import ResetPassword from "./components/ResetPassword";
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

function StudentLayout() {
  return (
    <div>
      <Stuhomepage />
      <Stuclubs />
      <AboutUs />
      <FAQs />
      <Footer />
    </div>
  );
}

function Clubsevent(){
  return(
    <>
      <HeroSection />
      <BenefitsSection />
      <StatsSection />
      <EventsSection />
      <ClubFooter />
    </>
  )
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/stu" element={<StudentLayout />} />
          <Route path="/event" element={<Clubsevent />} />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

