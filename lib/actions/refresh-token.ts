import { url } from "../utils";

//  აბრუნებს ახალ access ტოკენს
export const refreshAccessToken = async (refreshToken: string) => {
    const refreshTokenUrl = `${url}/api/token/refresh/`;

    try {
        const response = await fetch(refreshTokenUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error while refreshing access token:', error);
        throw error;
    }
};

export const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    accessToken: string,
    refreshToken: string,
    retry = true
): Promise<Response> => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401 && retry) {
                const refreshedTokenData = await refreshAccessToken(refreshToken);
                const newAccessToken = refreshedTokenData.access;

                // Update the access token
                if (typeof window !== "undefined") {
                    localStorage.setItem('access-token', newAccessToken);
                }

                // Retry the request with the new access token
                return fetchWithRetry(url, options, newAccessToken, refreshToken, false);
            } else {
                throw new Error(`Failed to fetch ${url}`);
            }
        }

        return response;
    } catch (error) {
        console.error(`Error while fetching ${url}:`, error);
        throw error;
    }
};