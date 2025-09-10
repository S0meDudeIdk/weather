<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Danoative/RealtimeWeatherForecastWebsite">
    <img src="/General/assets/css/imgGenUi/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Realtime Weather Forecast Website</h3>

  <p align="center">
    This is Group 2's project for Software Engineering course.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#starting-the-website">Starting the Website</a></li>
        <li><a href="#using-the-website">Using the Website</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Group Member</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The weather forecast system is a web-based application, designed to provide users with real-time information about the weather. With a third-party weather API, the web-based application can fetch various weather data (Temperature, Humidity, Wind speed, Weather conditions, etc) and display it to users. The application provides a user-friendly interface, allowing users to easily access current weather updates, forecasts and other additional information.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started



### Prerequisites

- **Node.js** and **npm** installed on your machine.
  ```sh
  # Verify installations
  node -v
  npm -v
  ```
- **Server Hub**
  - To install the necessary module for the Server Hub, navigate to the directory and run:
  ```
  cd "<YOUR_PATH>\RealtimeWeatherForecastWebsite\Server Hub"
  npm install
  ```

- **Dashboard Server**
  - To install the necessary modules for the Dashboard server, navigate to the directory and run:
  ```
  cd "<YOUR_PATH>\RealtimeWeatherForecastWebsite\Dashboard\server"
  npm install
  ```

- **Dashboard Client**
  - To install the necessary modules for the Dashboard client, navigate to the directory and run:
  ```
  cd "<YOUR_PATH>\RealtimeWeatherForecastWebsite\Dashboard"
  npm install
  ```

- **General Server**
  - To install the necessary modules for the General server, navigate to the directory and run:
  ```
  cd "<YOUR_PATH>\RealtimeWeatherForecastWebsite\General\server"
  npm install
  ```

- **Login Server**
  - To install the necessary modules for the Login server, navigate to the directory and run:
  ```
  cd "<YOUR_PATH>\RealtimeWeatherForecastWebsite\Login\server"
  npm install
  ```

- **MongoDB** installed and running.
    - Ensure **MongoDB** is running on `localhost:27017` (default).
    - Download **MongoDB** from [here](https://www.mongodb.com/try/download/community).
    - Download **MongoDB Compass** from [here](https://www.mongodb.com/try/download/compass)

## Security Note

🔒 **Important Security Information**

This project uses environment variables to store sensitive credentials like database connection strings and API keys. 

- **Never commit `.env` files** or any files containing sensitive credentials to version control
- Use strong, unique passwords and JWT secrets
- Regularly rotate your API keys and database credentials
- The `.gitignore` file is configured to exclude sensitive files from being committed

### Configuration

1. **Get a free API Key**
- Sign up at [OpenWeatherMap](https://openweathermap.org/) to obtain a free API Key.
2. **Clone the repo**
   ```sh
   git clone https://github.com/Danoative/RealtimeWeatherForecastWebsite.git
   ```

3. **Set up Environment Variables**
- Copy the `.env.example` files to `.env` in each server directory:
  ```sh
  # In Login/server/
  copy .env.example .env
  
  # In General/server/
  copy .env.example .env
  
  # In Dashboard/server/
  copy .env.example .env
  ```
- Edit each `.env` file and replace the placeholder values with your actual:
  - MongoDB connection strings
  - JWT secret key
  - Other configuration values
- **Important**: Never commit `.env` files to version control!

4. **Enter your API key**
- Navigate to the `/API/apikey.txt` directory.
- Create a file named `apikey.txt` (If `apikey.txt` does not exist in API folder).
- Paste your API Key into `apikey.txt`.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Starting the Website

1. **Set up Environment Variables**
- Copy `.env.example` files to `.env` in each server directory:
  - `Login/server/.env`
  - `General/server/.env`
  - `Dashboard/server/.env`
- Fill in your actual MongoDB connection strings and secrets in each `.env` file
- **Never commit these `.env` files to version control!**

2. **Start MongoDB Server** (Optional if using cloud database)
- Open **MongoDB Compass**
- Connect using your actual MongoDB connection string (stored in your `.env` files)

3. **Host the Servers Using Server Hub**
- Open a terminal window.
- Navigate to the `Server Hub` directory.
- Run `server-hub.js` with this command: ```node server-hub.js```
- **Server Hub Commands:**
    - Display Available Servers and Commands: `help`
    - Start a Server: `start <number>`
        - Replace `<number>` with the server number as listed.
    - Stop a Server: `stop <number>`
    - Restart a Server: `restart <number>`
    - Exit Server Hub: `exit`

3. **Host `homepage.html` Using Go Live Extension**
- Open Visual Studio Code.
- Open the `General` directory in VS Code.
- Open `homepage.html`.
- Click on the **Go Live** button at the bottom of VS Code.
    - If you don't see the **Go Live** button:
        - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the command palette.
        - Type `Open with Live Server` and select it.
        - The default browser should open `homepage.html`.


### Using the Website
#### For Users
1. **Login**
  - Click on the **Login** button.
  - Click on the **Sign Up** line to register a new account.
  - Once you have registered, log in using your credentials.

2. **Using The Weather Forecast**
  - Once logged in, you can already access the weather data in your current location.
  - If you want to check the weather in other locations, click on the Search bar and type the city.

#### For Admin
1. **Sign Up**
  - Go to `/Login/server/createAdmin.js`.
  - run `node createAdmin.js` to create an admin account.

2. **Login to Dashboard**
  - You can login using the admin credentials via the **Login** button in `homepage.html`.

3. **Using Dashboard**
  - You can change or delete the weather data in the dashboard.
  - You can also delete user data in the dashboard.

<p align="right">(<a href="#readme-top">back to top</a>)</p>





### Top contributors:

<a href="https://github.com/Danoative/RealtimeWeatherForecastWebsite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Danoative/RealtimeWeatherForecastWebsite" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the GPL-3.0. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Group Member

- Võ Hồng Anh             - ITCSIU22309 - ITCSIU22309@student.hcmiu.edu.vn
- Nguyễn Công Sơn         - ITCSIU22300 - ITCSIU22300@student.hcmiu.edu.vn
- Phạm Vũ Hoàng Bảo       - ITCSIU22250 - ITCSIU22250@student.hcmiu.edu.vn
- Thiên Thế Long          - ITCSIU22302 - ITCSIU22302@student.hcmiu.edu.vn
- Trầm Minh Khang         - ITCSIU22307 - ITCSIU22307@student.hcmiu.edu.vn
- Đào Nguyên Công Danh    - ITITWE22111 - ITITWE22111@student.hcmiu.edu.vn
- Đàm Gia Hào             - ITITIU22049 - ITITIU22049@student.hcmiu.edu.vn
- Đoàn Đức Tiến           - ITITIU21330 - ITITIU21330@student.hcmiu.edu.vn
- Nguyễn Gia Huy          - ITITIU21214 - ITITIU21214@student.hcmiu.edu.vn

Project Link: [https://github.com/Danoative/RealtimeWeatherForecastWebsite](https://github.com/Danoative/RealtimeWeatherForecastWebsite)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [React](https://react.dev/)
* [OpenWeatherMap API](https://openweathermap.org/api)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Axios](https://axios-http.com/)
* [Font Awesome](https://fontawesome.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Danoative/RealtimeWeatherForecastWebsite.svg?style=for-the-badge
[contributors-url]: https://github.com/Danoative/RealtimeWeatherForecastWebsite/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Danoative/RealtimeWeatherForecastWebsite.svg?style=for-the-badge
[forks-url]: https://github.com/Danoative/RealtimeWeatherForecastWebsite/network/members
[stars-shield]: https://img.shields.io/github/stars/Danoative/RealtimeWeatherForecastWebsite.svg?style=for-the-badge
[stars-url]: https://github.com/Danoative/RealtimeWeatherForecastWebsite/stargazers
[issues-shield]: https://img.shields.io/github/issues/Danoative/RealtimeWeatherForecastWebsite.svg?style=for-the-badge
[issues-url]: https://github.com/Danoative/RealtimeWeatherForecastWebsite/issues
[license-shield]: https://img.shields.io/github/license/Danoative/RealtimeWeatherForecastWebsite.svg?style=for-the-badge
[license-url]: https://github.com/Danoative/RealtimeWeatherForecastWebsite/blob/master/LICENSE
[product-screenshot]: General/assets/Demo_Image/demo.png
