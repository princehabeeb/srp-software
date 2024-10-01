const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');
const authSection = document.getElementById('authSection');
const predictionSection = document.getElementById('predict');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const predictionForm = document.getElementById('predictionForm');
const resultDiv = document.getElementById('result');
const predictedScoreElement = document.getElementById('predictedScore');
// Grab the elements
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
// const navLinks = document.querySelectorAll('.navbar-links a');

// Toggle the navigation menu on click of the hamburger menu
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close the menu when any nav link is clicked on mobile
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});


function isAuthenticated() {
    return !!localStorage.getItem('loggedInUser');
}

function updateUIBasedOnAuth() {
    if (isAuthenticated()) {
        authSection.classList.add('hidden');
        predictionSection.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        authSection.classList.remove('hidden');
        predictionSection.classList.add('hidden');
        logoutBtn.classList.add('hidden');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1); // Get the section's ID

        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update the active state in the navigation
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedPassword = localStorage.getItem('user_' + username);
    if (storedPassword && storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        updateUIBasedOnAuth();

        const redirectAction = localStorage.getItem('redirectAfterLogin');
        if (redirectAction === 'predict') {
            localStorage.removeItem('redirectAfterLogin');
            predictionSection.classList.remove('hidden');
            predictionSection.scrollIntoView(); 
        }
    } else {
        alert('Invalid credentials');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    localStorage.setItem('user_' + username, password);
    alert('Sign up successful! You can now log in.');
    signupForm.reset();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    updateUIBasedOnAuth();
});

predictionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studyHours = parseFloat(document.getElementById('studyHours').value);
    const previousScore = parseFloat(document.getElementById('previousScore').value);
    const attendance = parseFloat(document.getElementById('attendance').value);
    const assignments = parseFloat(document.getElementById('assignments').value);
    const participation = parseFloat(document.getElementById('participation').value);

    const predictedScore = (0.5 * previousScore) + (0.3 * attendance) + (0.1 * assignments) + (0.1 * participation);
    
    predictedScoreElement.innerText = predictedScore.toFixed(2);
    resultDiv.classList.remove('hidden');
});

updateUIBasedOnAuth();
