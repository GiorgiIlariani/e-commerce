const url = 'http://16.16.253.75';

export const fetchProducts = async (category?: string) => {
    try {
        const response = await fetch(`${url}/products/`, {
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


export const postProduct = async (productData: any, user: string) => {
    try {
        const response = await fetch(`${url}/products/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...productData, quantity: 1 })
        });

        if (!response.ok) {
            throw new Error('Failed to post product');
        }

        const postedProduct = await response.json();
        return postedProduct;
    } catch (error) {
        console.error('Error while posting product:', error);
        throw error;
    }
};