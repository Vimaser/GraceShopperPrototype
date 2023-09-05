import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Cycle's-R-Us!</a>
            
            <div className="navbar-nav ml-auto">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users/johndoe/checkout">Checkout</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link" to="/reviews">Reviews</Link>
                    </li>
                    <div className="navbar-search">
                        <Search />
                    </div>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;