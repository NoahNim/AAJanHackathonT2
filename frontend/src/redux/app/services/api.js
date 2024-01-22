import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCSRFCookie } from '../hooks';


// this is where the rtk query functions are created and passed from. RTK Query makes an async call to the route in the server

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
            query: () => '/api/csrf/restore/'
        }),
        // login endpoint
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/2dFSZfDxBFn2/login',
                method: 'POST',
                body: JSON.stringify(credentials)
            })
        }),
        // logout end point
        logout: builder.query({
            query: () => ({
                url: '/api/2dFSZfDxBFn2/',
                method: "DELETE",
                'XSRF-TOKEN': getCSRFCookie('XSRF-TOKEN')
            })
        }),
        // restore user
        restoreUser: builder.mutation({
            query: () => ('/api/2dFSZfDxBFn2/')
        }),
    })
})


export const { useLoginMutation, useRestoreQuery, useRestoreUserMutation, useLazyLogoutQuery } = api;