import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataLoginMutation } from "../../redux/api/api.slice";
import { token } from "../../constants/auth-constant";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);
    const [dataLogin] = useDataLoginMutation();

    const getDataLogin = () => {
        const { email, password } = getValues();
        dataLogin({ email, password })
            .unwrap()
            .then((data) => {
                localStorage.setItem(token, JSON.stringify(data.accessToken));
                navigate('/');
                alert('Login successfully');
            })
            .catch((err) => {
                console.log('error: ', err);
                alert('Login failed, please try again!');
            });
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
                            <h1 className="text-2xl font-semibold">Sign in</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="email"
                                        name="email"
                                        type="text"
                                        {...register("email", {
                                            required: "Email is required!",
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: 'Please enter email valid'
                                            },
                                        })}
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Email address"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.email?.message}
                                    </p>
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Email
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
                                                message: 'Password length must be >=4',
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: 'Password length must be <=12',
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
                                    <button
                                        type="submit"
                                        onClick={getDataLogin}
                                        className="bg-teal-700 text-white rounded-xl px-5 py-1 hover:bg-teal-900"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
