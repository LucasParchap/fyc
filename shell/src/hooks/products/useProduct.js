import { useState, useEffect } from 'react';
import { fetchProductById } from '../../api/fakeStoreApi';

const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProduct();
        } else {
            setError('ID du produit manquant.');
            setLoading(false);
        }
    }, [id]);

    return { product, loading, error };
};
export default useProduct;
