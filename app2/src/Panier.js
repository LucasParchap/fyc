import React, { useEffect, useState } from 'react';
import eventBus from 'shell/eventBus';


const Panier = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [language, setLanguage] = useState('fr');

    useEffect(() => {
        const handleAddToCart = (product) => {
            setCartItems((prevItems) => {
                const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
                if (existingItemIndex !== -1) {
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex].quantity += 1;
                    return updatedItems;
                } else {
                    return [...prevItems, { ...product, quantity: 1 }];
                }
            });
        };

        const handleRemoveFromCart = (product) => {
            setCartItems((prevItems) => {
                const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
                if (existingItemIndex !== -1) {
                    const updatedItems = [...prevItems];
                    if (updatedItems[existingItemIndex].quantity > 1) {
                        updatedItems[existingItemIndex].quantity -= 1;
                        return updatedItems;
                    } else {
                        return updatedItems.filter((item) => item.id !== product.id);
                    }
                }
                return prevItems;
            });
        };
        const handleLanguageChange = (newLanguage) => {
            setLanguage(newLanguage);
        };

        eventBus.on('add-to-cart', handleAddToCart);
        eventBus.on('remove-from-cart', handleRemoveFromCart);
        eventBus.on('language-change', handleLanguageChange);

        return () => {
            eventBus.off('add-to-cart', handleAddToCart);
            eventBus.off('remove-from-cart', handleRemoveFromCart);
            eventBus.off('language-change', handleLanguageChange);
        };
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((item) => item.id === id);
            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                if (updatedItems[existingItemIndex].quantity > 1) {
                    updatedItems[existingItemIndex].quantity -= 1;

                    eventBus.emit('update-catalogue', { id, change: -1 });

                    return updatedItems;
                } else {
                    const removedItem = updatedItems.splice(existingItemIndex, 1)[0];

                    eventBus.emit('update-catalogue', { id, change: -removedItem.quantity });

                    return updatedItems;
                }
            }
            return prevItems;
        });
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-56 h-12 text-lg font-semibold text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center truncate"
            >
                🛒 <span className="ml-1">{language === 'en' ? 'Cart' : 'Panier'}</span>
                <span className="ml-1">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} {language === 'en' ? 'item(s)' : 'article(s)'}
                </span>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg z-10 overflow-hidden">
                    <div className="max-h-48 overflow-y-auto">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center px-6 py-2 border-b last:border-b-0 text-gray-800"
                            >
                                <div>
                                    <span>{item.title}</span>
                                    <span className="ml-4 text-blue-600">
                                        ${item.price.toFixed(2)} x {item.quantity}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    {language === 'en' ? 'Remove' : 'Supprimer'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-2 font-bold text-gray-800">
                        {language === 'en' ? 'Total' : 'Total'}: ${totalPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Panier;
