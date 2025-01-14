const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits.');
    }
    return response.json();
};
