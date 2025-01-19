# School Management System

This is a school management web application that allows the admin to manage schools, students, and perform CRUD operations. It features role-based authentication where the admin can add new schools, manage students, and operate various administrative functions.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Axios, React-Toastify, React-Confirm-Alert, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT-based (Role-based: Admin/User)

## Features

- **Role-Based Authentication**: Admin and user roles with separate access controls.
- **Admin Panel**: Admin can add, edit, and delete schools and students.
- **Student Management**: Students are displayed by their respective schools with CRUD functionality.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI.
- **Notifications**: Toast notifications for actions such as success, error, and warning.
- **Confirmation Alerts**: React-Confirm-Alert to confirm sensitive actions like deletions.

## Screenshots

Below are some screenshots of the application:

![Screenshot 2025-01-18 190845](https://github.com/user-attachments/assets/569de343-2ada-457c-b1cd-54c517dfdb97)
*Admin dashboard with school and student management*

![Screenshot 2025-01-18 190901](https://github.com/user-attachments/assets/e13fc2de-2345-41ba-bd4a-58742347a651)
*Admin adding a new school*

![Screenshot 2025-01-18 190901](https://github.com/user-attachments/assets/b90456c2-63b9-4c0a-a05b-290fa0e8b1a5)
*List of students displayed by school*

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB database set up locally or on a cloud service (like MongoDB Atlas).

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone <https://github.com/Niraj11Parihar/SolvifyPractical>

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

### Backend Setup

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:
    ```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication

- **POST** `/api/auth/login`: Login with credentials.
- **POST** `/api/auth/register`: Register a new user (admin or user).

### Schools

- **GET** `/api/schools`: Get all schools.
- **POST** `/api/schools`: Add a new school (Admin only).
- **PUT** `/api/schools/:id`: Edit a school (Admin only).
- **DELETE** `/api/schools/:id`: Delete a school (Admin only).

### Students

- **GET** `/api/students`: Get all students.
- **POST** `/api/students`: Add a new student (Admin only).
- **PUT** `/api/students/:id`: Edit student details (Admin only).
- **DELETE** `/api/students/:id`: Delete a student (Admin only).

## Frontend Libraries Used

- **Axios**: For making API requests.
- **React-Toastify**: For notifications and alerts.
- **React-Confirm-Alert**: For confirmation dialogs.
- **Lucide Icons**: For icons throughout the application.

## License

This project is open-source and available under the MIT License.
