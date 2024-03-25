import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../redux/api/order.api.slice";
import Search from "../../components/search/search.component";
import { useState } from "react";
import Loading from "../../components/loading/loading.component";
import Pagination from "../../components/pagination/pagination.component";
import { useUpdateStatusMutation } from "../../redux/api/order.api.slice";
import { useGetUserQuery } from "../../redux/api/api.slice";

const Order = () => {
    const [show, setShow] = useState(false);
    const [selectOrder, setSelectOrder] = useState(null);
    const { search, page } = useSelector(state => state.filters);
    const { data } = useGetOrdersQuery({ search, page });
    const { data: dataUser } = useGetUserQuery();
    let dataOrders;
    let totalPages;

    if (data) {
        dataOrders = data.paginatedOrders;
        totalPages = data.totalPages;
    }

    const [updateStatus] = useUpdateStatusMutation();

    const updateOrder = (id, event, adminConfirm) => {
        let status = event.target.value;
        console.log(status);
        updateStatus({ id, status, adminConfirm })
    }

    return (
        <>
            <div className="relative mx-24">
                <div className="w-full md:w-1/5 shadow p-2 rounded-lg bg-white">
                    <div className="flex justify-around items-center h-full">
                        <Search />
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Customer Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Admin Confirm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataOrders?.map(order => (
                                    <tr
                                        key={order.id}
                                        className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {order.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {order.cusname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.phonenumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                order.products.map(pro => (
                                                    <div key={pro.id}>
                                                        {pro.proname}
                                                        <span className="font-bold"> x {pro.quantity}</span>
                                                        </div>
                                                ))
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.totalCost}đ
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.adminConfirm ? order.adminConfirm : '...'}
                                        </td>
                                        <td className="px-3 py-4">  
                                            <span
                                                className={`
                                                w-full px-2 py-1 rounded-lg text-white font-medium text-xs uppercase 
                                                ${
                                                    order.status === 'pending' ? 'bg-yellow-500' :
                                                        order.status === 'confirmed' ? 'bg-blue-500' :
                                                            order.status === 'fulfilled' ? 'bg-green-500' : 'bg-red-500'
                                                    }
                                                `}
                                            >
                                                {order.status}
                                            </span> 
                                            <button
                                                onClick={() => {
                                                    setShow(true);
                                                    setSelectOrder(order.id);
                                                }}
                                                className="px-2 font-medium text-sm">
                                                Edit
                                            </button>
                                            {
                                                show && selectOrder === order.id && (
                                                    <div
                                                        className="absolute bg-gray-50">
                                                        <select
                                                            onChange={(event) => {
                                                                updateOrder(order.id, event, dataUser?.username);
                                                                setShow(false);
                                                            }}
                                                            style={{ top: 0, left: 0 }}
                                                        >
                                                            {/* <option value='pending'>Pending</option> */}
                                                            <option></option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value='fulfilled'>Fulfilled</option>
                                                            <option value='failed'>Failed</option>
                                                        </select>
                                                        <button onClick={() => {
                                                            setShow(false);
                                                            setSelectOrder(order.id);
                                                        }}>Cancel</button>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {
                    !dataOrders ? <Loading /> : <Pagination page={page} totalPages={totalPages} />
                }
            </div>
        </>
    );
}

export default Order;