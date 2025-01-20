# Collaborative Task Management System

A **Collaborative Task Management System** built using **Node.js**, **Express**, and **MongoDB** for the backend, and **React** for the frontend. This application allows teams to efficiently manage their tasks with features like task creation, editing, grouping by status, and assignment to team members.

## Features
- **Task Management**: Create, edit, delete, and assign tasks.
- **Status Tracking**: Categorize tasks into "To Do," "In Progress," and "Completed."
- **Responsive UI**: User-friendly and fully responsive frontend built with React.
- **Real-Time Updates**: Synchronize tasks and statuses efficiently.

---

## Project Setup Instructions

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed ([Download here](https://nodejs.org)).
2. **MongoDB**: Set up a MongoDB database ([MongoDB Community Edition](https://www.mongodb.com/try/download/community) or use a cloud database like [MongoDB Atlas](https://www.mongodb.com/atlas)).
3. **Git**: Ensure Git is installed for cloning the repository.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/SachinBunnY/Task-management-system.git
   cd Task-management-system/Task-management-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. Start the backend server:
   ```bash
   nodemon server.js
   ```
   The backend server will run on `http://localhost:5000` by default.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../Task-management-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000` by default.

---

## Usage
1. Open the frontend in your browser at `http://localhost:3000`.
2. Create a project or task and assign team members to tasks.
3. Track progress by moving tasks across different statuses.

---

## Folder Structure
```
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   └── App.js
└── README.md
```

---

## Contributions
Contributions are welcome! Feel free to fork the repository and create pull requests.

---

## License
This project is licensed under the [MIT License](LICENSE).

