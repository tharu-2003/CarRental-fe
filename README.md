<div align="center">

# 🚗 Car Rental System

### Your Premier Car Rental Management Solution

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://github.com/tharu-2003/CarRental-fe)
[![Backend](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://github.com/tharu-2003/CarRental-be)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

A modern, full-stack car rental management system built with TypeScript, React, and Node.js. This platform streamlines the vehicle rental process with an intuitive interface for customers to browse and book cars, while providing owners with powerful tools to manage their fleet and bookings efficiently.

## ✨ Features

### 👥 User Features
- **User Registration & Authentication** - Secure signup and login with JWT tokens
- **Browse Available Cars** - Explore vehicles with detailed specifications
- **Real-time Booking System** - Instant reservation with availability checking
- **User Dashboard** - Manage profile and view booking history
- **Password Recovery** - Forget password and reset functionality
- **Secure Sessions** - Refresh token mechanism for extended sessions

### 🏢 Owner Features
- **Vehicle Management** - Add, edit, and remove vehicles from inventory
- **Booking Management** - Overview and management of all reservations
- **Dashboard Analytics** - Track performance and rental statistics
- **Image Upload** - Cloudinary integration for vehicle photos

### 🔒 Security Features
- JWT-based authentication
- Password encryption
- Protected routes with middleware
- Token refresh mechanism
- Secure password reset flow

## 🎬 Demo

### Live Demo
🌐 **[View Live Demo](https://car-rental-fe-steel.vercel.app/)** - Experience the application in action!

### 📸 Screenshots

#### Authentication Flow

<div align="center">

| Login Page | Registration Page |
|------------|-------------------|
| ![Login](./screenshots/loging.png) | ![Register](./screenshots/registration-page.png) |

| Forgot Password | Reset Password Email |
|-----------------|----------------------|
| ![Forgot Password](./screenshots/forgot-password.png) | ![Email Form](./screenshots/reset-password-email.png) |

| Change Password Form |
|---------------------|
| ![Change Password](./screenshots/change-password-form.png) |

</div>

#### User Experience

<div align="center">

| Home Page with Search | All Cars Catalog |
|----------------------|------------------|
| ![Homepage](./screenshots/homepage.png) | ![All Cars](./screenshots/all-cars.png) |

| User Bookings |
|---------------|
| ![Bookings](./screenshots/all-bookings.png) |

</div>

#### Owner Dashboard

<div align="center">

| Owner Dashboard | Add New Car |
|----------------|-------------|
| ![Dashboard](./screenshots/owner-dashboard.png) | ![Add Car](./screenshots/add-car.png) |

| Manage Cars | Manage Bookings |
|-------------|-----------------|
| ![Manage Cars](./screenshots/manage-cars.png) | ![Manage Bookings](./screenshots/manage-bookings.png) |

</div>

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js with TypeScript
- **State Management:** Redux / Context API
- **Styling:** CSS3 / Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router

### Backend
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **Environment:** dotenv

### Key Dependencies
```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "cloudinary": "^1.x"
}
```

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Git**
- **Cloudinary Account** (for image uploads)

### Clone the Repositories

```bash
# Clone frontend
git clone https://github.com/tharu-2003/CarRental-fe.git

# Clone backend
git clone https://github.com/tharu-2003/CarRental-be.git
```

### Backend Setup

```bash
# Navigate to backend directory
cd CarRental-be

# Install dependencies
npm install

# Create environment file
touch .env
```

### Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/carrental
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carrental

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Start the Backend

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd CarRental-fe

# Install dependencies
npm install

# Create environment file
touch .env
```

Add to `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

```bash
# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🗄️ Database Setup

### MongoDB Connection

The application automatically connects to MongoDB using the URI specified in your `.env` file.

#### Local MongoDB
```bash
# Start MongoDB service
mongod

# Or with custom data directory
mongod --dbpath /path/to/data
```

#### MongoDB Atlas (Cloud)
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Add it to `MONGODB_URI` in `.env`

## 🌳 Project Structure

### Backend Structure
```
CarRental-be/
├── config/
│   ├── cloudinary.ts          # Cloudinary configuration
│   └── mongoDbConfig.ts       # MongoDB connection
├── controller/
│   ├── userController.ts      # User logic
│   ├── ownerController.ts     # Owner logic
│   └── bookingController.ts   # Booking logic
├── middleware/
│   └── auth.ts                # Authentication middleware
├── models/
│   ├── User.ts                # User model
│   ├── Car.ts                 # Car model
│   └── Booking.ts             # Booking model
├── routes/
│   ├── userRoutes.ts          # User routes
│   ├── ownerRoutes.ts         # Owner routes
│   └── bookingRoutes.ts       # Booking routes
├── .env                       # Environment variables
├── server.ts                  # Entry point
├── tsconfig.json              # TypeScript config
└── package.json
```

### Frontend Structure
```
CarRental-fe/
├── public/
├── src/
│   ├── components/            # Reusable components
│   ├── pages/                 # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Cars.tsx
│   │   └── Dashboard.tsx
│   ├── services/              # API services
│   │   └── api.ts
│   ├── context/               # Context API
│   ├── utils/                 # Utility functions
│   ├── assets/                # Images, fonts
│   └── App.tsx                # Main app
└── package.json
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### User Authentication
```http
POST   /user/register
POST   /user/login
POST   /user/refresh
POST   /user/forget-password
PUT    /user/reset-password
```

#### Register User
```http
POST /api/v1/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```

#### Login User
```http
POST /api/v1/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": { ... }
}
```

#### Forget Password
```http
POST /api/v1/user/forget-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
PUT /api/v1/user/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "newSecurePassword123"
}
```

### Protected Endpoints (Require Authentication)

#### Get User Data
```http
GET /api/v1/user/data
Authorization: Bearer <jwt_token>
```

#### Get Available Cars
```http
GET /api/v1/user/cars
```

### Owner Endpoints
```http
POST   /owner/*                # Owner-specific routes
GET    /owner/*                # (Check ownerRoutes.ts)
PUT    /owner/*
DELETE /owner/*
```

### Booking Endpoints
```http
GET    /bookings              # Get all bookings
POST   /bookings              # Create booking
GET    /bookings/:id          # Get booking by ID
PUT    /bookings/:id          # Update booking
DELETE /bookings/:id          # Cancel booking
```

## 🔐 Authentication Flow

1. **Register/Login** → Receive JWT token and refresh token
2. **Store tokens** → Save in localStorage/sessionStorage
3. **API Requests** → Include token in Authorization header
4. **Token Expiry** → Use refresh token to get new access token
5. **Logout** → Clear tokens from storage

### Using Authentication in Requests

```javascript
// Example API call with authentication
const response = await fetch('http://localhost:5000/api/v1/user/data', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});
```

## 🧪 Testing

```bash
# Run backend tests
cd CarRental-be
npm test

# Run frontend tests
cd CarRental-fe
npm test

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_api_key
heroku config:set CLOUDINARY_API_SECRET=your_api_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd CarRental-fe
vercel --prod

# Set environment variable in Vercel dashboard
# REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api/v1
```

### Alternative: Deploy to Render/Railway/DigitalOcean

All platforms support Node.js and MongoDB. Update environment variables accordingly.

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Verify connection string format
mongodb://localhost:27017/carrental
```

### CORS Errors
Ensure your backend has CORS configured:
```typescript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Cloudinary Upload Issues
- Verify API credentials in `.env`
- Check file size limits
- Ensure network connectivity

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Tharu**

- GitHub: [@tharu-2003](https://github.com/tharu-2003)
- Frontend Repo: [CarRental-fe](https://github.com/tharu-2003/CarRental-fe)
- Backend Repo: [CarRental-be](https://github.com/tharu-2003/CarRental-be)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB & Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/)
- [React Documentation](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 📞 Support

If you encounter any issues or have questions:
- 🐛 [Open an issue](https://github.com/tharu-2003/CarRental-be/issues)
- 💬 Contact via GitHub
- ⭐ Star the repo if you find it helpful!

## 🗺️ Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Mobile application
- [ ] Admin analytics dashboard
- [ ] Multi-language support
- [ ] Review and rating system

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with TypeScript, Express, MongoDB, and ❤️**

Made by [Tharu](https://github.com/tharu-2003)

</div>