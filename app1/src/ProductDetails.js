import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProduct from '../../shell/src/hooks/products/useProduct';
import eventBus from 'shell/eventBus';

const translations = {
    fr: {
        back: "Retour",
    },
    en: {
        back: "Back",
    },
};
const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product, loading, error } = useProduct(id);
    const [language, setLanguage] = useState('fr');

    const t = translations[language];

    useEffect(() => {
        const handleLanguageChange = (newLanguage) => {
            setLanguage(newLanguage);
        };
        eventBus.on('language-change', handleLanguageChange);
        return () => {
            eventBus.off('language-change', handleLanguageChange);
        };
    }, []);

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
            <button
                onClick={() => navigate(-1)}
                className="mb-4 py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
            >
                {t.back}
            </button>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <img src={product.image} alt={product.title} className="w-full h-96 object-contain my-4" />
            <p className="text-lg">{product.description}</p>
            <div className="text-blue-600 font-bold text-xl mt-4">${product.price}</div>
        </div>
    );
};

export default ProductDetails;
