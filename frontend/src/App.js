import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/Router";
import "./App.css";
import FloatingChat from "./pages/FloatingChat";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

import { AuthContext } from "./pages/AuthContext";
function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <div className="content" style={{ marginTop: "50px" }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRouter />
      </div>
      {token && <FloatingChat />}
      <Footer />
    </Router>
  );
}

export default App;
