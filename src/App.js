import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout"; 
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Question from "./pages/Question"; 
import Journal from "./pages/Journal"; 
import Chat from "./pages/Chat";

function App() {
  const [isAuth, setIsAuth] = useState(false); 
  
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth) {
      setIsAuth(true);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to= "/home"/>: <Navigate to="/login" />}
        />
        <Route path="/home" element={<Layout><Home isAuth={isAuth} /></Layout>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/question" element={<Layout><Question isAuth = {isAuth} /></Layout>} />
        <Route path="/journal" element ={<Layout><Journal/></Layout>}/>
        <Route path="/chat" element ={<Layout><Chat/></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
