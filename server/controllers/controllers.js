import { Pet_Product, PreviousOrder, Cart } from "../models/model.js";
import { seedData } from "../seedData.js";

// Initialize Cart
export const initializeCart = async () => {
    try {
        const existingCart = await Cart.findOne({});
        if (!existingCart) {
            await Cart.create({ items: [] });
            console.log("Initialized a shared cart for the demo.");
        } else {
            console.log("Shared cart already exists.");
        }
    } catch (error) {
        console.error("Error initializing cart:", error.message);
    }
};

// Seed Database
export const seedDatabase = async () => {

    try {
        await Pet_Product.deleteMany(); // Clear existing data
        await Pet_Product.insertMany(seedData);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding the database:", error.message);
    }
};

// Fetch all pet products
export const getPetProducts = async (req, res) => {
    try {
        const { category, sortBy, sortOrder } = req.query;

        // Default sort parameters if not provided
        const sortField = sortBy || 'cost'; // Default to sorting by cost
        const order = sortOrder === 'desc' ? -1 : 1; // Default to ascending

        // Build the filter condition for category
        let filter = {};

        // If a category is provided, filter by category
        if (category) {
            if (category !== 'dog' && category !== 'cat') {
                return res.status(400).json({ error: 'Invalid category. Please choose either dog or cat.' });
            }
            filter.category = category;
        }

        // Fetch products from the database with optional filtering and sorting
        const products = await Pet_Product.find(filter)
            .sort({ [sortField]: order }); // Sorting by field dynamically

        // Only one response sent here, no more logic after res.json()
        return res.json(products); // Send the sorted and filtered products back in the response

    } catch (err) {
        console.error('Error fetching products:', err);
        // Ensure no further code is executed after sending the response
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch pet product by ID
export const getPetProductById = async (req, res) => {
    try {
        const product = await Pet_Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Fetch all previous orders
export const getPreviousOrders = async (req, res) => {
    try {
        const orders = await PreviousOrder.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Pet_Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({});
        if (cart) {
            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    name: product.name,
                    image: product.image,
                    cost: product.cost,
                    quantity,
                });
            }
        } else {
            cart = new Cart({
                items: [
                    {
                        productId,
                        name: product.name,
                        image: product.image,
                        cost: product.cost,
                        quantity,
                    },
                ],
            });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Fetch the cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({}).populate("items.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        // Ensure you're fetching the correct cart (e.g., by userId if applicable)
        const cart = await Cart.findOne({}); // Adjust query if user-specific carts are implemented

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the product from the cart
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        // Save the updated cart back to the database
        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart: cart.items });
    } catch (error) {
        console.error("Error removing product from cart:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

};
