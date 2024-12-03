document.querySelectorAll(".navList").forEach(function(element) {
    element.addEventListener('click', function() {
      document.querySelectorAll(".navList").forEach(function(e) {
        e.classList.remove('active');
    });

      // Add active class to the clicked navList element
      this.classList.add('active');
  
      // Get the index of the clicked navList element
      var index = Array.from(this.parentNode.children).indexOf(this);
  
      // Hide all data-table elements
      document.querySelectorAll(".data-table").forEach(function(table) {
        table.style.display = 'none';
      });
  
      // Show the corresponding table based on the clicked index
      var tables = document.querySelectorAll(".data-table");
      if (tables.length > index) {
        tables[index].style.display = 'block';
      }
    });
  });
document.getElementById('theme-selector').addEventListener('change', function() {
    if (this.value === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }
});

// Fetch weather data from the server
async function fetchWeatherData() {
  try {
      const response = await fetch('http://localhost:5050/api/weather');
      const data = await response.json();
      displayWeatherData(data);
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

// Function to display the weather data in your dashboard
function displayWeatherData(weatherData) {
  const tableContainer = document.querySelector('.userDetailsTable .table-container'); // Adjust the selector as needed
  tableContainer.innerHTML = ''; // Clear existing data

  // Create a table element
  const table = document.createElement('table');
  table.classList.add('weather-table');

  // Create table header
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th>City</th>
      <th>Country</th>
      <th>Temperature (°C)</th>
      <th>Description</th>
      <th>Icon</th>
  `;
  table.appendChild(headerRow);

  // Populate the table with data
  weatherData.forEach(data => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${data.city}</td>
          <td>${data.country}</td>
          <td>${data.temperature}</td>
          <td>${data.description}</td>
          <td><img src="http://api.openweathermap.org/img/w/${data.icon}.png" alt="${data.description}" /></td>
      `;
      table.appendChild(row);
  });

  // Append the table to the container
  tableContainer.appendChild(table);
}

async function fetchUserData() {
  try {
      const response = await fetch('http://localhost:5050/api/users');
      const data = await response.json();
      console.log('User data fetched', data);
      displayUserData(data);
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}

function displayUserData(userData) {
  const tableContainer = document.querySelector('.activityTable .table-container'); // Adjust the selector as needed
  tableContainer.innerHTML = ''; // Clear existing data

  // Create a table element
  const table = document.createElement('table');
  table.classList.add('user-table');

  // Create table header
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th>Username</th>
      <th>Password</th>
  `;
  table.appendChild(headerRow);

  // Populate the table with data
  userData.forEach(data => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${data.username}</td>
          <td>${data.password}</td>
      `;
      table.appendChild(row);
  });

  // Append the table to the container
  tableContainer.appendChild(table);
}

// Fetch total searches and total users data
async function fetchTotalSearchesAndUsers() {
  try {
    const totalSearchesResponse = await fetch('http://localhost:5050/api/total-searches');
    const totalSearchesData = await totalSearchesResponse.json();

    const totalUsersResponse = await fetch('http://localhost:5050/api/total-users');
    const totalUsersData = await totalUsersResponse.json();

    // Update the HTML elements with the fetched data
    document.querySelector('.box.box1 .number').textContent = totalSearchesData.totalSearches;
    document.querySelector('.box.box2 .number').textContent = totalUsersData.totalUsers;
  } catch (error) {
    console.error('Error fetching total searches and users data:', error);
  }
}

// Call the fetchWeatherData function when the page loads
window.onload = function(){
  fetchWeatherData();
  fetchUserData();
  fetchTotalSearchesAndUsers();
}

// Existing code for theme toggle and navigation
document.querySelectorAll(".navList").forEach(function(element) {
  element.addEventListener('click', function() {
      document.querySelectorAll(".navList").forEach(function(e) {
          e.classList.remove('active');
      });

      this.classList.add('active');
      var index = Array.from(this.parentNode.children).indexOf(this);
      document.querySelectorAll(".data-table").forEach(function(table) {
          table.style.display = 'none';
      });

      var tables = document.querySelectorAll(".data-table");
      if (tables.length > index) {
          tables[index].style.display = 'block';
      }
  });
});

document.getElementById('theme-selector').addEventListener('change', function() {
  if (this.value === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
  } else {
      document.body.removeAttribute('data-theme');
  }
});