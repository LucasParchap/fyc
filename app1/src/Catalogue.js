import React from 'react';

const Catalogue = ({ products, loading }) => {
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
                        <button className="flex-1 py-1 px-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                            Ajouter au panier
                        </button>
                        <button className="flex-1 py-1 px-3 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition">
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Catalogue;
