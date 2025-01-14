import React, { useState } from 'react';

const Panier = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Produit 1", price: 29.99 },
        { id: 2, name: "Produit 2", price: 49.99 },
        { id: 3, name: "Produit 3", price: 19.99 },
    ]);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-lg font-semibold text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                🛒 Panier : {cartItems.length} article(s)
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10 overflow-hidden">
                    <div className="max-h-48 overflow-y-auto">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center px-4 py-2 border-b last:border-b-0 text-gray-800"
                            >
                                <div>
                                    <span>{item.name}</span>
                                    <span className="ml-4 text-blue-600">${item.price.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="px-4 py-2 font-bold text-gray-800">
                        Total: ${totalPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Panier;
