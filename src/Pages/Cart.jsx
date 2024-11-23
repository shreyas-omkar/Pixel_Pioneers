import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();

    // Fetch cart data from the server when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:5000/cart");
                const cartItems = response.data.items;
                setCart(cartItems); // Set the cart items in the state
                updateTotalCost(cartItems); // Update the total cost
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []); // This runs once when the component mounts

    // Sync cart and total cost to localStorage whenever they change
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart)); // Save cart data in localStorage
            localStorage.setItem("totalCost", totalCost); // Save total cost in localStorage
        }
    }, [cart, totalCost]); // Run this when cart or totalCost changes

    // Function to update the total cost
    const updateTotalCost = (cartItems) => {
        const total = cartItems.reduce((acc, item) => acc + item.quantity * item.cost, 0);
        setTotalCost(total);
    };

    // Remove item from cart
    const handleRemoveFromCart = async (productId) => {
        try {
            // Remove the item from the state immediately (for instant UI update)
            const updatedCart = cart.filter((item) => item.productId !== productId);
            setCart(updatedCart);

            // Send the productId to the backend to remove it from the cart
            const response = await axios.post("http://localhost:5000/removeFromCart", { productId });

            // Update the cart state with the new data from the backend
            setCart(response.data.cart);
            updateTotalCost(response.data.cart); // Update the total cost with the new cart items
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    // Add item to cart
    const handleAddToCart = async (product) => {
        try {
            const productExists = cart.some((item) => item.productId === product.productId);

            if (productExists) {
                alert("This product is already in the cart.");
                return;
            }

            // Add the product to the cart
            const updatedCart = [...cart, product];
            setCart(updatedCart);

            // Update the total cost
            updateTotalCost(updatedCart);

            // Send the product to the backend to add it to the cart
            await axios.post("http://localhost:5000/addToCart", { product });
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    // Handle checkout button click
    const handleCheckout = () => {
        navigate("/checkout"); // Navigate to checkout page
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length > 0 ? (
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.productId} className="mb-4 flex items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 inline"
                                />
                                <span className="ml-4">{item.name}</span>
                                <span className="ml-4">Quantity: {item.quantity}</span>
                                <span className="ml-4">₹{item.quantity * item.cost}</span>
                                <button
                                    onClick={() => handleRemoveFromCart(item.productId)}
                                    className="ml-4 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <h2 className="font-bold text-xl">Total Cost: ₹{totalCost}</h2>
                    </div>
                    <button
                        onClick={handleCheckout} // Handle checkout button click
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            ) : (
                <div>No items in cart.</div>
            )}
        </div>
    );
};

export default Cart;
