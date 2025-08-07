/**
 * Inventory.tsx
 * 
 * This component displays the bakery's inventory in a grid layout.
 * It shows all items with their details and provides a clean, user-friendly interface.
 * 
 * Features:
 * - Responsive grid layout
 * - Empty state handling
 * - Real-time updates through context
 * - Clean, modern design
 */

import React from 'react';
import { useInventory } from '../context/InventoryContext';
import './Inventory.css';

/**
 * Inventory component displays a grid of bakery items
 * Each item shows its name, category, price, and current stock
 */
const Inventory: React.FC = () => {
    // Get inventory data from context
    const { inventory } = useInventory();

    return (
        <div className="inventory-container">
            <nav className="nav-menu">
                <a href="/">Home Page</a>
                <a href="/inventory">Bakery Inventory</a>
            </nav>
            <h1>Bakery Inventory</h1>
            {inventory.length === 0 ? (
                // Show message when inventory is empty
                // Must use the admin dashboard to add items
                <p className="empty-message">No items in inventory.</p>
            ) : (
                // Display inventory items in a grid
                <div className="inventory-grid">
                    {inventory.map((item, index) => (
                        <div key={index} className="inventory-item">
                            {item.getItemImageUrl() && ( // Check if item has an image URL
                                <img // Display item image if available
                                    src={item.getItemImageUrl()}
                                    alt={item.getItemName()}
                                    className="item-image"
                                    style={{ maxWidth: '150px', marginBottom: '10px' }}
                                />
                            )}
                            <h3>{item.getItemName()}</h3>
                            <p className="category">{item.getItemCategory()}</p>
                            <p className="price">${item.getItemPrice().toFixed(2)}</p>
                            <p className="quantity">In Stock: {item.getItemQuantity()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inventory; 