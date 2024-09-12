// Navigation
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');
// Authentication Data Storage
const authSection = document.getElementById('authSection');
const predictionSection = document.getElementById('predictionSection');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);

        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(targetId).classList.add('active');

        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });

        link.classList.add('active');
    });
});

// Student Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('studentName').value;
        const id = document.getElementById('studentId').value;
        const email = document.getElementById('studentEmail').value;

        // Send this data to the server or process it
        console.log(`Registering student: ${name}, ID: ${id}, Email: ${email}`);
        alert('Student registered successfully!');
        registerForm.reset();
    });
}

// Model Calculations (Linear, Polynomial, Logistic)
const trainingData = [
    { studyHours: 2, previousScore: 65, finalScore: 67 },
    { studyHours: 3, previousScore: 70, finalScore: 75 },
    { studyHours: 4, previousScore: 75, finalScore: 80 },
    { studyHours: 5, previousScore: 80, finalScore: 85 },
    { studyHours: 6, previousScore: 85, finalScore: 90 }
];

function linearRegression(x1, x2, y) {
    const n = x1.length;
    let sumX1 = 0, sumX2 = 0, sumY = 0, sumX1Y = 0, sumX2Y = 0, sumX1X2 = 0;
    
    for (let i = 0; i < n; i++) {
        sumX1 += x1[i];
        sumX2 += x2[i];
        sumY += y[i];
        sumX1Y += x1[i] * y[i];
        sumX2Y += x2[i] * y[i];
        sumX1X2 += x1[i] * x2[i];
    }
    
    const b = ((n * sumX1Y - sumX1 * sumY) / (n * sumX1X2 - sumX1 * sumX2));
    const a = (sumY - b * sumX1) / n;
    
    return { a, b, c: 1 }; // Basic linear model
}

const x1 = trainingData.map(d => d.studyHours);
const x2 = trainingData.map(d => d.previousScore);
const y = trainingData.map(d => d.finalScore);
const model = linearRegression(x1, x2, y);

// Predict score based on the selected model type
function predictScore(studyHours, previousScore, attendance, assignments, participation) {
    const modelType = document.getElementById('modelType').value;
    let predictedScore;

    if (modelType === 'linear') {
        predictedScore = model.a * studyHours + model.b * previousScore + model.c;
    } else if (modelType === 'polynomial') {
        predictedScore = polynomialRegression(studyHours, previousScore);
    } else if (modelType === 'logistic') {
        predictedScore = logisticRegression(studyHours, previousScore, attendance, assignments, participation);
    }

    return predictedScore;
}

// Define polynomial and logistic regression (placeholders)
function polynomialRegression(studyHours, previousScore) {
    // Polynomial regression logic here
    return somePolynomialCalculation;
}

function logisticRegression(studyHours, previousScore, attendance, assignments, participation) {
    // Logistic regression logic
    return someLogisticCalculation;
}

// Handle form submission for result prediction
const predictionForm = document.getElementById('predictionForm');
predictionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!isAuthenticated()) {
        alert('Please log in to predict your score.');
        return;
    }

    const studyHours = parseFloat(document.getElementById('studyHours').value);
    const previousScore = parseFloat(document.getElementById('previousScore').value);
    const attendance = parseFloat(document.getElementById('attendance').value);
    const assignments = parseFloat(document.getElementById('assignments').value);
    const participation = parseFloat(document.getElementById('participation').value);

    const predictedScore = predictScore(studyHours, previousScore, attendance, assignments, participation);
    
    document.getElementById('predictedScore').textContent = predictedScore.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
});


// Handle CSV upload
document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('trainingDataFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const csvData = event.target.result;
            processTrainingData(csvData); // Process and update the training data
        };
        reader.readAsText(file);
        document.getElementById('uploadResult').classList.remove('hidden');
    } else {
        alert('Please select a CSV file.');
    }
});

function processTrainingData(csvData) {
    // Implement CSV parsing and training data update logic
}

// Settings form
const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modelType = document.getElementById('modelType').value;
        const dataSource = document.getElementById('dataSource').value;
        const theme = document.getElementById('theme').value;

        // Save settings
        console.log(`Saving settings: Model: ${modelType}, Data Source: ${dataSource}, Theme: ${theme}`);
        alert('Settings saved successfully!');
    });
}

// Theme switcher
const themeSelect = document.getElementById('theme');
if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'dark') {
            document.body.style.backgroundColor = '#333';
            document.body.style.color = '#fff';
        } else {
            document.body.style.backgroundColor = '#f4f4f4';
            document.body.style.color = '#333';
        }
    });
}

// Helper function to check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('loggedInUser');
}

// Show/hide sections based on authentication
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

// Signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Save user data to localStorage (simplified for demo)
    if (username && password) {
        localStorage.setItem('user_' + username, password);
        alert('Signup successful! You can now login.');
        signupForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check credentials from localStorage
    const storedPassword = localStorage.getItem('user_' + username);
    if (storedPassword && storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        updateUIBasedOnAuth();
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    updateUIBasedOnAuth();
});

// Initialize UI on page load
updateUIBasedOnAuth();
