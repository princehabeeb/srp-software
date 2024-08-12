// Navigation
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

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
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentId').value;
    const email = document.getElementById('studentEmail').value;
    
    // Here you would typically send this data to a server
    console.log(`Registering student: ${name}, ID: ${id}, Email: ${email}`);
    alert('Student registered successfully!');
    registerForm.reset();
});

// Result Prediction (from previous example)
const trainingData = [
    { studyHours: 2, previousScore: 65, finalScore: 67 },
    { studyHours: 3, previousScore: 70, finalScore: 75 },
    { studyHours: 4, previousScore: 75, finalScore: 80 },
    { studyHours: 5, previousScore: 80, finalScore: 85 },
    { studyHours: 6, previousScore: 85, finalScore: 90 }
];

function linearRegression(x1, x2, y) {
    // ... (same as before)
}

const x1 = trainingData.map(d => d.studyHours);
const x2 = trainingData.map(d => d.previousScore);
const y = trainingData.map(d => d.finalScore);
const model = linearRegression(x1, x2, y);

function predictScore(studyHours, previousScore) {
    return model.a * studyHours + model.b * previousScore + model.c;
}

const predictionForm = document.getElementById('predictionForm');
predictionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studyHours = parseFloat(document.getElementById('studyHours').value);
    const previousScore = parseFloat(document.getElementById('previousScore').value);
    
    const predictedScore = predictScore(studyHours, previousScore);
    
    document.getElementById('predictedScore').textContent = predictedScore.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
});

// Settings
const settingsForm = document.getElementById('settingsForm');
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modelType = document.getElementById('modelType').value;
    const dataSource = document.getElementById('dataSource').value;
    const theme = document.getElementById('theme').value;
    
    // Here you would typically save these settings
    console.log(`Saving settings: Model: ${modelType}, Data Source: ${dataSource}, Theme: ${theme}`);
    alert('Settings saved successfully!');
});

// Theme switcher
document.getElementById('theme').addEventListener('change', (e) => {
    if (e.target.value === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#f4f4f4';
        document.body.style.color = '#333';
    }
});