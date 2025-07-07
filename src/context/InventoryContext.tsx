/**
 * InventoryContext.tsx
 * 
 * This file implements a React Context for managing the bakery's inventory state.
 * It provides a centralized way to manage inventory data across components and
 * persists the data using localStorage.
 * 
 * Key Features:
 * - Shared inventory state across components
 * - CRUD operations for inventory items
 * - Automatic persistence to localStorage
 * - Type safety with TypeScript
 */

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Item from '../Item';

/**
 * Type definition for the inventory context
 * Provides the shape of the data and functions available through the context
 */
interface InventoryContextType {
    inventory: Item[];                    // Current inventory items
    setInventory: React.Dispatch<React.SetStateAction<Item[]>>;  // Function to update entire inventory
    addItem: (item: Item) => void;       // Add a new item to inventory
    updateItem: (oldItem: Item, newItem: Item) => void;  // Update an existing item
    deleteItem: (item: Item) => void;    // Remove an item from inventory
}

/**
 * Helper function to convert Item objects to plain objects for storage
 * This is necessary because localStorage can only store serializable data
 */
const itemToStorage = (item: Item) => ({
    name: item.getItemName(),
    price: item.getItemPrice(),
    quantity: item.getItemQuantity(),
    category: item.getItemCategory()
});

/**
 * Helper function to convert stored data back to Item objects
 * Reconstructs Item instances from the stored plain objects
 */
const storageToItem = (data: any) => new Item(
    data.name,
    data.price,
    data.quantity,
    data.category
);

// Key used to store inventory data in localStorage
const STORAGE_KEY = 'bakery-inventory';

// Create the context with undefined as initial value
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

/**
 * Provider component that wraps the application and makes inventory data available
 * to any nested component that calls useInventory()
 */
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize state from localStorage if available, otherwise empty array
    const [inventory, setInventory] = useState<Item[]>(() => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                return parsedData.map(storageToItem);
            } catch (error) {
                console.error('Error loading inventory from localStorage:', error);
                return [];
            }
        }
        return [];
    });

    // Save to localStorage whenever inventory changes
    useEffect(() => {
        const dataToStore = inventory.map(itemToStorage);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    }, [inventory]);

    /**
     * Add a new item to the inventory
     * @param item - The Item object to add
     */
    const addItem = (item: Item) => {
        setInventory(prev => [...prev, item]);
    };

    /**
     * Update an existing item in the inventory
     * @param oldItem - The Item object to replace
     * @param newItem - The new Item object
     */
    const updateItem = (oldItem: Item, newItem: Item) => {
        setInventory(prev => 
            prev.map(item => item === oldItem ? newItem : item)
        );
    };

    /**
     * Remove an item from the inventory
     * @param itemToDelete - The Item object to remove
     */
    const deleteItem = (itemToDelete: Item) => {
        setInventory(prev => prev.filter(item => item !== itemToDelete));
    };

    return (
        <InventoryContext.Provider value={{ 
            inventory, 
            setInventory, 
            addItem, 
            updateItem, 
            deleteItem 
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

/**
 * Custom hook to use the inventory context
 * @returns The inventory context
 * @throws Error if used outside of InventoryProvider
 */
export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (context === undefined) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
}; 