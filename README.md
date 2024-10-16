# 🎬 Netflix Clone App

A full-stack Netflix clone built with MERN STACK, features including authentication, responsive design, and secure API integration. This project mimics some key features of Netflix, allowing users to create accounts, log in, and view movie details.

✨ Backend Repository of Netflix clone app -> https://github.com/Prateekrajput1999/Netflix-server

## ✨ Features

- **Frontend:** Built with React.js and styled with Tailwind CSS for a modern, responsive UI.
- **Authentication:** Secure signup and login using JWT-based authentication.
- **Protected Routes:** Movie details are accessible only to authenticated users.
- **Hosting:** The frontend is hosted on AWS Amplify with continuous deployment.

## 🚀 Live Demo

The app is live and hosted on [AWS AMPLIFY](https://master.d3mswxqa7vdfhx.amplifyapp.com/).

## 🖥️ Tech Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **AWS Amplify**: Cloud service for hosting with CI/CD.

### Backend
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and movie data.
- **Vercel**: Hosting service for serverless deployment.

## 📜 API Documentation

### Authentication
1. **Signup**: Allows users to create an account using their name, email, and password. Passwords are hashed with `bcrypt` before being stored in MongoDB.
2. **Login**: Authenticates users and returns a JWT for accessing protected routes. JWT is generated using `jsonwebtoken`'s sign method with a secret key.

### Movie Routes
- **Protected**: All movie-related routes require a valid JWT token for access.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Prateekrajput1999/Netflix-frontend.git
