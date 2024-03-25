import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../../components/search/search.component";
import Loading from "../../components/loading/loading.component";
import Pagination from "../../components/pagination/pagination.component";
import { useDeleteCustomerMutation, useGetCustomersQuery } from "../../redux/api/customer.api.slice";


const Customer = () => {
  const { search, page } = useSelector(state => state.filters);
  const { data } = useGetCustomersQuery({ search, page });
  
  let dataCustomers;
  let totalPages;

  if (data) {
    dataCustomers = data.paginatedCustomers;
    totalPages = data.totalPages;
  }

  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleDeleted = (id) => {
    const confirmDeleted = window.confirm(`Are you sure you want to delete id=${id}?`);
    if (confirmDeleted) {
      deleteCustomer(id);
      alert('Customer deleted');
    }
  }

  return (
    <div className="mx-24">
      <div className="w-full md:w-1/2 shadow p-2 rounded-lg bg-white">
        <div className="flex justify-between items-center ml-2 h-full ">
          <Search />
          <Link
            to="/customers/add"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-2xl inline"
          >
            Add Customer
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
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Group Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-20 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              dataCustomers?.map((cus) => (
                <tr
                  key={cus.id}
                  className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {cus.id}
                  </th>
                  <td className="px-6 py-4">{cus.cusname}</td>
                  <td className="px-6 py-4">{cus.groupname}</td>
                  <td className="px-6 py-4">{cus.phonenumber}</td>
                  <td className="px-6 py-4">{cus.email}</td>
                  <td className="px-6 py-4">{cus.address}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/customers/update/${cus.id}`}
                      className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDeleted(cus.id)}
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
        !dataCustomers ? <Loading /> : <Pagination page={page} totalPages={totalPages} />
      }
    </div>
  );
};

export default Customer;
