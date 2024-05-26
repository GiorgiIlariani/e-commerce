import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';
import { url } from "@/lib/utils";

import { toast } from "react-toastify";


const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: url,
});
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {		
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			// Retrieve refresh token from local storage
            const refreshToken = typeof window !== "undefined" && localStorage.getItem("refresh-token");

			try {
				const refreshResult = await baseQuery(
					{
						url: '/api/token/refresh/',
						body: JSON.stringify({ refresh: refreshToken }),
						method: 'POST',
						headers: {
                          'Content-Type': 'application/json'
                        }
					},
					api,
					extraOptions
				);
				
				if (refreshResult.data) {
					typeof window !== "undefined" && localStorage.setItem("access-token", (refreshResult?.data as { access?: string })?.access ?? '');

					api.dispatch(setAuth());
					result = await baseQuery(args, api, extraOptions);
				} else {					
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	if(result.error && result.error.status === 400) {
		toast.error("A user with that username already exists.");
	} 

	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
});