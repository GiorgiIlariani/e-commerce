const url = 'http://16.16.253.75';

export const fetchCategoriesList = async () => {
    try {
        const response = await fetch(`${url}/categories/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error while fetching categories:', error);
        throw error;
    }
};
