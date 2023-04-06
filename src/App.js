import "./App.css";
import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./assets/logo.png";
import LogInPage from "./components/login/LogInPage";
import RegisterPage from "./components/login/RegisterPage";

function App() {
  return (
    <Router>
      <NavBar logo={logo} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
