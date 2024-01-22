import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCSRFCookie } from '../hooks';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: async (headers, endpoints) => {
            const authToken = getCSRFCookie("XSRF-TOKEN")

            if (authToken) {
                headers.set('XSRF-TOKEN', authToken);
            }

            headers.set('Content-type', 'application/json')

            return headers
        }
    }),
    endpoints: (builder) => ({
        restore: builder.query({  // builder.query creates an async function which makes a query to the api on the server
            query: () => 'api/csrf/restore/'
        }),

    })
})