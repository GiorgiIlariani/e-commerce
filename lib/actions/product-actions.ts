import { fetchWithRetry, refreshAccessToken } from "./refresh-token";

const url = "https://nika2004.pythonanywhere.com";

export const fetchProducts = async ({ min_price, max_price, location, category, searchQuery, page_size, page, user }: fetchProductsTypes) => {    
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

    if (category !== undefined && category !== '') {
        queryParams += `category=${[category]}&`;
    }

    if (searchQuery !== undefined && searchQuery !== '') {
        queryParams += `search=${searchQuery}&`;
    }

    if (page_size !== undefined && page_size) {
        queryParams += `page_size=${page_size}&`;
    }

    if (page !== undefined && page) {
        queryParams += `page=${page}&`;
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
        body: JSON.stringify({ ...productData, category: [productData?.category] })
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

export const editProduct = async (productId: string, values: any, accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'PATCH', // Change method to PATCH for updating existing resource
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, quantity: 1, category: [values?.category] }), // Send the updated product data in the body
    };

    try {
        const response = await fetchWithRetry(`${url}/products/${productId}/`, options, accessToken, refreshToken);
        
        if (!response.ok) {
            throw new Error('Failed to edit product');
        }

        const editedProduct = await response.json();
        return editedProduct;
    } catch (error) {
        console.error('Error while editing product:', error);
        throw error;
    }
};


export const postImages = async (productId: string, accessToken: string, images: any[], refreshToken: string) => {
    try {
        const responses = [];

        // Function to check if access token is still valid
        const isTokenValid = async (token: string): Promise<boolean> => {
            try {
                const testOptions: RequestInit = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                };

                // Assuming there's an endpoint to test token validity
                const testResponse = await fetch(`${url}/auth/test-token/`, testOptions);

                return testResponse.ok;
            } catch (error) {
                console.error('Error while testing token validity:', error);
                return false;
            }
        };

        let validAccessToken = accessToken;

        // Check if the current access token is valid
        const tokenValid = await isTokenValid(accessToken);

        if (!tokenValid) {
            const refreshedTokenData = await refreshAccessToken(refreshToken);
            validAccessToken = refreshedTokenData.access;

            // Update the access token
            if (typeof window !== "undefined") {
                localStorage.setItem('access-token', validAccessToken);
            }
        }

        // Upload each image using the valid access token
        for (const image of images) {
            const formData = new FormData();
            formData.append('product', productId);
            formData.append('image', image);

            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${validAccessToken}`,
                    'Accept': 'application/json',
                },
                body: formData,
            };

            const response = await fetchWithRetry(`${url}/products/image/`, options, validAccessToken, refreshToken);

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


export const removeProduct = async (productId: number, accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    
    try {
        const response = await fetchWithRetry(`${url}/products/${productId}/`, options, accessToken, refreshToken);
        
        if (!response.ok) {
            throw new Error('Failed to remove product');
        }
        
        return response.status;
    } catch (error) {
        console.error('Error while removing product:', error);
        throw error;
    }
}

export const removeSingleImage = async (imageId: number, accessToken: string, refreshToken: string) => {
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
           'accept': '*/*',
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    try {
        const response = await fetchWithRetry(`${url}/products/image/${imageId}`, options, accessToken, refreshToken);
        
        if (!response.ok) {
            throw new Error('Failed to remove image');
        }
        
        return response.status;
    } catch (error) {
        console.error('Error while removing image:', error);
        throw error;
    }
}