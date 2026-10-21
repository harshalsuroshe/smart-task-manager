# TaskFlow - Smart Task Manager 🚀

TaskFlow is a modern, full-stack task management application designed to help individuals and teams organize their work beautifully. It features a responsive React frontend, a robust Spring Boot backend, and secure JWT-based authentication.

## ✨ Features

* **Unified Authentication Gateway:** A sleek, responsive UI for user Login and Sign-Up.
* **Secure Authentication:** JWT-based session management with secure BCrypt password hashing.
* **Task Management:** Create, read, update, and delete tasks with ease.
* **Dynamic Dashboard:** Real-time statistics tracking total, pending, in-progress, and completed tasks.
* **Smart Filtering:** Instantly filter tasks by search term, status, or priority.
* **RESTful API architecture:** Clean separation of concerns between the React client and Spring Boot server.

## 🛠️ Tech Stack

**Frontend**

* React (with Hooks)
* CSS3 / Custom UI Variables
* Axios for API requests

**Backend**

* Java 17+
* Spring Boot (Web, Security, JDBC)
* JSON Web Tokens (JWT) for Authentication
* BCrypt for Password Encoding

**Database**

* MySQL

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher)
* [Java JDK](https://www.oracle.com/java/technologies/downloads/) (v17 or higher)
* [Maven](https://maven.apache.org/)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### 1\. Database Setup

1. Open MySQL and create a new database for the project:

```sql
   CREATE DATABASE taskflow\\\_db;
   ```

2. Ensure your `users` and `tasks` tables are created (schema scripts can be found in the backend resources).

### 2\. Backend Setup

1. Navigate to the backend directory:

```bash
   cd backend
   ```

2. Configure your database credentials in `src/main/resources/application.properties`:

```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/taskflow\\\_db
   spring.datasource.username=your\\\_mysql\\\_username
   spring.datasource.password=your\\\_mysql\\\_password
   ```

3. Compile and run the Spring Boot application:

```bash
   mvn clean compile
   mvn spring-boot:run
   ```

*The backend will start on `http://localhost:8080`*

### 3\. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
   cd frontend
   ```

2. Install the required Node dependencies:

```bash
   npm install
   ```

3. Start the React development server:

```bash
   npm run dev
   ```

*The frontend will typically start on `http://localhost:5174`*

## 🛣️ API Endpoints Reference

**Authentication (`/api/auth`)**

* `POST /login` - Authenticates a user and returns a JWT.
* `POST /register` - Registers a new user and hashes their password.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.



