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
// function displayWeatherData(weatherData) {
//   const tableContainer = document.querySelector('.userDetailsTable .table-container'); // Adjust the selector as needed
//   tableContainer.innerHTML = ''; // Clear existing data

//   // Create a table element
//   const table = document.createElement('table');
//   table.classList.add('weather-table');

//   // Create table header
//   const headerRow = document.createElement('tr');
//   headerRow.innerHTML = `
//       <th>City</th>
//       <th>Country</th>
//       <th>Temperature (°C)</th>
//       <th>Description</th>
//       <th>Icon</th>
//   `;
//   table.appendChild(headerRow);

//   // Populate the table with data
//   weatherData.forEach(data => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//           <td>${data.city}</td>
//           <td>${data.country}</td>
//           <td>${data.temperature}</td>
//           <td>${data.description}</td>
//           <td><img src="http://api.openweathermap.org/img/w/${data.icon}.png" alt="${data.description}" /></td>
//       `;
//       table.appendChild(row);
//   });

//   // Append the table to the container
//   tableContainer.appendChild(table);
// }

function displayWeatherData(weatherData) {
  const tableContainer = document.querySelector('.userDetailsTable .table-container');
  tableContainer.innerHTML = '';

  const table = document.createElement('table');
  table.classList.add('weather-table');

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th>City</th>
      <th>Country</th>
      <th>Temperature (°C)</th>
      <th>Description</th>
      <th>Icon</th>
      <th>Actions</th>
  `;
  table.appendChild(headerRow);

  weatherData.forEach(data => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.city}</td>
        <td>${data.country}</td>
        <td>${data.temperature}</td>
        <td>${data.description}</td>
        <td><img src="http://api.openweathermap.org/img/w/${data.icon}.png" alt="${data.description}" /></td>
        <td>
            <button class="action-btn edit-btn">Edit</button>
            <button class="action-btn delete-btn">Delete</button>
        </td>
    `;
    table.appendChild(row);

    // Add event listeners for Edit and Delete buttons
    const editButton = row.querySelector('.edit-btn');
    const deleteButton = row.querySelector('.delete-btn');

    // Pass 'data' to handlers
    editButton.addEventListener('click', () => handleEdit(row, data));
    deleteButton.addEventListener('click', () => handleDelete(data._id));
  });

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

// function displayUserData(userData) {
//   const tableContainer = document.querySelector('.activityTable .table-container'); // Adjust the selector as needed
//   tableContainer.innerHTML = ''; // Clear existing data

//   // Create a table element
//   const table = document.createElement('table');
//   table.classList.add('user-table');

//   // Create table header
//   const headerRow = document.createElement('tr');
//   headerRow.innerHTML = `
//       <th>Username</th>
//       <th>Password</th>
//   `;
//   table.appendChild(headerRow);

//   // Populate the table with data
//   userData.forEach(data => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//           <td>${data.username}</td>
//           <td>${data.password}</td>
//       `;
//       table.appendChild(row);
//   });

//   // Append the table to the container
//   tableContainer.appendChild(table);
// }



// Fetch total searches and total users data

function displayUserData(userData) {
  const tableContainer = document.querySelector('.activityTable .table-container');
  tableContainer.innerHTML = '';

  const table = document.createElement('table');
  table.classList.add('user-table');

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th>Username</th>
      <th>Password</th>
      <th>Actions</th>
  `;
  table.appendChild(headerRow);

  userData.forEach(data => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.username}</td>
        <td>${data.password}</td>
        <td>
            <button class="action-btn delete-btn">Delete</button>
        </td>
    `;
    table.appendChild(row);

    // Add event listener for Delete button
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      const confirmation = confirm('Are you sure you want to delete this user?');
      if (confirmation) {
        deleteUserData(data._id)
          .then(() => {
            fetchUserData(); // Refresh the user data after deletion
          })
          .catch(error => {
            console.error('Error deleting user data:', error);
          });
      }
    });
  });

  tableContainer.appendChild(table);
}

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

function handleEdit(row, data) {
  // Replace the table cells with input fields
  row.innerHTML = `
    <td><input type="text" value="${data.city}" class="edit-input city-input" /></td>
    <td><input type="text" value="${data.country}" class="edit-input country-input" /></td>
    <td><input type="number" value="${data.temperature}" class="edit-input temperature-input" /></td>
    <td><input type="text" value="${data.description}" class="edit-input description-input" /></td>
    <td>
      <img src="http://api.openweathermap.org/img/w/${data.icon}.png" alt="${data.description}" />
    </td>
    <td>
      <button class="action-btn apply-btn">Apply</button>
      <button class="action-btn delete-btn">Delete</button>
    </td>
  `;

  // Add event listeners for Apply and Delete buttons
  const applyButton = row.querySelector('.apply-btn');
  const deleteButton = row.querySelector('.delete-btn');

  applyButton.addEventListener('click', () => handleApply(row, data));
  deleteButton.addEventListener('click', () => handleDelete(data._id));
}

function handleApply(row, originalData) {
  // Collect the new data from input fields
  const updatedData = {
    _id: originalData._id, // Include the '_id' field
    city: row.querySelector('.city-input').value,
    country: row.querySelector('.country-input').value,
    temperature: parseFloat(row.querySelector('.temperature-input').value),
    description: row.querySelector('.description-input').value,
    icon: originalData.icon
  };

  // Show confirmation popup
  const confirmation = confirm('Are you sure you want to apply these changes?');

  if (confirmation) {
    // Send update request to the server
    updateWeatherData(updatedData)
      .then(() => {
        // Refresh the data display
        fetchWeatherData();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  } else {
    // Revert the row to its original state
    fetchWeatherData();
  }
}

// Dashboard\public\index.js

async function updateWeatherData(data) {
  try {
    const response = await fetch(`http://localhost:5050/api/weather/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

function handleDelete(id) {
  const confirmation = confirm('Are you sure you want to delete this entry?');

  if (confirmation) {
    deleteWeatherData(id)
      .then(() => {
        fetchWeatherData();

        // Update the total searches and users count
        fetchTotalSearchesAndUsers();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }
}

async function deleteWeatherData(id) {
  try {
    const response = await fetch(`http://localhost:5050/api/weather/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete data');
    }

    console.log('Data deleted successfully');
  } catch (error) {
    throw error;
  }
}

async function deleteUserData(id) {
  try {
    const response = await fetch(`http://localhost:5050/api/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user data');
    }

    console.log('User data deleted successfully');
  } catch (error) {
    console.error('Error deleting user data:', error);
  }
}
