import React, { useEffect, useState } from 'react';
import eventBus from 'shell/eventBus';

const Catalogue = ({ products, loading }) => {
    const [productCounts, setProductCounts] = useState({});
    const [language, setLanguage] = useState('fr');

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col h-full"
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain mb-4"
                    />
                    <div className="flex-grow">
                        <div className="text-lg font-semibold mb-2 text-gray-800">{product.title}</div>
                        <div className="text-blue-600 font-bold text-md mb-4">${product.price}</div>
                    </div>
                    <div className="flex justify-between mt-4 space-x-2">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 py-2 px-4 min-w-[120px] h-[52px] bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        >
                            {language === 'en' ? 'Add to cart' : 'Ajouter au panier'}
                        </button>
                        <button
                            onClick={() => removeFromCart(product)}
                            className="flex-1 py-2 px-4 min-w-[120px] h-[52px] bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                        >
                            {language === 'en' ? 'Delete' : 'Supprimer'}
                        </button>
                        <span className="text-gray-700 text-sm flex items-center justify-center w-10 bg-gray-200 rounded-md">
                            {productCounts[product.id] || 0}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Catalogue;
