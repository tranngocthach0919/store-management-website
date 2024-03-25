import { useForm } from "react-hook-form";
import { useAddAccountMutation } from "../../../redux/api/account.api.slice";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [addAccount] = useAddAccountMutation();

  const handleCreate = () => {
    let body = { ...getValues() };

    if (isValid) {
      addAccount(body)
        .unwrap()
        .then(() => {
          navigate("/accounts");
          alert("Account created");
        })
        .catch(() => alert("Failed to add account"));
    }
  };

  return (
    // <!-- Login -->
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Add Account</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    {...register("username", {
                      required: "Username is required!",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Please enter username valid",
                      },
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="username@domain.com"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.username?.message}
                  </p>
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required!",
                      minLength: {
                        value: 4,
                        message: "Password length must be >=4",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password length must be <=12",
                      },
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm", {
                      required: "PasswordConfirm is required!",
                      minLength: {
                        value: 4,
                        message: "PasswordConfirm length must be >=4",
                      },
                      maxLength: {
                        value: 12,
                        message: "PasswordConfirm length must be <=12",
                      },
                      validate: (value) => {
                        if (watch("password") !== value) {
                          return "Your passwords do not match";
                        }
                      },
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="PasswordConfirm"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.passwordConfirm?.message}
                  </p>
                  <label
                    htmlFor="passwordConfirm"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password Confirm
                  </label>
                </div>
                <div className="relative">
                  <select
                    id="underline_select"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-600 text-base"
                    {...register("role", {
                      required: "Select is required!",
                      validate: (value) => {
                        if (value === 'admin' || value === 'user') return;
                        return 'Invalid selection!';
                      }
                    })}
                  >
                    <option>Choose Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <p className="text-red-500 text-sm">{errors.role?.message}</p>
                </div>
                <div className="relative">
                <button
                    onClick={() => navigate('/accounts')}
                    className="bg-teal-700 text-white rounded-xl px-3 py-1 ml-8 hover:bg-teal-900">
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    className="bg-teal-700 text-white rounded-xl px-3 py-1 ml-2 hover:bg-teal-900 disabled:opacity-50"
                  >
                    Create
                  </button>
                  {/* <button
                    onClick={handleCreate}
                    className="bg-teal-700 text-white rounded-xl px-5 py-1 ml-[7rem] hover:bg-teal-900"
                  >
                    Create
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAccount;
