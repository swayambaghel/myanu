import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx1cUHe43H2hpbPnDpsuUwTA9A9CLPwRE",
  authDomain: "symanu-8feca.firebaseapp.com",
  databaseURL: "https://symanu-8feca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "symanu-8feca",
  storageBucket: "symanu-8feca.firebasestorage.app",
  messagingSenderId: "384265739052",
  appId: "1:384265739052:web:831672d3f4a44aed0b2a89",
  measurementId: "G-7WT2DCK760"
};

// Initialize Firebase and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

const allowedEmails = [
  "shivadityas3@gmail.com",
  "anmolpatel3700@gmail.com",
  "swayambaghel038@gmail.com"
];

const monthData = {
  "November 2023": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "November 2023 - The beginning of our journey"
  },
  "December 2023": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "December 2023 - Winter celebrations"
  },
  "January 2024": {  // Corrected: added the missing opening brace
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "January 2024 - New Year, New Beginnings"
  },
  "February 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "February 2024 - Month of Love"
  },
  "March 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "March 2024 - Spring Arrival"
  },
  "April 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "April 2024 - Spring in Full Bloom"
  },
  "May 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "May 2024 - Summer Begins"
  },
  "June 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "June 2024 - Mid-Year Reflections"
  },
  "July 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "July 2024 - Summer Adventures"
  },
  "August 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "August 2024 - Late Summer Days"
  },
  "September 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "September 2024 - Fall Approaches"
  },
  "October 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "October 2024 - Autumn Colors"
  },
  "November 2024": {
    imageUrl: "https://drive.google.com/uc?export=view&id=1byjvEjfD57bH7-isYVgERqe0QmttgWxp",
    caption: "November 2024 - One Year Milestone"
  }
};


// DOM Elements
const timerElement = document.getElementById("timer");
const monthCardsContainer = document.getElementById("month-cards-container");
const monthDialog = document.getElementById("month-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogMessage = document.getElementById("dialog-message");

// Login functionality
document.getElementById('login-button').addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      const userEmail = result.user.email;
      if (allowedEmails.includes(userEmail)) {
        displayUserInfo(result.user);
        startCountdown();
        generateMonthCards();
      } else {
        auth.signOut().then(() => {
          alert("Access Denied: Your account is not authorized.");
        });
      }
    })
    .catch(error => {
      console.error("Error during sign-in:", error);
    });
});

// Logout functionality
document.getElementById('logout-button').addEventListener('click', () => {
  signOut(auth).then(() => {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('login-button').style.display = 'block';
    document.getElementById('logout-button').style.display = 'none';
    monthCardsContainer.innerHTML = '';
    stopCountdown();
  });
});

function displayUserInfo(user) {
  document.getElementById('user-name').textContent = user.displayName;
  document.getElementById('user-pic').src = user.photoURL;
  document.getElementById('user-info').style.display = 'flex';
  document.getElementById('login-button').style.display = 'none';
  document.getElementById('logout-button').style.display = 'block';
}

// Countdown Logic
let countdownInterval;

function startCountdown() {
  const targetDate2024 = new Date("November 23, 2024 12:00:00 GMT+0530").getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate2024 - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      startNextYearCountdown();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function startNextYearCountdown() {
  const targetDate2025 = new Date("November 23, 2025 12:00:00 GMT+0530").getTime();
  
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate2025 - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval);
  timerElement.innerHTML = "";
}

// Add this new function after monthData
function loadMonthImage(monthYear) {
  const dialogImage = document.getElementById('dialog-image');
  const dialogMessage = document.getElementById('dialog-message');
  
  // Show loading state
  dialogImage.src = '/api/placeholder/800/600';
  dialogMessage.textContent = 'Loading...';
  
  const monthInfo = monthData[monthYear];
  if (monthInfo) {
    // Create a new image object to test loading
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function() {
      dialogImage.src = monthInfo.imageUrl;
      dialogMessage.textContent = monthInfo.caption;
    };
    
    img.onerror = function() {
      dialogImage.src = '/api/placeholder/800/600';
      dialogMessage.textContent = 'Failed to load image. Please try again later.';
      console.error('Failed to load image for ' + monthYear);
    };
    
    img.src = monthInfo.imageUrl;
  } else {
    dialogMessage.textContent = 'No content available for this month yet.';
  }
}

// Find and replace your existing generateMonthCards function with this:
function generateMonthCards() {
  const months = [];
  let currentDate = new Date(2023, 10); // November 2023
  const endDate = new Date(2024, 10); // November 2024

  while (currentDate <= endDate) {
    months.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  monthCardsContainer.innerHTML = months.map(date => `
    <div class="month-card" data-month="${date.toISOString()}">
      <h3>${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
      <div class="card-preview"></div>
    </div>
  `).join('');

  // Add click listeners to cards
  document.querySelectorAll('.month-card').forEach(card => {
    card.addEventListener('click', () => {
      const date = new Date(card.dataset.month);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      dialogTitle.textContent = monthYear;
      loadMonthImage(monthYear);
      monthDialog.showModal();
    });
  });
}

// Dialog close button
document.querySelector('.close-dialog').addEventListener('click', () => {
  monthDialog.close();
});

// Add error handling for the dialog image
document.getElementById('dialog-image').addEventListener('error', function() {
  this.src = '/api/placeholder/800/600';
});

// Authentication state change handler
onAuthStateChanged(auth, user => {
  if (user && allowedEmails.includes(user.email)) {
    displayUserInfo(user);
    startCountdown();
    generateMonthCards();
  } else if (user) {
    auth.signOut();
    alert("Access Denied: Your account is not authorized.");
  }
});
