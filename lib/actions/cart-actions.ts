const url = 'http://16.16.253.75';

export const addToCart = async (productId: string, accessToken: string, quantity: number) => {
    try {
        const response = await fetch(`${url}/carts/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: productId,
                quantity,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while adding to cart:', error);
        throw error;
    }
};

export const getCartProducts = async (accessToken: string) => {
    try {
        const response = await fetch(`${url}/carts/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get cart products');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while getting cart products:', error);
        throw error;
    }
};

export const removeProductFromCart = async (productId: string, accessToken: string) => {
    try {
        const response = await fetch(`${url}/carts/${productId}/`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove from cart');
        }

        return { status: response.status };
    } catch (error) {
        console.error('Error while removing from cart:', error);
        throw error;
    }
};
