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
        <div className="container mx-auto flex flex-col px-4 py-8">
            <h1 className="text-6xl font-heading flex self-center text-center font-bold mb-4">Checkout</h1>
            <div className="my-10">
                <h2 className="font-bold font-body text-2xl">Your Products</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId} className="mb-4 flex items-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 inline"
                            />
                            <span className="ml-8 font-bold">{item.name}</span>
                            <span className="ml-8">Quantity: <b>{item.quantity}</b></span>
                            <span className="ml-8 font-bold">₹{item.quantity * item.cost}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    
                    <h2 className="font-bold text-xl">Total Cost: ₹{totalCost}</h2>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="my-8 flex flex-col">
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
                    <p className="font-body mt-8 text-xs text-grey-600">₹60 (Delivery Charges)</p>
                    <div className="mb-4 font-bold text-xl">
                        Total Payable: ₹{totalCost + 60} (In Cash On Arrival)
                    </div>

                    <button
                        type="submit"
                        className="self-center text-center flex-col flex text-white mt-4 bg-black font-light px-8 py-3 rounded-full font-body border-[1px] border-black border-solid hover:text-black hover:bg-transparent duration-200 ease-in-out"
                    >
                        Place Order for ₹{totalCost + 60}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
