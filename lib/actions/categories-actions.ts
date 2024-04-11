// import { refreshTokenFunc } from "@/utils";

const url = 'http://16.16.253.75';

export const fetchCategoriesList = async (accesToken: string) => {
    try {
        const response = await fetch(`${url}/category/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accesToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }


        const categories = await response.json();
        return { categories, status: response.status, accesToken };
    } catch (error) {
        console.error('Error while fetching categories:', error);
        throw error;
        
    }
};
