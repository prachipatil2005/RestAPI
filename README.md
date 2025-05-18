# User Management REST API

A Node.js REST API built with Express and MongoDB for managing user data. This API provides endpoints for creating, reading, updating, and deleting user information.

## Features

- Create new users
- Fetch all users
- Update user information
- Delete users
- Email validation to prevent duplicate users
- MongoDB database integration
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible URL)
- NPM or Yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=8000
MONGO_URL="mongodb://localhost:27017/CRUD"
```

## Running the Application

To start the development server:

```bash
npm start
```

The server will run on `http://localhost:8000` by default.

## API Endpoints

### Users

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/user/create`      | Create a new user   |
| GET    | `/api/user/getAllUsers` | Fetch all users     |
| PUT    | `/api/user/update/:id`  | Update a user by ID |
| DELETE | `/api/user/delete/:id`  | Delete a user by ID |

### Request Body Format

For creating and updating users:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "address": "User Address"
}
```

## Project Structure

```
├── index.js           # Application entry point
├── controller/
│   └── userController.js  # User route controllers
├── model/
│   └── userModel.js      # User data model
├── routes/
│   └── userRoutes.js     # API routes
└── .env               # Environment variables
```

## Dependencies

- express: Web framework for Node.js
- mongoose: MongoDB object modeling tool
- dotenv: Environment variable management
- body-parser: Request body parsing middleware
- nodemon: Development dependency for auto-reloading

## Error Handling

The API includes proper error handling for:

- Duplicate email addresses
- Invalid user IDs
- Server errors
- Not found errors
