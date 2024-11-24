import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
    const { _id } = useParams(); // Product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartMessage, setCartMessage] = useState(""); // Message for cart actions

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/petProducts/${_id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [_id]);

    const handleAddToCart = async () => {
        try {
            await axios.post("http://localhost:5000/cart", {
                productId: _id,
                quantity: 1,
            });
            setCartMessage("Product added to cart!");
            setTimeout(() => setCartMessage(""), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error adding product to cart:", error);
            setCartMessage("Failed to add product to cart.");
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-10 text-xl">Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/products" className="text-blue-500 underline mb-4 block">
                ← Back to Products
            </Link>
            <div className="bg-white rounded-lg shadow-md p-6">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-1/2 flex self-center h-auto object-cover rounded-md mb-4"
                />
                <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                <h1 className="text-5xl font-bold font-heading mb-2">{product.name}</h1>
                <p className="text-gray-600 text-xl font-body mb-4">{product.usage}</p>
                <p className="text-black text-2xl font-semibold font-body mb-6">₹{product.cost}</p>
                <button
                    onClick={handleAddToCart}
                    className="text-white mt-4 bg-black font-light px-4 py-3 rounded-full font-body border-[1px] border-black border-solid hover:text-black hover:bg-transparent duration-200 ease-in-out"
                >
                    Add to Cart
                </button>
                {cartMessage && (
                    <div className="mt-4 text-green-500 font-medium">{cartMessage}</div>
                )}
            </div>
        </div>
    );
};

export default Product;
