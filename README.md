# AlloFood - Home Delivery Service Application

AlloFood is a full-stack home delivery service application built using MongoDB, Express, Node.js for the backend, and React for the frontend. The application includes features such as user authentication with JWT and 2FA, CRUD operations for client orders, delivery tracking, and an admin management system.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Packages Used](#packages-used)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Contribution](#contribution)

## Features

- User registration with email verification (OTP-based)
- User login with OTP for 2FA
- Password reset functionality
- JWT-based authentication
- CRUD operations for managing client orders
- Delivery tracking system for users
- Admin management dashboard for overseeing orders and clients

## Technologies Used

- **Node.js**: Backend runtime
- **Express.js**: Web framework for handling requests
- **MongoDB**: NoSQL database for storing user and order data
- **JWT**: Token-based authentication for users
- **OTP (One-Time Password)**: Used for 2FA and email verification
- **SendGrid or Nodemailer**: For sending emails
- **React**: Frontend library for building user interfaces
- **React Router**: For routing in React applications

## Packages Used

### Backend

The following npm packages are used in the backend:

- `express`: Web framework
- `mongoose`: MongoDB object modeling
- `jsonwebtoken`: For creating and verifying JWTs
- `crypto`: Built-in Node.js module for generating OTPs and tokens
- `express-session`: Session management for password reset flow
- `cookie-parser`: For handling cookies in authentication
- `bcryptjs`: For hashing passwords
- `nodemailer`: For sending emails (configured with SendGrid)
- `dotenv`: For managing environment variables
- `cors`: For enabling Cross-Origin Resource Sharing
- `jest`: Testing framework
- `nodemon`: For automatically restarting the server during development
- `supertest`: For testing HTTP endpoints

### Frontend

The following npm packages are used in the frontend:

- `react`: Library for building user interfaces
- `react-dom`: For rendering React components
- `react-router-dom`: For routing in React applications
- `flowbite-react`: For UI components
- `@testing-library/react`: For testing React components
- `@testing-library/jest-dom`: For extending Jest with DOM assertions
- `@testing-library/user-event`: For simulating user events
- `web-vitals`: For measuring performance

You can install all the required packages by running:

```bash
npm install
```

## API Endpoints

### Routes

#### Register a new user

`POST /api/auth/register`

- Registers a new user and sends an email verification link.
- **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!",
    "phoneNumber": "1234567890",
    "address": "User Address"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully! Please check your email to verify your account."
  }
  ```

#### Verify Email

`GET /api/auth/verify-email/:token`

- Verifies the user's email with the provided token.

#### Login a user

`POST /api/auth/login`

- Logs in the user, sends an OTP for two-factor authentication (2FA).
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP sent to your email",
    "userId": "USER_ID"
  }
  ```

#### Verify OTP

`POST /api/auth/verify-otp`

- Verifies the OTP and logs in the user.
- **Request Body:**
  ```json
  {
    "userId": "USER_ID",
    "otp": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP verified successfully, Login was successful",
    "token": "JWT_TOKEN"
  }
  ```

#### Forgot Password

`POST /api/auth/forgot-password`

- Sends an OTP to the user's email for password reset.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Email sent"
  }
  ```

#### Reset Password

`POST /api/auth/reset-password`

- Resets the user's password using the provided token.
- **Request Body:**
  ```json
  {
    "token": "123456",
    "password": "NewPassword123!",
    "confirmPassword": "NewPassword123!"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password updated successfully"
  }
  ```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/allofood.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:

   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   NODE_ENV=development
   EMAIL_SERVICE=your-email-service
   EMAIL_USER=your-email-username
   EMAIL_PASS=your-email-password
   ```

4. Start the server:

```bash
npm run dev
```

5. You can run tests by using the command:

```bash
npm test
```

## Running the Project

- The backend application runs on **localhost:5000** by default.
- The frontend application runs on **localhost:3000** by default.
- You can access the API routes at **http://localhost:5000/api/auth/**.
- You can use Postman or any other API client to test the endpoints.

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for signing JWT tokens.
- **EMAIL_SERVICE**: Email provider for sending verification emails (e.g., Gmail, SendGrid).
- **EMAIL_USER**: Username for the email provider.
- **EMAIL_PASS**: Password for the email provider.

## Testing

The project uses the Jest testing framework for testing. You can run the tests using the following command:

```bash
npm test
```

The test suite includes unit tests for the auth routes and controllers.

## Project Structure

```bash
AlloFood/
├── .dockerignore
├── .env
├── .gitignore
├── .vscode/
│ └── settings.json
├── allofood-backend/
│ ├── .dockerignore
│ ├── .env
│ ├── .env.example
│ ├── .gitignore
│ ├── app.js
│ ├── BACKEND-ONLY.txt
│ ├── config/
│ │ └── db.js
│ ├── constants/
│ ├── controllers/
│ ├── Dockerfile
│ ├── helpers/
│ ├── Livrable/
│ ├── middlewares/
│ │ └── upload.js
│ ├── models/
│ ├── package.json
│ ├── README.md
│ ├── routes/
│ ├── seeders/
│ ├── tests/
│ ├── uploads/
│ ├── validations/
├── allofood-frontend/
│ ├── .dockerignore
│ ├── .gitignore
│ ├── .vscode/
│ │ └── settings.json
│ ├── build/
│ ├── CHANGELOG.md
│ ├── dockerfile
│ ├── jsconfig.json
│ ├── LICENSE.md
│ ├── package.json
│ ├── public/
│ │ ├── css/
│ │ ├── images/
│ │ ├── index.html
│ │ ├── manifest.json
│ │ └── robots.txt
│ ├── README.md
│ └── src/
│ ├── App.jsx
│ ├── index.js
│ └── React-pages/
│ └── Dashboard.jsx
├── docker-compose.yml
└── README.md
```

## Docker Setup

### Backend Dockerfile

The backend Dockerfile is located at `allofood-backend/Dockerfile`:

```dockerfile
FROM node:20
WORKDIR /allofood-backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm" , "run", "dev" ]
```

### Frontend Dockerfile

The frontend Dockerfile is located at `allofood-frontend/dockerfile`:

```dockerfile
FROM node:20
WORKDIR /allofood-frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm" , "start" ]
```

### Docker Compose

The `docker-compose.yml` file is used to manage multi-container Docker applications. It is located at the root of the project:

```yaml
version: '3.8'
services:
mongo:
image: mongo:latest
container_name: mongo
environment:
MONGO_INITDB_ROOT_USERNAME: root
MONGO_INITDB_ROOT_PASSWORD: example
ports: - "27017:27017"
networks: - app-network
api:
build:
context: ./allofood-backend
dockerfile: Dockerfile
container_name: auth_api
ports: - "3001:3001"
environment: - MONGODB_URI=mongodb://root:example@mongo:27017/allo-db?authSource=admin
volumes: - ./allofood-backend:/app - /app/node_modules
depends_on: - mongo
networks: - app-network
client:
build:
context: ./allofood-frontend
dockerfile: Dockerfile
container_name: auth_client
ports: - "3000:3000"
depends_on: - api
networks: - app-network
networks:
app-network:
driver: bridge
```

To start the application using Docker Compose, run:

```bash
docker-compose up --build
```

## Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue.

---

_This README was generated for the AlloFood project, a home delivery service platform._
