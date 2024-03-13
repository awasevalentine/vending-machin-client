import { apiSlice } from "../../api/apiSlice";


const depositSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        deposit: builder.mutation({
            query: payload => ({
                url: 'deposit',
                method: 'POST',
                body: payload
            })
        }),

        // getBalance: builder.query({
        //     query: =>
        // })
    })
})

export const {
    useDepositMutation
} = depositSlice