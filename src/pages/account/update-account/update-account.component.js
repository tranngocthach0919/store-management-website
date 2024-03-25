import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAccountQuery, useUpdateAccountMutation } from "../../../redux/api/account.api.slice";


const UpdateAccount = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm();

  const onSubmit = data => console.log(data);

  const { data } = useGetAccountQuery(id);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { username, password, role } = data;
    setUsername(username);
    setOldPassword(password);
    setRole(role);
  }, [data]);

  const [updateAccount] = useUpdateAccountMutation();

  const handleUpdate = () => {
    const body = { id, ...getValues(), username }
    if (isValid) {
      try {
        updateAccount(body)
        navigate('/accounts')
        alert("Account Updated")
      } catch (err) {
        console.log(err);
        alert("Update Failed")
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Update Account</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    readOnly
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none read-only:text-gray-400"
                    placeholder="username@domain.com"
                  />
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
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    {...register("oldPassword", {
                      required: "oldPassword is required!",
                      minLength: {
                        value: 4,
                        message: "oldPassword length must be >=4",
                      },
                      maxLength: {
                        value: 12,
                        message: "oldPassword length must be <=12",
                      },
                      validate: (value) => {
                        if (value !== oldPassword) {
                          return "Your password is not correct!"
                        }
                      }
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Enter old password"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.oldPassword?.message}
                  </p>
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Old Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    {...register("password", {
                      required: "password is required!",
                      minLength: {
                        value: 4,
                        message: "password length must be >=4",
                      },
                      maxLength: {
                        value: 12,
                        message: "password length must be <=12",
                      },
                      onChange: (event) => setPassword(event.target.value),
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="PasswordConfirm"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    New Password
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
                      // onChange: (event) => setPasswordconfirm(event.target.value),
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
                    value={role}
                    {...register("role", {
                      required: "Select is required!",
                      onChange: (event) => setRole(event.target.value)
                    })}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.role?.message}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => navigate('/accounts')}
                    className="bg-teal-700 text-white rounded-xl px-3 py-1 ml-8 hover:bg-teal-900">
                    Cancel
                  </button>
                  <button
                    disabled={!isDirty}
                    onClick={handleUpdate}
                    className="bg-teal-700 text-white rounded-xl px-3 py-1 ml-2 hover:bg-teal-900 disabled:opacity-50 disabled:hover:bg-teal-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UpdateAccount;