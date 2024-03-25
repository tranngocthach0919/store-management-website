import { NavLink, Outlet } from "react-router-dom";
import Header from "../header/header.component";
import Logo from "../logo/logo.component";
import User from "../user/user.component";
import { useGetUserQuery } from "../../redux/api/api.slice";
import { menu } from "../sidebar/sidebar.component";
import { roles } from "../../constants/auth-constant";
import { useDispatch } from "react-redux";
import { setPage, setSearch } from "../../redux/filters/filters.slice";

const Template = () => {
  const { data } = useGetUserQuery();
  const dispatch = useDispatch();
  let auth = [...menu];
  if (data?.role === roles.admin) {
    auth = auth.filter(menu => menu.role === roles.admin || roles.user);
  }

  if (data?.role === roles.user) {
    auth = auth.filter(menu => menu.role === roles.user);
  }

  const handleNavigate = () => {
    dispatch(setSearch(""));
    dispatch(setPage(1));
  }

  return (
    <>
      <div className="flex">
        <div className="flex h-screen p-3 bg-white shadow w-52">
          <div className="">
            <div className="flex flex-col justify-between items-center h-full">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <Logo />
                {
                  auth.map(menu => (
                    <li className="rounded-sm" key={menu.id}>
                      <NavLink
                        to={menu.link}
                        onClick={handleNavigate}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-2 space-x-3 rounded-md bg-gray-200 w-full"
                            : "flex items-center p-2 space-x-3 rounded-md"
                        }
                      >
                        {menu.icon}
                        <span>{menu.label}</span>
                      </NavLink>
                    </li>
                  ))}
              </ul>
              <div className="flex flex-col justify-end">
                <User dataUser={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Header dataUser={data} />
          <div className="mx-auto mt-12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
