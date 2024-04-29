import { fetchWithRetry } from "./refresh-token";

const url = 'http://16.16.253.75';

export const fetchProducts = async ({ min_price, max_price, location, searchQuery, page_size, user }: fetchProductsTypes) => {    
    let queryParams = '';

    // Build query parameters string
    if (min_price !== undefined && min_price !== '') {
        queryParams += `min_price=${min_price}&`;
    }
    if (max_price !== undefined && max_price !== '') {
        queryParams += `max_price=${max_price}&`;
    }
    if (location !== undefined && location !== '') {
        queryParams += `location=${location}&`;
    }
    if (searchQuery !== undefined && searchQuery !== '') {
        queryParams += `search=${searchQuery}&`;
    }
    if (page_size !== undefined && page_size) {
        queryParams += `page_size=${page_size}&`;
    }

    if(user !== undefined && user) {
        queryParams += `user=${user}&`;
    }


    try {
        const response = await fetch(`${url}/products/?${queryParams}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
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

export const fetchSingleProduct = async (productId: string) => {
    try {
        const response = await fetch(`${url}/products/${productId}/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch single product');
        }

        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error while fetching single product:', error);
        throw error;
    }
};

export const postProduct = async (productData: any, accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...productData, quantity: 1, category: [productData?.category] })
    };

    try {
        const response = await fetchWithRetry(`${url}/products/`, options, accessToken, refreshToken);
        
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

export const postImages = async (productId: string, accessToken: string, images: any[], refreshToken: string) => {
    try {
        const responses = [];
        for (const image of images) {
            const formData = new FormData();
            formData.append('product', productId);
            formData.append('image', image);

            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                },
                body: formData,
            };

            const response = await fetchWithRetry(`${url}/products/image/`, options, accessToken, refreshToken);

            if (!response.ok) {
                throw new Error('Failed to post images');
            }

            const responseData = await response.json();
            responses.push(responseData);
        }

        return responses;
    } catch (error) {
        console.error('Error while posting images:', error);
        throw error;
    }
};
