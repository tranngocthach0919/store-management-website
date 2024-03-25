import { useGetDataDashboardQuery } from "../../redux/api/dashboard.api.slice";


const Home = () => {
    
    const { data } = useGetDataDashboardQuery();
    let totalUsers = data?.totalUsers;
    let totalOrders = data?.totalOrders;
    let totalProfit = data?.totalProfit;

    return (
        <div className="container mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 mx-4 lg:grid-cols-3">
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total users
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        {totalUsers}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total Profit
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        {totalProfit}
                    </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        {totalOrders}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;