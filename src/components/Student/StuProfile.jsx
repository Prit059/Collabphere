import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StuProfile.css";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [],
    education: [],
    certifications: [],
    interests: [],
    clubs: [],
    socialLinks: {
      linkedin: "",
      twitter: "",
      instagram: ""
    }
  });

  const [originalProfile, setOriginalProfile] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState({ institution: "", degree: "", year: "" });
  const [newCertification, setNewCertification] = useState({ name: "", issuer: "", year: "" });
  const [newInterest, setNewInterest] = useState("");
  const [newClub, setNewClub] = useState({ name: "", role: "", description: "" });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [profile]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        const userData = response.data.profile || {};
        const initialProfile = {
          name: response.data.user_name || "",
          email: response.data.user_email || "",
          bio: userData.bio || "",
          skills: userData.skills || [],
          education: userData.education || [],
          certifications: userData.certifications || [],
          interests: userData.interests || [],
          clubs: userData.clubs || [],
          socialLinks: userData.socialLinks || {
            linkedin: "",
            twitter: "",
            instagram: ""
          }
        };
        setProfile(initialProfile);
        setOriginalProfile(initialProfile);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      setError("Failed to fetch user data.");
    }
  };

  const calculateProgress = () => {
    let completedFields = 0;
    const totalFields = 8; // Total fields we're tracking for completion
    
    if (profile.name) completedFields++;
    if (profile.email) completedFields++;
    if (profile.bio) completedFields++;
    if (profile.skills.length > 0) completedFields++;
    if (profile.education.length > 0) completedFields++;
    if (profile.certifications.length > 0) completedFields++;
    if (profile.interests.length > 0) completedFields++;
    if (profile.clubs.length > 0) completedFields++;

    setProgress(Math.round((completedFields / totalFields) * 100));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    if (newEducation.institution.trim() && newEducation.degree.trim()) {
      setProfile(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation }]
      }));
      setNewEducation({ institution: "", degree: "", year: "" });
    }
  };

  const removeEducation = (index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification }]
      }));
      setNewCertification({ name: "", issuer: "", year: "" });
    }
  };

  const removeCertification = (index) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (index) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const addClub = () => {
    if (newClub.name.trim() && newClub.role.trim()) {
      setProfile(prev => ({
        ...prev,
        clubs: [...prev.clubs, { ...newClub }]
      }));
      setNewClub({ name: "", role: "", description: "" });
    }
  };

  const removeClub = (index) => {
    setProfile(prev => ({
      ...prev,
      clubs: prev.clubs.filter((_, i) => i !== index)
    }));
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const profileData = {
        bio: profile.bio,
        skills: profile.skills,
        education: profile.education,
        certifications: profile.certifications,
        interests: profile.interests,
        clubs: profile.clubs,
        socialLinks: profile.socialLinks
      };
  
      await axios.put("http://localhost:5001/profile", profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setOriginalProfile(profile);
      setEditMode(false);
      setSuccess("Profile saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
  
    } catch (error) {
      console.log("Error saving profile:", error.response?.data || error.message);
      setError("Failed to save profile data. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };
    


  const cancelEdit = () => {
    if (JSON.stringify(profile) !== JSON.stringify(originalProfile)) {
      setShowConfirm(true);
    } else {
      resetToOriginal();
    }
  };


  const resetToOriginal = () => {
    setProfile(originalProfile);
    setEditMode(false);
    setShowConfirm(false);
  };
  const continueEditing = () => {
    setShowConfirm(false);
  };

  return (
    <div className="profile-container">
      {showConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Unsaved Changes</h3>
            <p>You have unsaved changes. Are you sure you want to cancel?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={resetToOriginal}>Discard Changes</button>
              <button className="continue-btn" onClick={continueEditing}>Continue Editing</button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{progress}% Complete</span>
        </div>
        {editMode ? (
          <div className="edit-actions">
          <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
          <button className="save-btn" onClick={saveProfile}>
            {progress < 100 ? "Save Progress" : "Save Profile"}
          </button>
        </div>
        ) : (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            {progress < 100 ? "Complete Profile" : "Edit Profile"}
          </button>
        )}
        <button className="HomeMain">
          <Link to="/stu" id="Homelink">HOME</Link>
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <div className="alert success">{success}</div>}

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-card">
            <img src="/assets/LOGO.png" alt="Profile" className="avatar" />
            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="profile-input"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="profile-input"
                />
              </>
            ) : (
              <>
                <h2>{profile.name || "Your Name"}</h2>
                <p className="profile-email">{profile.email || "your.email@example.com"}</p>
              </>
            )}

            <div className="profile-social">
              {editMode ? (
                <>
                  <div className="social-input-group">
                    <i className="fab fa-linkedin"></i>
                    <input
                      type="text"
                      name="linkedin"
                      value={profile.socialLinks.linkedin}
                      onChange={handleSocialLinkChange}
                      placeholder="LinkedIn URL"
                      className="social-input"
                    />
                  </div>
                  <div className="social-input-group">
                    <i className="fab fa-twitter"></i>
                    <input
                      type="text"
                      name="twitter"
                      value={profile.socialLinks.twitter}
                      onChange={handleSocialLinkChange}
                      placeholder="Twitter URL"
                      className="social-input"
                    />
                  </div>
                  <div className="social-input-group">
                    <i className="fab fa-instagram"></i>
                    <input
                      type="text"
                      name="instagram"
                      value={profile.socialLinks.instagram}
                      onChange={handleSocialLinkChange}
                      placeholder="Instagram URL"
                      className="social-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  {profile.socialLinks.linkedin && (
                    <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {profile.socialLinks.twitter && (
                    <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {profile.socialLinks.instagram && (
                    <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Skills {editMode && <button className="add-btn" onClick={addSkill}>+</button>}</h3>
            {editMode && (
              <div className="input-group">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="tag-input"
                />
              </div>
            )}
            <div className="skills-container">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                    {editMode && <span className="remove-tag" onClick={() => removeSkill(index)}>×</span>}
                  </span>
                ))
              ) : (
                <p className="empty-message">No skills added yet</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Interests {editMode && <button className="add-btn" onClick={addInterest}>+</button>}</h3>
            {editMode && (
              <div className="input-group">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  className="tag-input"
                />
              </div>
            )}
            <div className="interests-container">
              {profile.interests.length > 0 ? (
                profile.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                    {editMode && <span className="remove-tag" onClick={() => removeInterest(index)}>×</span>}
                  </span>
                ))
              ) : (
                <p className="empty-message">No interests added yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-main-section">
            <h3>About</h3>
            {editMode ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                className="bio-input"
                rows="4"
              />
            ) : (
              <p className="profile-bio">
                {profile.bio || "No bio added yet. Tell us about yourself!"}
              </p>
            )}
          </div>

          <div className="profile-main-section">
            <h3>Education {editMode && <button className="add-btn" onClick={addEducation}>+</button>}</h3>
            {editMode && (
              <div className="form-group">
                <input
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                  placeholder="Institution"
                  className="form-input"
                />
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                  placeholder="Degree"
                  className="form-input"
                />
                <input
                  type="text"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                  placeholder="Year (e.g., 2018-2022)"
                  className="form-input"
                />
              </div>
            )}
            <div className="timeline">
              {profile.education.length > 0 ? (
                profile.education.map((edu, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      {editMode && (
                        <span className="remove-item" onClick={() => removeEducation(index)}>×</span>
                      )}
                      <h4>{edu.institution}</h4>
                      <p>{edu.degree}</p>
                      <p className="timeline-year">{edu.year}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-message">No education added yet</p>
              )}
            </div>
          </div>

          <div className="profile-main-section">
            <h3>Certifications {editMode && <button className="add-btn" onClick={addCertification}>+</button>}</h3>
            {editMode && (
              <div className="form-group">
                <input
                  type="text"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                  placeholder="Certification Name"
                  className="form-input"
                />
                <input
                  type="text"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                  placeholder="Issuing Organization"
                  className="form-input"
                />
                <input
                  type="text"
                  value={newCertification.year}
                  onChange={(e) => setNewCertification({...newCertification, year: e.target.value})}
                  placeholder="Year Obtained"
                  className="form-input"
                />
              </div>
            )}
            <div className="certifications-container">
              {profile.certifications.length > 0 ? (
                profile.certifications.map((cert, index) => (
                  <div key={index} className="certification-card">
                    {editMode && (
                      <span className="remove-item" onClick={() => removeCertification(index)}>×</span>
                    )}
                    <h4>{cert.name}</h4>
                    <p>{cert.issuer}</p>
                    <p className="certification-year">{cert.year}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message">No certifications added yet</p>
              )}
            </div>
          </div>

          <div className="profile-main-section">
            <h3>Club Involvement {editMode && <button className="add-btn" onClick={addClub}>+</button>}</h3>
            {editMode && (
              <div className="form-group">
                <input
                  type="text"
                  value={newClub.name}
                  onChange={(e) => setNewClub({...newClub, name: e.target.value})}
                  placeholder="Club Name"
                  className="form-input"
                />
                <input
                  type="text"
                  value={newClub.role}
                  onChange={(e) => setNewClub({...newClub, role: e.target.value})}
                  placeholder="Your Role"
                  className="form-input"
                />
                <input
                  type="text"
                  value={newClub.description}
                  onChange={(e) => setNewClub({...newClub, description: e.target.value})}
                  placeholder="Description"
                  className="form-input"
                />
              </div>
            )}
            <div className="clubs-container">
              {profile.clubs.length > 0 ? (
                profile.clubs.map((club, index) => (
                  <div key={index} className="club-card">
                    {editMode && (
                      <span className="remove-item" onClick={() => removeClub(index)}>×</span>
                    )}
                    <h4>{club.name}</h4>
                    <p>{club.role}</p>
                    <p>{club.description}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message">No club involvement added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;