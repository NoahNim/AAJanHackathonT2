import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../hooks';


// this is where the rtk query functions are created and passed from. RTK Query makes an async call to the route in the server

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: async (headers, endpoints) => {
            const authToken = getCookie("XSRF-TOKEN")

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
                url: '/api/user/login',
                method: 'POST',
                body: JSON.stringify(credentials)
            }),
        }),
        // logout end point
        logout: builder.mutation({
            query: () => ({
                url: '/api/user/',
                method: "DELETE",
                'XSRF-TOKEN': getCookie('XSRF-TOKEN')
            })
        }),
        // restore user
        User: builder.query({
            query: () => ('/api/user/')
        }),
    })
})


export const { useLoginMutation, useRestoreQuery, useLogoutMutation } = api;