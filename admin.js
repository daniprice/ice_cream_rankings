// Mock authentication for now (we'll replace with Firebase)
const MOCK_EMAIL = "admin@icecream.com";
const MOCK_PASSWORD = "password123";

let currentUser = null;

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    currentUser = sessionStorage.getItem('loggedIn');
    if (currentUser) {
        showDashboard();
    }
});

// Login form handler
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    // Mock authentication (replace with Firebase later)
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        sessionStorage.setItem('loggedIn', 'true');
        currentUser = 'true';
        showDashboard();
        errorDiv.style.display = 'none';
    } else {
        errorDiv.textContent = 'Invalid email or password';
        errorDiv.style.display = 'block';
    }
});

// Logout handler
document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn');
    currentUser = null;
    showLogin();
});

// Add ranking form handler
document.getElementById('add-ranking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('shop-name').value;
    const location = document.getElementById('shop-location').value;
    const rating = parseFloat(document.getElementById('shop-rating').value);
    
    const successDiv = document.getElementById('add-success');
    const errorDiv = document.getElementById('add-error');
    
    // Get existing rankings from localStorage
    let rankings = JSON.parse(localStorage.getItem('iceRankings') || '[]');
    
    // Add new ranking
    rankings.push({ name, location, rating });
    
    // Save to localStorage (we'll replace with Firebase later)
    localStorage.setItem('iceRankings', JSON.stringify(rankings));
    
    // Show success message
    successDiv.textContent = `Successfully added ${name}!`;
    successDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    
    // Reset form
    document.getElementById('add-ranking-form').reset();
    
    // Refresh rankings list
    loadAdminRankings();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
});

function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadAdminRankings();
}

function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function loadAdminRankings() {
    const rankings = JSON.parse(localStorage.getItem('iceRankings') || '[]');
    const container = document.getElementById('admin-rankings-list');
    
    if (rankings.length === 0) {
        container.innerHTML = '<div class="loading">No rankings yet.</div>';
        return;
    }
    
    rankings.sort((a, b) => b.rating - a.rating);
    
    let html = '';
    rankings.forEach((ranking, index) => {
        html += `
            <div class="ranking-item">
                <div class="rank-number">#${index + 1}</div>
                <div class="ice-cream-info">
                    <div class="ice-cream-name">${ranking.name}</div>
                    <div class="ice-cream-location">${ranking.location}</div>
                </div>
                <div class="stars">${renderStars(ranking.rating)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star-filled">★</span>';
        } else if (i - 0.5 === rating) {
            stars += '<span class="star-filled">½</span>';
        } else {
            stars += '<span class="star-empty">☆</span>';
        }
    }
    return stars;
}
