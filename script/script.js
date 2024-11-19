// Predefined credentials
const VALID_USERNAME = 'Anu';
const VALID_PASSWORD = 'password123';

// Month data
const monthData = {
  "November 2023": {
    imageUrl: "/api/placeholder/800/600",
    caption: "November 2023 - The beginning of our journey"
  },
  "December 2023": {
    imageUrl: "/api/placeholder/800/600",
    caption: "December 2023 - Winter celebrations"
  },
  "January 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "January 2024 - New Year, New Beginnings"
  },
  "February 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "February 2024 - Month of Love"
  },
  "March 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "March 2024 - Spring Arrival"
  },
  "April 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "April 2024 - Spring in Full Bloom"
  },
  "May 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "May 2024 - Summer Begins"
  },
  "June 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "June 2024 - Mid-Year Reflections"
  },
  "July 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "July 2024 - Summer Adventures"
  },
  "August 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "August 2024 - Late Summer Days"
  },
  "September 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "September 2024 - Fall Approaches"
  },
  "October 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "October 2024 - Autumn Colors"
  },
  "November 2024": {
    imageUrl: "/api/placeholder/800/600",
    caption: "November 2024 - One Year Milestone"
  }
};

// DOM Elements
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const userInfo = document.getElementById('user-info');
const timerElement = document.getElementById('timer');
const monthCardsContainer = document.getElementById('month-cards-container');
const monthDialog = document.getElementById('month-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogMessage = document.getElementById('dialog-message');
const countdown = document.getElementById('countdown');

let countdownInterval;

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    loginSuccess();
  } else {
    alert('Wrong password, My Anu! Please try again 😘');
  }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
  logout();
});

function loginSuccess() {
  userInfo.style.display = 'flex';
  document.getElementById('user-name').textContent = VALID_USERNAME;
  loginForm.style.display = 'none';
  logoutButton.style.display = 'block';
  countdown.classList.remove('countdown-center');
  countdown.classList.add('countdown-top-right');
  startCountdown();
  generateMonthCards();
}


function logout() {
  userInfo.style.display = 'none';
  loginForm.style.display = 'block';
  logoutButton.style.display = 'none';
  countdown.classList.remove('countdown-top-right');
  countdown.classList.add('countdown-center');
  monthCardsContainer.innerHTML = '';
  stopCountdown();
  loginForm.reset();
}

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

function loadMonthImage(monthYear) {
  const dialogImage = document.getElementById('dialog-image');
  const dialogMessage = document.getElementById('dialog-message');
  
  const monthInfo = monthData[monthYear];
  if (monthInfo) {
    dialogImage.src = monthInfo.imageUrl;
    dialogMessage.textContent = monthInfo.caption;
  } else {
    dialogImage.src = '/api/placeholder/800/600';
    dialogMessage.textContent = 'No content available for this month yet.';
  }
}

// Dialog close button
document.querySelector('.close-dialog').addEventListener('click', () => {
  monthDialog.close();
});

// Add error handling for the dialog image
document.getElementById('dialog-image').addEventListener('error', function() {
  this.src = '/api/placeholder/800/600';
});
