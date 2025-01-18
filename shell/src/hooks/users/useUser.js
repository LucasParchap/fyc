import { useState, useEffect } from 'react';
import { fetchUserById } from '../../api/fakeStoreApi';

const useProduct = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchUserById(id);
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadUser();
        } else {
            setError('ID de l\'user manquant.');
            setLoading(false);
        }
    }, [id]);

    return { user, loading, error };
};
export default useProduct;
