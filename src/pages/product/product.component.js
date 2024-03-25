import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/api/product.api.slice";
import Search from "../../components/search/search.component";
import Loading from "../../components/loading/loading.component";
import Pagination from "../../components/pagination/pagination.component";

const Product = () => {
    const { search, page } = useSelector((state) => state.filters);

    const { data } = useGetProductsQuery({ search, page });
    let dataProducts;
    let totalPages;

    if (data) {
        dataProducts = data.paginatedProducts;
        totalPages = data.totalPages;
    }

    const [deleteProduct] = useDeleteProductMutation();

    const handleDeleted = (id) => {
        const confirmDeleted = window.confirm(`Are you sure you want to delete id=${id}?`);
        if (confirmDeleted) {
            deleteProduct(id);
            alert('Employee deleted');
        }
    }
    return (
        <div className="mx-24">
            <div className="w-full md:w-1/2 shadow p-2 rounded-lg bg-white">
                <div className="flex justify-between items-center ml-2 h-full ">
                    <Search />
                    <Link
                        to="/products/add"
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-2xl inline"
                    >
                        Add Product
                    </Link>
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
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Entry price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sale price
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Image
                            </th>
                            <th scope="col" className="px-20 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataProducts?.map(pro => (
                                <tr
                                    key={pro.id}
                                    className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {pro.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pro.proname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.color}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {pro.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.entryprice}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.saleprice} (-{pro.discount}%)
                                    </td>
                                    <td className="px-6 py-4">
                                        <img 
                                        src={pro.image} 
                                        alt=""
                                        className="w-11 h-11"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/products/update/${pro.id}`}
                                            className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            onClick={() => handleDeleted(pro.id)}
                                            className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                !dataProducts ? <Loading /> : <Pagination page={page} totalPages={totalPages} />
            }
        </div>
    );
};

export default Product;