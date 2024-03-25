import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../../components/search/search.component";
import { useDeleteAccountMutation, useGetAccountsQuery } from "../../redux/api/account.api.slice";
import Loading from "../../components/loading/loading.component";
import Pagination from "../../components/pagination/pagination.component";

const Account = () => {
  const { search, page } = useSelector((state) => state.filters);
  const query = { search, page };

  const { data } = useGetAccountsQuery(query);
  let dataAccounts;
  let totalPages;

  if (data) {
    dataAccounts = data.paginatedAccounts;
    totalPages = data.totalPages;
  }

  const [deleteAccount] = useDeleteAccountMutation();

  const handleDeleted = (id) => {
    const confirmDeleted = window.confirm(`Are you sure you want to delete id=${id}?`);
    if (confirmDeleted) {
      deleteAccount(id);
      alert('Account deleted');
    }
  }

  return (
    <div className="mx-24">
      <div className="w-full md:w-1/2 shadow p-2 rounded-lg bg-white">
        <div className="flex justify-between items-center ml-2 h-full ">
          <Search />
          <Link
            to="/accounts/add"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-2xl inline"
          >
            Add Account
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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-20 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              dataAccounts?.map(acc =>
                <tr
                  key={acc.id}
                  className="bg-white border-b" >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {acc.id}
                  </th>
                  <td className="px-6 py-4">{acc.username}</td>
                  <td className="px-6 py-4">
                    <input
                      type="password"
                      value={acc.password}
                      disabled
                      className="bg-white"
                    />
                  </td>
                  <td className="px-6 py-4">{acc.role}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/accounts/update/${acc.id}`}
                      className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDeleted(acc.id)}
                      className="font-medium bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 mb-3 rounded-2xl"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {
        !dataAccounts ? <Loading /> : <Pagination page={page} totalPages={totalPages} />
      }
    </div>
  );
};

export default Account;
