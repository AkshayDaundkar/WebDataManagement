# Fitness X Tracker

Fitness X Tracker is a full-stack web application designed to help users track their fitness journey. It provides features such as exercise tracking, nutrition insights, AI-powered chatbot assistance, and personalized dashboards. The project is built using **React.js** for the frontend and **Node.js** with **Express** for the backend, along with **MongoDB** as the database.

---

## Features

### Frontend

- **User Authentication**: Login and registration with form validation.
- **Dashboard**: Displays fitness progress, calorie tracking, and AI-powered insights.
- **Exercise Tracking**: Search for exercises by muscle group with detailed instructions.
- **Nutrition Insights**: Fetch nutritional information for food items.
- **AI Chatbot**: Get fitness and nutrition advice using GPT-4.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Backend

- **RESTful API**: Provides endpoints for user management, exercise data, nutrition data, and more.
- **MongoDB Integration**: Stores user data, food intake, burned calories, and other fitness-related information.
- **AI Integration**: Uses OpenAI's GPT-4 API for chatbot functionality.
- **Secure Authentication**: Passwords are hashed using bcrypt, and JWT is used for session management.

---

## Project Structure

### Frontend

```
frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components (Navbar, Footer, etc.)
│   ├── pages/            # Individual pages (Dashboard, Login, etc.)
│   ├── routes/           # Routing configurations
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point of the React application
│   └── App.css           # Global styles
├── package.json          # Frontend dependencies and scripts
└── README.md             # Frontend documentation
```

### Backend

```
backend/
├── models/               # Mongoose models (User, Meal, etc.)
├── routes/               # API routes (auth, users, exercises, etc.)
├── server.js             # Main server file
├── .env                  # Environment variables
├── package.json          # Backend dependencies and scripts
└── README.md             # Backend documentation
```

---

## Installation and Setup

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud instance)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/Fitness-X-Tracker.git
   cd Fitness-X-Tracker
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.

### User Management

- `GET /api/users/:userId`: Fetch user profile.
- `PUT /api/users/:userId`: Update user profile.

### Fitness Tracking

- `GET /api/exercises/:muscle`: Fetch exercises by muscle group.
- `GET /api/nutrition/:foodItem`: Fetch nutrition data for a food item.
- `POST /api/burned-calories`: Log burned calories.
- `POST /api/food-intake`: Log food intake.

### AI Chatbot

- `POST /api/ai/chat`: Get AI-powered fitness and nutrition advice.

---

## Technologies Used

### Frontend

- **React.js**: Component-based UI library.
- **React Router**: For routing and navigation.
- **Recharts**: For data visualization.
- **React Toastify**: For notifications.

### Backend

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **bcrypt.js**: For password hashing.
- **jsonwebtoken**: For authentication.

### AI Integration

- **OpenAI GPT-4**: For chatbot functionality.

---

## Contributors

- **Akshay Daundkar** - 1002149721
- **Arun Sabarish Krishnaswamy Ganesan** - 1002234442
- **Pallavi Chowdary Gogineni** - 102221774
- **Kevin Gomez** - 1000873983
- **Sanket Rajendrakumar More** - 1001952737

---

## License

This project is licensed under the MIT License.
