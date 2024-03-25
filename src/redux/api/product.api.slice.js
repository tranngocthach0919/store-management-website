import apiSlice from "./api.slice";

const productApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: ({ search, page }) => ({
                url: '/products',
                params: { search, page },
            }),
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
            }),
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body,
            })
        }),
        updateProduct: builder.mutation({
            query: (body) => ({
                url: `/products/${body.id}`,
                method: 'PATCH',
                body,
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const dispatchResult = dispatch(apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                    let data = [];
                    if (draft) {
                        data = draft.paginatedProducts;
                        const product = data.find(pro => pro.id === Number(args));
                        if (product) {
                            data.splice(data.indexOf(product), 1);
                        }
                    }
                }));
                try {
                    await queryFulfilled;
                } catch (err) {
                    dispatchResult.undo();
                }
            }
        }),
    })
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;