const url = 'http://16.16.253.75';

// category?: string
export const fetchProducts = async () => {
    
    try {
        const response = await fetch(`${url}/products/`, {
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

export const postProduct = async (productData: PostProductValues, accessToken: string) => {
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
    try {
        const formData = new FormData();
        formData.append('productId', productId);

        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        const response = await fetch(`${url}/products/image/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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


