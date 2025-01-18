import React, { useEffect, useState } from 'react';
import eventBus from 'shell/eventBus';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Catalogue = ({ products, loading }) => {
    const [productCounts, setProductCounts] = useState({});
    const [language, setLanguage] = useState('fr');
    const navigate = useNavigate();

    useEffect(() => {
        const handleUpdateCatalogue = ({ id, change }) => {
            setProductCounts((prevCounts) => {
                if (!prevCounts[id] && change < 0) return prevCounts;

                const updatedCounts = { ...prevCounts };
                updatedCounts[id] = (updatedCounts[id] || 0) + change;

                if (updatedCounts[id] <= 0) {
                    delete updatedCounts[id];
                }

                return updatedCounts;
            });
        };
        const handleLanguageChange = (newLanguage) => {
            setLanguage(newLanguage);
        };

        eventBus.on('update-catalogue', handleUpdateCatalogue);
        eventBus.on('language-change', handleLanguageChange);

        return () => {
            eventBus.off('update-catalogue', handleUpdateCatalogue);
            eventBus.off('language-change', handleLanguageChange);
        };
    }, []);

    const addToCart = (product) => {
        eventBus.emit('add-to-cart', product);

        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [product.id]: (prevCounts[product.id] || 0) + 1,
        }));
    };

    const removeFromCart = (product) => {
        eventBus.emit('remove-from-cart', product);

        setProductCounts((prevCounts) => {
            if (!prevCounts[product.id]) return prevCounts;

            const updatedCounts = { ...prevCounts };
            updatedCounts[product.id] -= 1;

            if (updatedCounts[product.id] === 0) {
                delete updatedCounts[product.id];
            }

            return updatedCounts;
        });
    };

    if (loading) {
        return <div className="text-center text-blue-500">Chargement des produits...</div>;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col h-full"
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-64 object-contain mb-4"
                                />
                                <div className="flex-grow">
                                    <div className="text-xl font-semibold mb-2 text-gray-800">{product.title}</div>
                                    <div className="text-blue-600 font-bold text-lg mb-4">${product.price}</div>
                                </div>
                                <div className="flex flex-col space-y-3 mt-4">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                    >
                                        {language === 'en' ? 'Add to cart' : 'Ajouter au panier'}
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(product)}
                                        className="w-full py-3 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                                    >
                                        {language === 'en' ? 'Delete' : 'Supprimer'}
                                    </button>
                                    <button
                                        onClick={() => navigate(`/catalogue/details/${product.id}`)}
                                        className="w-full py-3 bg-gray-100 text-blue-500 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                                    >
                                        {language === 'en' ? 'View detail' : 'Voir le détail'}
                                    </button>
                                </div>
                                <div className="flex justify-center mt-2">
                                    <span className="text-gray-700 text-sm flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                                        {productCounts[product.id] || 0}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />
            <Route path="details/:id" element={<ProductDetails />} />
        </Routes>
    );
};

export default Catalogue;
