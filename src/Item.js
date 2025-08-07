/**
 * Item.js
 * 
 * This file defines the Item class, which represents a single item in the bakery's inventory.
 * It provides a structured way to manage item data and includes getter/setter methods
 * for all item properties.
 * 
 * Properties:
 * - name: The name of the item
 * - price: The price of the item
 * - quantity: The current stock quantity
 * - category: The category the item belongs to
 */

class Item {
    /**
     * Create a new Item instance
     * @param {string} name - The name of the item
     * @param {number} price - The price of the item
     * @param {number} quantity - The current stock quantity
     * @param {string} category - The category the item belongs to
     * @param {string} [imageUrl=''] - Optional URL for the item's image
     */
    constructor(name, price, quantity, category, imageUrl='') {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.imageUrl = imageUrl
    }

    /**
     * Get the item's name
     * @returns {string} The item's name
     */
    getItemName() {
        return this.name;
    }

    /**
     * Set the item's name
     * @param {string} name - The new name
     */
    setItemName(name) {
        this.name = name;
    }

    /**
     * Get the item's price
     * @returns {number} The item's price
     */
    getItemPrice() {
        return this.price;
    }

    /**
     * Set the item's price
     * @param {number} price - The new price
     */
    setItemPrice(price) {
        this.price = price;
    }

    /**
     * Get the item's quantity
     * @returns {number} The current quantity
     */
    getItemQuantity() {
        return this.quantity;
    }

    /**
     * Set the item's quantity
     * @param {number} quantity - The new quantity
     */
    setItemQuantity(quantity) {
        this.quantity = quantity;
    }

    /**
     * Get the item's category
     * @returns {string} The item's category
     */
    getItemCategory() {
        return this.category;
    }

    /**
     * Set the item's category
     * @param {string} category - The new category
     */
    setItemCategory(category) {
        this.category = category;
    }

    /**
     * Get the item's image URL
     * @returns {string} The item's image URL
     */
    getItemImageUrl() {
        return this.imageUrl;
    }

    /**
     * Set the item's image URL
     * @param {string} imageUrl - The new image URL
     */
    setItemImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }
}

export default Item;