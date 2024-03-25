import apiSlice from "./api.slice";

const employeeApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Employees
        getEmployees: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: ({ search, page }) => ({
                url: '/employees',
                params: { search, page },
            }),
        }),
        getEmployee: builder.query({
            query: (id) => ({
                url: `/employees/${id}`,
            }),
        }),
        addEmployee: builder.mutation({
            query: (body) => ({
                url: '/employees',
                method: 'POST',
                body,
            })
        }),
        updateEmployee: builder.mutation({
            query: (body) => ({
                url: `/employees/${body.id}`,
                method: 'PATCH',
                body,
            })
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const dispatchResult = dispatch(apiSlice.util.updateQueryData('getEmployees', undefined, draft => {
                    let data = [];
                    if (draft) {
                        data = draft.paginatedEmployees;
                        const employee = data.find(emp => emp.id === Number(args));
                        if (employee) {
                            data.splice(data.indexOf(employee), 1);
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

export const { // employees
    useGetEmployeesQuery,
    useLazyGetEmployeesQuery,
    useGetEmployeeQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation, } = employeeApi;