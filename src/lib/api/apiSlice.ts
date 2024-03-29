import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8083/api/',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.access_token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["Products", "ProductBySeller"],
    endpoints: builder => ({})
})