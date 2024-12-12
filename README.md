# CapivarasDEX: A Comprehensive Capybara Management Application

**Overview**

CapivarasDEX is a full-stack application designed to manage and display information about capybaras. Built with Vue.js for the frontend and Node.js/Express for the backend, it provides a user-friendly interface for creating, reading, updating, and deleting capybara data.

**Key Features**

* **Intuitive User Interface:** A clean and modern design built with Vue.js.
* **Robust Backend:** A Node.js/Express server handles data persistence using SQLite.
* **Data Management:** Create, read, update, and delete capybara records.
* **Cloud Deployment:** Hosted on Render for easy access.
* **Docker Support:** Easily deploy using Docker Compose.

**Getting Started**

**Prerequisites:**

* Node.js (version 18)
* npm (Node.js package manager)

**Installation:**

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/pedrofbr0/CapivarasDEX.git](https://github.com/pedrofbr0/CapivarasDEX.git)
   ```
2. **Install dependencies:**
   ```bash
   cd capivarasBack
   npm install
   cd ../capivarasfront
   npm install
   ```

**Running the application:**

1. **Start the backend:**
   ```bash
   cd capivarasBack
   npm start
   ```


2. **Start the frontend:**
   ```bash
   cd capivarasfront
   npm run serve
   ```

**Alternatively:**

If you have Docker installed:
   ```bash
   docker-compose up --build
   ```
   
Access the application: Open http://localhost:8080 in your web browser.

The application is deployed on Render. Visit https://capivaras-frontend.onrender.com.
