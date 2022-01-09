import React from "react";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import RegisterPage from './views/RegisterPage';
import Homepage from './views/HomePage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import MessagePage from './views/MessagePage';
import UserPage from "./views/UserPage";
import AboutPage from "./views/AboutPage";
import FaqPage from "./views/FaqPage";


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;