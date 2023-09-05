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
  Cart,
  Search,
  Home,
  Reviews,
  ProductListing,
  Footer
} from  './components';
import { CartProvider } from './CartContext';

function App() {

    return (
      <CartProvider>
        <Router>
          <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productlisting' element={<ProductListing />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/users/:username/checkout' element={<UserCheckout />} />
                <Route path='/reviews' element={<Reviews />} />
            </Routes>
          <Footer />
        </Router>
      </CartProvider>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
