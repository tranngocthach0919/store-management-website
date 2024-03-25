import apiSlice from "./api.slice";

const customerApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Customers
        getCustomers: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: ({ search, page }) => ({
                url: '/customers',
                params: { search, page },
            }),
        }),
        getCustomer: builder.query({
            query: (id) => ({
                url: `/customers/${id}`,
            }),
        }),
        addCustomer: builder.mutation({
            query: (body) => ({
                url: '/customers',
                method: 'POST',
                body,
            })
        }),
        updateCustomer: builder.mutation({
            query: (body) => ({
                url: `/customers/${body.id}`,
                method: 'PATCH',
                body,
            })
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const dispatchResult = dispatch(apiSlice.util.updateQueryData('getCustomers', undefined, draft => {
                    let data = [];
                    if (draft) {
                        data = draft.paginatedCustomers;
                        const customer = data.find(cus => cus.id === Number(args));
                        if (customer) {
                            data.splice(data.indexOf(customer), 1);
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
    }),
});

export const {
    // customers
    useGetCustomersQuery,
    useLazyGetCustomersQuery,
    useGetCustomerQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi;