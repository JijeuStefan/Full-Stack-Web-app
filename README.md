# University Management System

## 📋 Description

The **University Management System** is a full-stack web application designed to manage university data such as professors, students, and courses.

The system allows an admin to authenticate, manage professors and students, and view relationships between them (which students are assigned to which professor's course).

The backend is deployed on Render and connected to a cloud MySQL database hosted on Clever Cloud, allowing full remote access without local dependencies.

This project follows a distributed client-server architecture with secure authentication, database integration, and RESTful API communication.

## ✨ Features

### Authentication
- Admin login system
- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes

### Professors Management
- Add new professors
- Update professor details
- Delete professors
- Add students to professors
- Filter students by professor
  
### Students Management
- View student details
- Update student information
- Delete students

### Dashboard Features
- View all professors
- View students per professor
- Dynamic UI updates
- Real-time state updates via API calls

## 🛠️ Tech Stack

- **Frontend**: React, JavaScript, Bootstrap  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL (Clever Cloud)  
- **Authentication**: JWT (JSON Web Token), bcryptjs  
- **HTTP Requests**: Axios  
- **Validation**: express-validator  
- **Deployment**: Render (Backend), Clever Cloud (Database)  

## 🏗️ Architecture

Client-Server architecture:

```text
React Frontend
↓ (Axios + JWT)
Express Backend (Render)
↓
MySQL Database (Clever Cloud)
```

## 🚀 Quick Start

### Prerequisites

List what needs to be installed beforehand:
- **Node.js** 16.x or higher
- **npm** or **yarn**    
- **MySQL** (local installation or cloud database like Clever Cloud)  

### Installation

```bash
### Clone the repository
git clone https://github.com/JijeuStefan/Full-Stack-Web-app.git
cd Full-Stack-Web-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Usage
```text
### Create a .env file inside the backend folder:

DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Start the project
cd frontend
npm start
```
Open the app in your browser: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```text
Full-Stack-Web-app/
├── backend/                  # Backend folder (Node.js + Express)
│   ├── Service/              # API services (Auth, Students, Professors)
│   ├── DB/                   # Database connection setup
│   ├── server.js             # Server entry point
│   └── package.json          # Backend dependencies
│
├── frontend/                 # Frontend folder (React)
│   ├── src/                  # Main source code
│   │   ├── Home.jsx          # Home page
│   │   ├── components/       # Reusable UI components
│   │   ├── App.jsx           # Root component
│   │   └── index.jsx         # Entry point
│   └── package.json          # Frontend dependencies
│
└── README.md                 # This file
```

## 📚 Documentation

### Frontend
- [React Documentation](https://react.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/)

### Backend
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)

### Database
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Authentication & Security
- [JWT (JSON Web Tokens) Documentation](https://jwt.io/introduction)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

### HTTP Requests
- [Axios Documentation](https://axios-http.com/)

### Validation
- [express-validator Documentation](https://express-validator.github.io/docs/)

## 📝 Usage

This project is a full-stack University Management System developed for educational purposes.

It demonstrates a client-server architecture with authentication, role-based access (admin), and database integration using MySQL.

This project is intended for learning purposes and is not deployed for production use.

## 👤 Author

**JijeuStefan**
- GitHub: [@JijeuStefan](https://github.com/JijeuStefan)
