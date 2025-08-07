/**
 * Admin.tsx
 * 
 * This component provides an administrative interface for managing the bakery's inventory.
 * It allows authorized users to create, edit, and delete inventory items.
 * 
 * Security:
 * - Access is controlled via a URL token parameter
 * - Unauthorized access attempts are redirected to the home page
 * 
 * Features:
 * - Create new inventory items
 * - Edit existing items
 * - Delete items
 * - Form validation
 * - Responsive grid layout
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Item from '../Item';
import { useInventory } from '../context/InventoryContext';
import './Admin.css';

// Secret token for admin access - in production, this should be in environment variables
const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;

const Admin: React.FC = () => {
    // URL parameters and navigation
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get inventory management functions from context
    const { inventory, addItem, updateItem, deleteItem } = useInventory();

    // State for managing the edit/create form
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        imageUrl: ''
    });

    // Check for valid admin token on component mount
    useEffect(() => {
        const token = searchParams.get('token');
        if (token !== ADMIN_TOKEN) {
            navigate('/');
            return;
        }
    }, [searchParams, navigate]);

    /**
     * Handle editing an existing item
     * @param item - The item to edit
     */
    const handleEdit = (item: Item) => {
        setEditingItem(item);
        setIsCreating(false);
        setFormData({
            name: item.getItemName(),
            price: item.getItemPrice().toString(),
            quantity: item.getItemQuantity().toString(),
            category: item.getItemCategory(),
            imageUrl: item.getItemImageUrl()
        });
    };

    /**
     * Handle image upload
     * Reads the selected file and sets the image URL in form data
     * @param e - Change event from file input
     */
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageUrl: reader.result as string // base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    

    /**
     * Handle creating a new item
     * Resets the form and sets creating mode
     */
    const handleCreate = () => {
        setEditingItem(null);
        setIsCreating(true);
        setFormData({
            name: '',
            price: '',
            quantity: '',
            category: '',
            imageUrl: ''
        });
    };

    /**
     * Handle form submission for both create and edit operations
     * @param e - Form submission event
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newItem = new Item(
            formData.name,
            parseFloat(formData.price),
            parseInt(formData.quantity),
            formData.category,
            formData.imageUrl
        );

        if (isCreating) {
            addItem(newItem);
        } else if (editingItem) {
            updateItem(editingItem, newItem);
        }

        // Reset form state
        setEditingItem(null);
        setIsCreating(false);
        setFormData({ name: '', price: '', quantity: '', category: '', imageUrl: '' });
    };

    /**
     * Handle deletion of an item
     * @param itemToDelete - The item to delete
     */
    const handleDelete = (itemToDelete: Item) => {
        deleteItem(itemToDelete);
    };

    // Redirect unauthorized access
    if (!searchParams.get('token') || searchParams.get('token') !== ADMIN_TOKEN) {
        return null;
    }

    return (
        <div className="admin-container">
            <nav className="nav-menu">
                <a href="/">Home Page</a>
                <a href="/inventory">Bakery Inventory</a>
            </nav>

            <h1>Admin Dashboard</h1>
            
            {(editingItem || isCreating) ? (
                // Edit/Create form
                <form onSubmit={handleSubmit} className="edit-form">
                    <h2>{isCreating ? 'Create New Item' : 'Edit Item'}</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                        min="0"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        required
                        min="0"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {formData.imageUrl && ( // Show image preview if available
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="image-preview"
                            style={{ maxWidth: '150px', marginTop: '10px' }}
                        />
                    )}
                    <div className="button-group">
                        <button type="submit">{isCreating ? 'Create Item' : 'Save Changes'}</button>
                        <button type="button" onClick={() => {
                            setEditingItem(null);
                            setIsCreating(false);
                        }}>Cancel</button>
                    </div>
                </form>
            ) : (
                // Inventory list view
                <>
                    <h2>Current Inventory</h2>
                    <button onClick={handleCreate} className="create-button">Create New Item</button>
                    <div className="inventory-list">
                        {inventory.length === 0 ? (
                            <p className="empty-message">No items in inventory. Click "Create New Item" to add items.</p>
                        ) : (
                            inventory.map((item, index) => (
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
                                    <p>Category: {item.getItemCategory()}</p>
                                    <p>Price: ${item.getItemPrice().toFixed(2)}</p>
                                    <p>Quantity: {item.getItemQuantity()}</p>
                                    <div className="button-group">
                                        <button onClick={() => handleEdit(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Admin; 