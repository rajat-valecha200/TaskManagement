# Task Management Application

This is a full-stack Task Management application where users can manage tasks, view project details, and update their profiles. The application is divided into two parts:
- **Frontend**: Built with React and Vite (runs on port 5173)
- **Backend**: Built with Node.js (runs on port 5000)

## Features
- User authentication and logout
- Dashboard view with project details
- Profile management
- Navigation bar for seamless user experience

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Authentication**: JWT (JSON Web Token) for session management

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- A code editor (e.g., Visual Studio Code)
- A browser to view the application

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rajat-valecha200/TaskManagement
   cd TaskManagement
   ```

2. Navigate to the `task-management-backend` folder and install dependencies:
   ```bash
   cd task-management-backend
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   This will start the backend server on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `task-management-frontend` folder:
   ```bash
   cd task-management-frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```
   This will start the frontend server on `http://localhost:5173`.

## File Structure

The folder structure of the project looks like this:

```
/TaskManagement
  /task-management-backend
  /task-management-frontend
  README.md
```

## Components Overview

- **Frontend**:
  - React components for the user interface.
  - Tailwind CSS for styling.
  - React Router for page navigation.

- **Backend**:
  - Node.js and Express for server-side logic.
  - JWT authentication for managing user sessions.

## Authentication

The app uses **localStorage** to store the authentication token after the user logs in. The token is used to manage the session. Upon logging out, the token is removed, and the user is redirected to the login page.

## Routing

React Router is used for navigating between pages:
- `/` - Login page
- `/dashboard` - Dashboard page
- `/projects` - Projects page

## Contributing

1. Fork the repository
2. Clone your fork to your local machine
3. Create a new branch (`git checkout -b feature-name`)
4. Make your changes and commit them
5. Push to your fork (`git push origin feature-name`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions, feel free to reach out:

- **Name**: Rajat Valecha
- **Email**: [rajat.valecha200@gmail.com](mailto:rajat.valecha200@gmail.com)
