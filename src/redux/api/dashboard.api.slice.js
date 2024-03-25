import apiSlice from "./api.slice";

const dashboardApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Dashboard
        getDataDashboard: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: () => ({
                url: '/dashboard',
            }),
        }),
    }),
});

export const {
    useGetDataDashboardQuery,
} = dashboardApi;