import mongoose from "mongoose";

// Pet Product Schema
const petProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    usage: String,
    category: String,
    cost: Number,
});

// Previous Order Schema
const previousOrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    dateOfOrder: { type: Date, required: true },
    amount: { type: Number, required: true },
});

// Cart Schema
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

export { Pet_Product, PreviousOrder, Cart };
