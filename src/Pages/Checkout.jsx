import { useEffect, useState } from "react";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        const savedTotalCost = localStorage.getItem("totalCost");

        // Check if cart and total cost exist
        if (savedCart && savedTotalCost) {
            setCartItems(savedCart);
            setTotalCost(Number(savedTotalCost)); // Convert totalCost to number
        }
    }, []); // Run this only once when the component mounts

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        const orderData = {
            name,
            address,
            products: cartItems,
            totalCost,
        };

        try {
            // Send orderData to backend to process the order (API call)
            // const response = await axios.post('/api/order', orderData);
            console.log("Order placed successfully:", orderData);
            alert("Order placed successfully!");
            // Optionally, clear the cart after order is placed
            localStorage.removeItem("cart");
            localStorage.removeItem("totalCost");
            setCartItems([]);
            setTotalCost(0);
        } catch (error) {
            console.error("Error placing the order:", error);
            alert("There was an error placing your order.");
        }
    };

    if (!cartItems.length) {
        return <div>Your cart is empty.</div>; // Display message if no items in the cart
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div>
                <h2 className="font-bold text-xl">Your Products</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId} className="mb-4 flex items-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 inline"
                            />
                            <span className="ml-4">{item.name}</span>
                            <span className="ml-4">Quantity: {item.quantity}</span>
                            <span className="ml-4">₹{item.quantity * item.cost}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    <h2 className="font-bold text-xl">Total Cost: ₹{totalCost}</h2>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Shipping Address
                        </label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            rows="4"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mt-4 font-bold text-xl">
                        Total Payable: ₹{totalCost}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
