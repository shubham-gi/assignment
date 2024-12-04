# EmployWise

Deployed Link: [EmployWise](https://employwise.netlify.app/)  
Tech Stack: **React.js**, **Tailwind CSS**, **Context API**

---

## Overview

EmployWise is a user management application designed to handle authentication, user listing, editing, and deletion functionalities. The application provides a clean and user-friendly interface with paginated user management.

---

## Features

### **Level 1: Authentication Screen**
- A basic login screen where users can log in using credentials.
- **API Endpoint for Authentication**:  
  `POST /api/login`  
  - **Request Body**:
    ```json
    {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }
    ```
  - On successful login, the application stores the returned token and redirects to the Users List page.

---

### **Level 2: User List**
- After logging in, the application displays a paginated list of users.
- **API Endpoint to Fetch Users**:  
  `GET /api/users?page=1`
- Displays:
  - First Name
  - Last Name
  - Avatar
- Implements pagination for seamless navigation between user pages.

---

### **Level 3: User Actions**
#### **Edit User**
- Each user has an option to edit their details:
  - Clicking **Edit** opens a pre-filled form with the user’s data.
  - The form allows updating the user's:
    - First Name
    - Last Name
    - Email
  - **API Endpoint for Updating User**:  
    `PUT /api/users/{id}`

#### **Delete User**
- Each user has an option to delete their profile:
  - Clicking **Delete** removes the user from the list.
  - **API Endpoint for Deleting User**:  
    `DELETE /api/users/{id}`

#### **Success and Error Handling**
- Displays appropriate success or error messages for all operations.

---

## Tech Stack

- **React.js**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Context API**: For state management.
- **Axios**: For API calls.

---

## Getting Started

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/employwise.git
   cd employwise
