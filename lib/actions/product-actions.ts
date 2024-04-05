const url = 'http://16.16.253.75';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${url}/products`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error while fetching products:', error);
        throw error;
    }
};
