import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import ChatPage from './compnents/ChatPage'
import LoginPage from './compnents/LoginPage'
import RegisterPage from './compnents/RegisterPage'

function App() {
  return (
      <Router>
          <Routes>
            <Route exact  path='/' component={ChatPage} />
            <Route exact  path='/login' element={<LoginPage />} />
            <Route exact  path='/' component={RegisterPage} />
          </Routes>

      </Router>
  );
}

export default App;
