const url = 'http://16.16.253.75';

export const fetchProducts = async ({ min_price, max_price, location }: fetchProductsTypes) => {
    let queryParams = '';

    // Build query parameters string
    if (min_price !== '') {
        queryParams += `min_price=${min_price}&`;
    }
    if (max_price !== '') {
        queryParams += `max_price=${max_price}&`;
    }
    if (location !== '') {
        queryParams += `location=${location}&`;
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


export const fetchSingleProduct = async (productId: string, user: string) => {
    try {
        const response = await fetch(`${url}/products/${productId}/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${user}`,
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

export const postProduct = async (productData: any, accessToken: string) => {
    try {
        const response = await fetch(`${url}/products/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...productData, quantity: 1, category: [productData?.category] })
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

export const postImages = async (productId: string, accessToken: string, images: string[]) => {
    const image = images[0];
    try {
        const formData = new FormData();
        formData.append('product', productId); // Ensure consistency with the curl command
        formData.append(`image`, image); // Ensure consistency with the curl command
        

        const response = await fetch(`${url}/products/image/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Accept": "application/json",
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to post images');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while posting images:', error);
        throw error;
    }
};



