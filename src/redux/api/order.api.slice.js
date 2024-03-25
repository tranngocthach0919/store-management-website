import apiSlice from "./api.slice";

const orderApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: ({ search, page }) => ({
                url: '/orders',
                params: { search, page },
            }),
        }),
        updateStatus: builder.mutation({
            query: (body) => ({
                url: `/orders/${body.id}`,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { id, status, adminConfirm } = args;
                const dispatchResult = dispatch(apiSlice.util.updateQueryData('getOrders', undefined, draft => {
                    let data = [];
                    if (draft) {
                        data = draft.paginatedOrders;
                        const order = data.find(ord => ord.id === Number(id));
                        if (order) {
                            order.status = status;
                            order.adminConfirm = adminConfirm;
                        }
                    }
                }))
                try {
                    await queryFulfilled;
                } catch (err) {
                    dispatchResult.undo();
                }
            }
        })
    })
})

export const {
    useGetOrdersQuery,
    useUpdateStatusMutation,
} = orderApi;