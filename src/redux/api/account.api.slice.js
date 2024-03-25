import apiSlice from "./api.slice";

const accountApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccounts: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: ({ search, page }) => ({
                url: '/accounts',
                params: { search, page },
            }),
        }),
        getAccount: builder.query({
            query: (id) => ({
                url: `/accounts/${id}`,
            }),
        }),
        addAccount: builder.mutation({
            query: (body) => ({
                url: '/accounts',
                method: 'POST',
                body,
            })
        }),
        updateAccount: builder.mutation({
            query: (body) => ({
                url: `/accounts/${body.id}`,
                method: 'PATCH',
                body,
            })
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/accounts/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const dispatchResult = dispatch(apiSlice.util.updateQueryData('getAccounts', undefined, draft => {
                    let data = [];
                    if (draft) {
                        data = draft.paginatedAccounts;
                        const account = data.find(acc => acc.id === Number(args));
                        if (account) {
                            data.splice(data.indexOf(account), 1);
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
})

export const {
 useGetAccountsQuery,
 useGetAccountQuery,
 useAddAccountMutation,
 useUpdateAccountMutation,
 useDeleteAccountMutation,
} = accountApi;