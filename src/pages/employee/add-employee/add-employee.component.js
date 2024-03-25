import { useForm } from "react-hook-form";
import { useAddEmployeeMutation } from "../../../redux/api/employee.api.slice";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();
    const [addEmployee] = useAddEmployeeMutation();

    const handleCreate = () => {
        let body = { ...getValues() };
        if (isValid) {
            addEmployee(body)
                .unwrap()
                .then(() => {
                    navigate('/employees');
                    alert('Employee created');
                })
                .catch(() => alert('Failed to add employee'));
        }
    }

    const onSubmit = data => console.log(data);

   return (
        <div className="">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Add Employee</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="fullname"
                                                id="fullname"
                                                {...register("fullname",
                                                    {
                                                        required: "This field cannot be left blank!"
                                                    })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="Tran Van A"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.fullname?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>Email Address</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                {...register("email", {
                                                    required: "This field cannot be left blank!",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                        message: 'Please enter email valid'
                                                    },
                                                })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="email@domain.com"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.email?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Position</label>
                                            <select
                                                {...register("position", {
                                                    required: "This field must not be omitted"
                                                })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600">
                                                <option defaultValue></option>
                                                <option value="manager">Manager</option>
                                                <option value="staff">Staff</option>
                                            </select>
                                            <p className="text-red-500 text-xs">
                                                {errors.position?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                {...register("address", { required: "This field cannot be left blank!" })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="HCM City"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.address?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Phone Number</label>
                                            <input
                                                type="text"
                                                name="phonenumber"
                                                id="phonenumber"
                                                {...register("phonenumber", { 
                                                    required: "This field cannot be left blank!",
                                                    minLength: {
                                                        value: 10,
                                                        message: "This input must exceed 10 characters"
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: "This input must not exceed 10 characters"
                                                    }, 
                                                })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="+84"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.phonenumber?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    onClick={() => navigate('/employees')}
                                                    className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 mx-5 rounded">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleCreate}
                                                    type="submit"
                                                    className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded">
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
