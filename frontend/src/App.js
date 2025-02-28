import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/Router";
import "./App.css";
import FloatingChat from "./pages/FloatingChat";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <AppRouter />
      </div>
      <FloatingChat />
      <Footer />
    </Router>
  );
}

export default App;
