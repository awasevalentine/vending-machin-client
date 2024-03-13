import { apiSlice } from "../../api/apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getProducts: builder.query({
            query: () => 'product/get-products',
            keepUnusedDataFor: 0,
            providesTags: ["Products"]
        }),
        getProductBySeller: builder.query({
            query: (sellerId) => `product/get-product-by-seller/${sellerId}`,
            keepUnusedDataFor: 0,
            providesTags: ["Products", "ProductBySeller"]
        }),
        addProduct: builder.mutation({
            query: productPayload =>({
                url: 'product/create-product',
                method: 'POST',
                body: {...productPayload}
            }),
            invalidatesTags: ["Products", "ProductBySeller"]
        }),
        updateProduct: builder.mutation({
            query: productPayload =>({
                url: `product/update-product/${productPayload.product_id}`,
                method: 'PUT',
                body: {...productPayload}
            }),
            invalidatesTags: ["Products", "ProductBySeller"]
        }),
        deleteProduct: builder.mutation({
            query: productId =>({
                url: `product/delete-product/${productId}`,
                method: 'Delete',
            }),
            invalidatesTags: ["Products", "ProductBySeller"]
        }),
        buyItems: builder.mutation({
            query: items =>({
                url: 'buy',
                method: 'POST',
                body: items
            }) 
        })
    })
})

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useGetProductBySellerQuery,
    useUpdateProductMutation,
    useBuyItemsMutation
} = productApiSlice