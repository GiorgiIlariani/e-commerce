import { fetchWithRetry } from "./refresh-token";

const url = 'http://16.16.253.75';


export const addToFavorites = async (productId: string, accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: productId }),
    };

    try {
        const response = await fetchWithRetry(`${url}/favourites/`, options, accessToken, refreshToken);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while adding to favorites:', error);
        throw error;
    }
};

export const getFavoriteProductsList = async (accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    };

    try {
        const response = await fetchWithRetry(`${url}/favourites/`, options, accessToken, refreshToken);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while getting favorites:', error);
        throw error;
    }
};

export const removeFromFavorites = async (productId: string, accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'accept': '*/*',
        },
    };

    try {
        const response = await fetchWithRetry(`${url}/favourites/${productId}/`, options, accessToken, refreshToken);
        return { status: response.status };
    } catch (error) {
        console.error('Error while removing from favorites:', error);
        throw error;
    }
};
