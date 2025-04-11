import React, { useState } from 'react';
import './EventsSection.css';
import { useEffect } from 'react';


const initialEvents = {
  current: [
    {
      id: 1,
      title: 'Weekly CTF Challenge',
      date: '2024-03-20',
      time: '14:00',
      location: 'Virtual',
      description: 'Join us for our weekly Capture The Flag challenge. Test your skills in various cybersecurity domains.',
      category: 'Competition',
      attendees: 45,
      image: '🎯'
    },
    {
      id: 2,
      title: 'Network Security Workshop',
      date: '2024-03-22',
      time: '15:30',
      location: 'Room 101',
      description: 'Learn about network security fundamentals and practical defense techniques.',
      category: 'Workshop',
      attendees: 30,
      image: '🛡️'
    }
  ],
  upcoming: [
    {
      id: 3,
      title: 'Ethical Hacking Seminar',
      date: '2024-04-05',
      time: '16:00',
      location: 'Auditorium',
      description: 'Expert-led seminar on ethical hacking methodologies and best practices.',
      category: 'Seminar',
      attendees: 0,
      image: '🔒'
    }
  ]
};

const categories = [
  { id: 'workshop', name: 'Workshop', icon: '🎓' },
  { id: 'seminar', name: 'Seminar', icon: '📚' },
  { id: 'competition', name: 'Competition', icon: '🏆' },
  { id: 'meetup', name: 'Meetup', icon: '👥' },
  { id: 'training', name: 'Training', icon: '💪' },
  { id: 'conference', name: 'Conference', icon: '🎤' }
];

const EventsSection = () => {
  const [events, setEvents] = useState(initialEvents);
  const [activeTab, setActiveTab] = useState('current');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    image: '🎯'
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'http://localhost:5002/api/events';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const validateDate = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part to compare dates only

    // Check if the date is valid
    if (isNaN(selectedDate.getTime())) {
      return 'Please enter a valid date';
    }

    // Check if the date is in the past
    if (selectedDate < today) {
      return 'Event date cannot be in the past';
    }

    // Check if the date is too far in the future (e.g., 2 years)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    if (selectedDate > maxDate) {
      return 'Event date cannot be more than 2 years in the future';
    }

    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});

    // Validate all fields
    const newErrors = {};
    
    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Event title must be at least 5 characters long';
    }

    // Validate date
    const dateError = validateDate(formData.date);
    if (dateError) {
      newErrors.date = dateError;
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = 'Event time is required';
    }

    // Validate location
    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required';
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'Location must be at least 3 characters long';
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new event
    const newEvent = {
      id: Date.now(),
      title: formData.title.trim(),
      date: formData.date,
      time: formData.time,
      location: formData.location.trim(),
      description: formData.description.trim(),
      category: formData.category,
      image: formData.image,
      attendees: 0
    };

    // Add to appropriate list based on date
    const eventDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      setEvents(prev => ({
        ...prev,
        current: [...prev.current, newEvent]
      }));
    } else {
      setEvents(prev => ({
        ...prev,
        upcoming: [...prev.upcoming, newEvent]
      }));
    }

    // Reset form
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      category: '',
      image: '🎯'
    });

    // Show success message
    setSuccessMessage('Event added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    
    try {
      let response;
      const eventData = {
        title: formData.title.trim(),
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image
      };

      if (editingEvent) {
        // Update existing event
        response = await fetch(`${API_URL}/${editingEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData)
        });
      } else {
        // Add new event
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData)
        });
      }

      if (!response.ok) throw new Error('Network response was not ok');
      
      // Refresh events after successful operation
      const eventsResponse = await fetch(API_URL);
      const updatedEvents = await eventsResponse.json();
      setEvents(updatedEvents);

      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: '',
        image: '🎯'
      });

      setSuccessMessage(editingEvent ? 'Event updated successfully!' : 'Event added successfully!');
      setEditingEvent(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors({ submit: 'Failed to save event. Please try again.' });
    }
  };

  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (eventToDelete) {
      try {
        const response = await fetch(`${API_URL}/${eventToDelete}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Refresh events after deletion
        const eventsResponse = await fetch(API_URL);
        const updatedEvents = await eventsResponse.json();
        setEvents(updatedEvents);
        
        setShowDeleteConfirm(false);
        setEventToDelete(null);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setEventToDelete(null);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      category: event.category,
      image: event.image
    });
    setActiveTab('add');
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category: category.name,
      image: category.icon
    }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  return (
    <section id="club-events" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h2>Club Events</h2>
          <p className="section-subtitle">Join our exciting events and enhance your cybersecurity skills</p>
        </div>

        <div className="events-tabs">
          <button
            className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Events
          </button>
          <button
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Event
          </button>
          <button
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Club Dashboard
          </button>
        </div>

        {activeTab === 'add' ? (
          <div className="add-event-form">
            <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={errors.date ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]}
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={errors.time ? 'error' : ''}
                  />
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label>Category</label>
                <div className="category-selector">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      type="button"
                      className={`category-option ${formData.category === category.name ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </button>
                  ))}
                </div>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setEditingEvent(null);
                    setActiveTab('current');
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        ) : activeTab === 'dashboard' ? (
          <div className="dashboard-content">
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-value">{events.current.length + events.upcoming.length}</div>
                <div className="stat-label">Total Events</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{events.current.reduce((sum, event) => sum + event.attendees, 0)}</div>
                <div className="stat-label">Total Attendees</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{events.upcoming.length}</div>
                <div className="stat-label">Upcoming Events</div>
              </div>
            </div>

            <div className="dashboard-events">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {[...events.current, ...events.upcoming]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map(event => (
                    <div className="activity-item" key={event.id}>
                      <div className="activity-icon">{event.image}</div>
                      <div className="activity-content">
                        <div className="activity-title">{event.title}</div>
                        <div className="activity-details">
                          {event.date} at {event.time} • {event.attendees} attendees
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="events-grid">
            {events[activeTab]?.map(event => (
              <div className="event-card" key={event.id}>
                <div className="event-image">{event.image}</div>
                <div className="event-content">
                  <span className="event-category">{event.category}</span>
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <div className="event-detail">
                      <span className="detail-icon">📅</span>
                      {event.date}
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">⏰</span>
                      {event.time}
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">📍</span>
                      {event.location}
                    </div>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-footer">
                    <div className="attendees">
                      <span className="detail-icon">👥</span>
                      {event.attendees} attending
                    </div>
                    <div className="event-actions">
                      <button 
                        className="edit-button"
                        onClick={() => handleEditClick(event)}
                        title="Edit Event"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteClick(event.id)}
                        title="Delete Event"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>Delete Event</h3>
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="delete-confirm-buttons">
              <button className="cancel-button" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button className="confirm-delete-button" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;