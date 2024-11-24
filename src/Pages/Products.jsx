import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract category from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category") || "";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/petProducts", {
                    params: { category: categoryFromUrl }, // Pass category as query parameter
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryFromUrl]); // Re-fetch products whenever the category changes in the URL

    const handleCategoryChange = (category) => {
        navigate(`/products?category=${category}`); // Update the URL with the selected category
    };

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Filter Buttons */}
            <div className="mb-6 flex justify-center gap-4">
                <button
                    className={`px-4 py-2 rounded-md border ${
                        categoryFromUrl === "" ? "bg-gray-800 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleCategoryChange("")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded-md border ${
                        categoryFromUrl === "dog" ? "bg-gray-800 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleCategoryChange("dog")}
                >
                    For Dogs
                </button>
                <button
                    className={`px-4 py-2 rounded-md border ${
                        categoryFromUrl === "cat" ? "bg-gray-800 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleCategoryChange("cat")}
                >
                    For Cats
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="bg-white rounded-lg overflow-hidden border border-black px-4 py-4 hover:border-2 transition-all ease-in-out"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-heading font-bold">{product.name}</h2>
                            <p className="text-gray-600 font-body text-base mt-2">
                                {product.usage}
                            </p>
                            <div className="flex flex-row justify-between">
                                <p className="text-sm text-gray-500 mt-1">
                                    Category: {product.category}
                                </p>
                                <h2 className="text-2xl font-heading font-bold">₹{product.cost}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
