import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "../../redux/api/employee.api.slice";
import Search from "../../components/search/search.component";
import Loading from "../../components/loading/loading.component";
import Pagination from "../../components/pagination/pagination.component";

const Employee = () => {
  const { search, page } = useSelector((state) => state.filters);
  const query = { search, page };

  const { data } = useGetEmployeesQuery(query);
  let dataEmployees;
  let totalPages;

  if (data) {
    dataEmployees = data.paginatedEmployees;
    totalPages = data.totalPages;
  }

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDeleted = (id) => {
    const confirmDeleted = window.confirm(`Are you sure you want to delete id=${id}?`);
    if (confirmDeleted) {
      deleteEmployee(id);
      alert('Employee deleted');
    }
  }

  return (
    <>
      <div className="mx-24">
        <div className="w-full md:w-1/2 shadow p-2 rounded-lg bg-white">
          <div className="flex justify-between items-center ml-2 h-full ">
            <Search />
            <Link
              to="/employees/add"
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-2xl inline"
            >
              Add Employee
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
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
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
              {dataEmployees?.map((emp) => (
                <tr key={emp.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {emp.id}
                  </th>
                  <td className="px-6 py-4">{emp.fullname}</td>
                  <td className="px-6 py-4">{emp.position}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4">{emp.phonenumber}</td>
                  <td className="px-6 py-4">{emp.address}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/employees/update/${emp.id}`}
                      className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDeleted(emp.id)}
                      className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          !dataEmployees ? <Loading /> : <Pagination page={page} totalPages={totalPages} />
        }
      </div>
    </>
  );
};

export default Employee;
