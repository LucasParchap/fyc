const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits.');
    }
    return response.json();
};

export const fetchProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du produit avec l'ID ${id}.`);
    }
    return response.json();
};

export const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs.');
    }
    return response.json();
};

export const fetchUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id}.`);
    }
    return response.json();
};
