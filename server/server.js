//server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(
        "mongodb+srv://shreyashegdeplus06:ShreyashegdePlus06@flux-cluster.vyqr9.mongodb.net/User?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Connected to MongoDB");
        seedDatabase();
        insertDummyData();
        initializeCart();
    })
    .catch((err) => console.log("Error connecting to DB:", err));

// Schemas and Models
const petProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    usage: String,
    category: String,
    cost: Number,
});

const previousOrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    dateOfOrder: { type: Date, required: true },
    amount: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "PetProduct" },
            name: String,
            image: String,
            cost: Number,
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
});

const Pet_Product = mongoose.model("PetProduct", petProductSchema);
const PreviousOrder = mongoose.model("PreviousOrder", previousOrderSchema);
const Cart = mongoose.model("Cart", cartSchema);

// Seed initial data
const initializeCart = async () => {
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
const seedData = [
    {
        id: 1,
        name: "Librela",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt1a3d660a8469c912/662a5d9cac4b001663c43b43/librela-detail-tile-large@3x.webp",
        usage: "Give your dog more days of monthly play with long-lasting osteoarthritis pain relief.",
        category: "dog",
        cost: 450,
    },
    {
        id: 2,
        name: "Cytopoint",
        image:
            "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt4833e609f9909d39/662a5d8824e1810e30acf5bc/cytopoint-detail-tile-small@3x.webp",
        usage: "Long-lasting itch relief for dogs with allergic itch or atopic dermatitis.",
        category: "dog",
        cost: 390,
    },
    {
        id: 3,
        name: "AlphaTrak3",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt88e2147f4fd678b5/662a5d49700d6c77a9a69242/alphatrak-detail-tile-small@3x.webp",
        usage: "Easily helps monitor your pet's blood glucose at home.",
        category: "dog",
        cost: 400,
    },
    {
        id: 4,
        name: "Cerenia Tablets",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/bltdd03ef7df909ec10/662a5d4aac4b007c31c43b3f/cerenia-tablets-detail-tile-small@3x.webp",
        usage: "Effectively prevents vomiting due to motion sickness in dogs.",
        category: "dog",
        cost: 850,
    },
    {
        id: 5,
        name: "Solensia",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt99cfad570e482225/662a5fa324e1817596acf5de/solensia-detail-tile-large@3x.webp",
        usage: "Controls OA pain so your cat can get back to moving more freely again.",
        category: "cat",
        cost: 650,
    },
    {
        id: 6,
        name: "Bonqat",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt1496598b032119ac/662a5fa3b05441044b9a0cbd/bonqat-detail-tile-large@3x.webp",
        usage: "Alleviate your cat's acute anxiety and fear of travel and vet visits.",
        category: "cat",
        cost: 350,
    },
    {
        id: 7,
        name: "Vanguard Vaccines",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt3db1403f2af8fd62/662a5fa3700d6cadb4a6926d/vanguard-cats-detail-tile-small@3x.webp",
        usage: "Vaccines to help your cats lead a long and healthy life.",
        category: "cat",
        cost: 1150,
    },
    {
        id: 8,
        name: "Revolution Plus",
        image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt398a74a8310706fa/662a5fa3bb6372d5771e0ada/revolution-plus-detail-tile-large@3x.webp",
        usage: "Provides 6-in-1 protection for your cat from the most common parasites.",
        category: "cat",
        cost: 550,
    },


];

const seedDatabase = async () => {
    try {
        await Pet_Product.deleteMany(); // Clear existing data
        await Pet_Product.insertMany(seedData);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding the database:", error.message);
    }
};


// Seed data when the server starts


// Insert dummy data when the server starts
const insertDummyData = async () => {
    try {
        const existingOrders = await PreviousOrder.find();

        // Insert dummy data only if the database is empty
        if (existingOrders.length === 0) {
            const dummyOrders = [
                { orderId: "001", dateOfOrder: new Date(), amount: 30 },
                { orderId: "002", dateOfOrder: new Date(), amount: 45 },
                // Add more dummy orders as needed
            ];

            await PreviousOrder.insertMany(dummyOrders);
            console.log("Dummy data inserted successfully!");
        }
    } catch (error) {
        console.error("Error inserting dummy data:", error);
    }
};


app.get("/petProducts", async (req, res) => {
    try {
        const products = await Pet_Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch a single product by ID
app.get("/petProducts/:id", async (req, res) => {
    try {
        const product = await Pet_Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch previous orders
app.get("/previousOrders", async (req, res) => {
    try {
        const orders = await PreviousOrder.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add product to cart
// Add product to cart without userId
app.post("/cart", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Pet_Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Just creating a cart as an example, no userId needed
        let cart = await Cart.findOne({});
        if (cart) {
            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );
            if (existingItem) {
                existingItem.quantity += quantity; // Update quantity if product exists
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
});

// Fetch the cart without userId
app.get("/cart", async (req, res) => {
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
});

// Remove item from cart
// Assuming a POST request to remove the item from the cart
app.post("/removeFromCart", async (req, res) => {
    try {
        const { productId } = req.body;

        // Find the cart associated with the user (hardcoded user ID for now)
        const userCart = await Cart.findOne({ userId: "sampleUserId" }); // Replace with actual user ID if necessary
        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the product from the cart's items array
        userCart.items = userCart.items.filter((item) => item.productId.toString() !== productId);

        // Save the updated cart to the database
        await userCart.save();

        // Send back the updated cart after item removal
        res.status(200).json({ message: "Product removed from cart", cart: userCart.items });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Fetch user cart

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});