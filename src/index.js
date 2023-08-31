import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';

import {
  Register,
  Login,
  Profile,
  UserCheckout,
  Navbar,
  Footer
} from  "./components";

function App() {

    return (
        <Router>
          <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users/:username/checkout" element={<UserCheckout />} />
            </Routes>
          <Footer />
        </Router>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
