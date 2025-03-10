# **WDM PROJECT - FitXpert AI Frontend**

## **Project Overview**

FitXpert AI is an AI-powered fitness tracker that helps users monitor their fitness progress, track workouts, set goals, and receive AI-based recommendations. The **frontend** is built using **React.js**, providing a seamless user experience with dynamic components.

---

## **How to Run the Application**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (Recommended: v16+)
- **npm** or **yarn** (Package manager)

### **Setup and Run**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/FitXpert-AI.git
   cd FitXpert-AI/frontend
   ```

2 Install Dependencies
npm install
-Starts the Application

This will launch the app in development mode. Open http://localhost:3000 in your browser to view the application.

3 Build for Production
npm run build
This will create an optimized production-ready build.

## Project Structure

frontend/
│── node_modules/ # Dependencies
│── public/ # Public assets
│── src/ # Source code
│ ├── assets/ # Images, fonts, and other static assets
│ ├── components/ # Reusable UI components
│ ├── pages/ # Individual page components
│ ├── routes/ # Routing configurations
│ ├── App.js # Main application component
│ ├── index.js # Entry point of the React application
│ ├── App.css # Global styles
│── .gitignore # Files ignored by Git
│── package.json # Project metadata and dependencies
│── README.md # Documentation

## Frontend Components

1. Components (Reusable UI Elements)
   Footer.js / Footer.css → Footer section of the application
   Navbar.js / Navbar.css → Navigation bar across all pages
2. Pages (Main Views)
   AIChatPage.jsx → AI-based chatbot for fitness guidance
   ContactUs.jsx → Contact form for user support
   DashboardPage.jsx → User dashboard with fitness tracking stats
   ExercisePage.jsx → Displays exercise logs and recommendations
   HomePage.jsx → Landing page with app features
   LoginPage.jsx → User authentication (Login form)
   NutritionPage.jsx → Tracks meals and provides AI-driven diet plans
   ProfilePage.jsx → User profile settings (weight, height, goals)
   RegisterPage.jsx → User registration form
3. Routes (Routing & Navigation)
   PrivateRoute.js → Restricts access to authenticated users
   Router.js → Manages app navigation and routing
4. Other Important Files
   index.js → Entry point, renders <App /> component
   reportWebVitals.js → Performance monitoring
   setupTests.js → Unit testing setup
   .gitignore → Excludes unnecessary files from Git commits

# This project is licensed under the MIT License.
