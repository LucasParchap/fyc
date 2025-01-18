import { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/fakeStoreApi';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    return { users, loading, error };
};

export default useUsers;
