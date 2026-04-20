// Profile Animations
function handleProfileAnimation() {
    const profiles = document.querySelectorAll('.profile');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5
    });

    profiles.forEach(profile => observer.observe(profile));
}

// Stats Counter Animation
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Event Tabs
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Reviews System
function setupReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    const reviewForm = document.getElementById('review-form');
    let selectedRating = 0;

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviewsContainer.innerHTML = reviews.map(review => `
            <div class="review-card">
                <img src="images/review.png" alt="${review.name}">
                <h3>${review.name}</h3>
                <p>${review.review}</p>
                <p>${'&#9733;'.repeat(review.rating)}</p>
            </div>
        `).join('');
    }

    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < selectedRating; i++) {
                document.querySelectorAll('.star')[i].classList.add('selected');
            }
        });
    });

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const review = document.getElementById('review').value.trim();
        
        if (!selectedRating) {
            alert("Please select a rating");
            return;
        }
        if (!name || !review) {
            alert("Please fill in all fields");
            return;
        }

        const newReview = { name, review, rating: selectedRating };
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        reviewForm.reset();
        selectedRating = 0;
        document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
        loadReviews();
    });

    loadReviews();
}

// Upcoming Events System
function setupEvents() {
    const addEventBtn = document.getElementById('add-event-btn');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.getElementById('submit-event');
    const upcomingSection = document.getElementById('upcoming');

    const popupTitle = document.getElementById('popup-title');
    const eventIdInput = document.getElementById('event-id');
    const imageInput = document.getElementById('event-image');
    const imagePreview = document.getElementById('image-preview');

    let events = JSON.parse(localStorage.getItem('events') || '[]');

    function renderEvents() {
        upcomingSection.innerHTML = events.map((event, index) => `
            <div class="event-card" data-index="${index}">
                <img src="${event.image || 'https://via.placeholder.com/300x200'}" alt="${event.name}">
                <h3>${event.name}</h3>
                <p>${event.description}</p>
                <small>Registration Ends: ${event.registrationDuration}</small>
                <div class="event-actions">
                    <button class="edit-event-btn">Edit</button>
                    <button class="remove-event-btn">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Initial render
    renderEvents();

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
        }
    });

    addEventBtn.addEventListener('click', () => {
        popupTitle.textContent = 'Add New Event';
        eventIdInput.value = '';
        document.getElementById('event-name').value = '';
        document.getElementById('event-description').value = '';
        document.getElementById('registration-duration').value = '';
        imageInput.value = null;
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
        popup.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    submitBtn.addEventListener('click', () => {
        const eventName = document.getElementById('event-name').value.trim();
        const eventDescription = document.getElementById('event-description').value.trim();
        const registrationDuration = document.getElementById('registration-duration').value.trim();
        const eventImage = (imagePreview.src && imagePreview.src !== '#') ? imagePreview.src : null;

        if (!eventName || !eventDescription || !registrationDuration) {
            alert("Please fill in all fields.");
            return;
        }

        const eventId = eventIdInput.value;
        if (eventId) { // Edit existing event
            const index = parseInt(eventId);
            events[index] = { name: eventName, description: eventDescription, registrationDuration, image: eventImage };
        } else { // Add new event
            events.push({ name: eventName, description: eventDescription, registrationDuration, image: eventImage });
        }

        localStorage.setItem('events', JSON.stringify(events));
        renderEvents();
        popup.style.display = 'none';
    });

    upcomingSection.addEventListener('click', (event) => {
        const target = event.target;
        const eventCard = target.closest('.event-card');

        if (eventCard) {
            const index = eventCard.dataset.index;
            if (target.classList.contains('remove-event-btn')) {
                events.splice(index, 1);
                localStorage.setItem('events', JSON.stringify(events));
                renderEvents();
            } else if (target.classList.contains('edit-event-btn')) {
                const eventToEdit = events[index];
                popupTitle.textContent = 'Edit Event';
                eventIdInput.value = index;
                document.getElementById('event-name').value = eventToEdit.name;
                document.getElementById('event-description').value = eventToEdit.description;
                document.getElementById('registration-duration').value = eventToEdit.registrationDuration;
                imagePreview.src = eventToEdit.image || '#';
                imagePreview.style.display = eventToEdit.image ? 'block' : 'none';
                popup.style.display = 'block';
            }
        }
    });
}

// Main Execution
document.addEventListener("DOMContentLoaded", () => {
    handleProfileAnimation();
    setupTabs();
    setupReviews();
    setupEvents();

    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            animateCounter();
            observer.unobserve(entries[0].target);
        }
    });
    statsObserver.observe(statsSection);
});
