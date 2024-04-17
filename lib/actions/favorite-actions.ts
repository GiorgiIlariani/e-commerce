const url = 'http://16.16.253.75';

export const addToFavorites = async (productId: string, accessToken: string) => {
    try {
        const response = await fetch(`${url}/favourites/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: productId
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to favorites');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while adding to favorites:', error);
        throw error;
    }
};


export const getFavoriteProductsList = async (accessToken: string) => {
    try {
        const response = await fetch(`${url}/favourites/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get favorites');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while getting favorites:', error);
        throw error;
    }
};