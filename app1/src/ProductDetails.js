import React from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../../shell/src/hooks/products/useProduct';

const ProductDetails = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) {
        return <div>Chargement du produit...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    if (!product) {
        return <div>Produit introuvable.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <img src={product.image} alt={product.title} className="w-full h-96 object-contain my-4" />
            <p className="text-lg">{product.description}</p>
            <div className="text-blue-600 font-bold text-xl mt-4">${product.price}</div>
        </div>
    );
};

export default ProductDetails;
