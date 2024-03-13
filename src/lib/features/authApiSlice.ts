import { apiSlice } from "../api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: payload => ({
                url: 'user/create-user',
                method: 'POST',
                body: { ...payload }
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: 'user/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ["Products", "ProductBySeller"]
        }),
        getLoginStatus: builder.query({
            query: ({username})=> `user/user-login-status/${username}`,
            keepUnusedDataFor: 5,
            providesTags: ["Products", "ProductBySeller"]
        }),

        changeLoginStatus: builder.mutation({
            query: username => ({
                url: `user/update-user-login-false/${username}`,
                method: 'POST',
                body: {...username}
            }),
            invalidatesTags: ["Products", "ProductBySeller"]
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetLoginStatusQuery,
    useChangeLoginStatusMutation
} = authApiSlice