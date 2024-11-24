import express from "express";
import {
    initializeCart,
    seedDatabase,
    getPetProducts,
    getPetProductById,
    getPreviousOrders,
    addToCart,
    getCart,
    removeFromCart,
} from "../controllers/controllers.js";


const router = express.Router();

// Initialize and seed data
initializeCart();

// Routes
router.get("/petProducts", getPetProducts);
router.get("/petProducts/:id", getPetProductById);
router.get("/previousOrders", getPreviousOrders);
router.post("/cart", addToCart);
router.get("/cart", getCart);
router.post("/removeFromCart", removeFromCart);

export default router;




