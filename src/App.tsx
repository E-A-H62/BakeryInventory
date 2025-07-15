/**
 * App.tsx
 * 
 * This is the root component of the bakery application.
 * It sets up routing and provides the inventory context to all child components.
 * 
 * Features:
 * - React Router setup for navigation
 * - Inventory context provider
 * - Navigation menu
 * - Home page and inventory routes
 * - Admin route (protected)
 */

 /** possible resource: https://www.npmjs.com/package/react-animate-on-scroll */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inventory from './components/Inventory';
import Admin from './components/Admin';
import { InventoryProvider } from './context/InventoryContext';
import LandingPage from './components/LandingPage';
import './App.css';

/**
 * Main App component that handles routing and layout
 * Uses React Router for navigation between pages
 */
function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="App">
          {/* Navigation menu with links to different pages */}
          <nav className="nav-menu">
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>
          </nav>

          {/* Route definitions for different pages */}
          <Routes>

            <Route path="/" element={
              <div className="home-container">
                <h1>Welcome to Our Bakery</h1>
                <p>Discover our delicious treats and fresh baked goods.</p>
                
                <h2>About Us</h2>
                <p>This is the about section of the website</p>

                <h2>Main Section</h2>
                <p>This is another main section of the website</p>

                <h2>Contact Us</h2>
                <p>This is the contact info section of the website</p>
              </div>
            } />

            <Route path="/inventory" element={<Inventory />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App; 