import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { token } from '../../constants/auth-constant';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://ngocthach-reactjs-nodejs-backend.vercel.app',
    prepareHeaders: (headers) => {
        const accessToken = JSON.parse(localStorage.getItem(token));
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    }
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (args.url === '/accounts' && result.error && result.error.originalStatus === 400) {
        alert("This username already exists!");
    }
    if (args.url !== 'login' && args.url !== 'register') {
        if (result.error && result.error.originalStatus === 401) {
            window.location.href = '/login';
        }
    }
    return result;
};

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    refetchOnMountOrArgChange: true,
    endpoints: builder => ({
        // Authorization
        dataLogin: builder.mutation({
            query: data => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
        }),
        
        getUser: builder.query({
            query: () => '/user',
        }),
    }),
});

export const {
    // auth
    useDataLoginMutation,
    useGetUserQuery,
} = apiSlice;

export default apiSlice;