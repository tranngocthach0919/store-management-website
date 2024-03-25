import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetCustomerQuery, useUpdateCustomerMutation } from '../../../redux/api/customer.api.slice';

const UpdateCustomer = () => {
    const { id } = useParams();
    const [cusname, setCusname] = useState("");
    const [groupname, setGroupname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm();

    const onSubmit = data => console.log(data);

    const { data } = useGetCustomerQuery(id);

    useEffect(() => {
        if (!data) {
            return;
        }
        console.log(data);
        const { cusname, groupname, phonenumber, email, address } = data;
        setCusname(cusname);
        setGroupname(groupname);
        setPhonenumber(phonenumber);
        setEmail(email);
        setAddress(address);
    }, [data]);

    const [updateCustomer] = useUpdateCustomerMutation();

    const handleUpdate = () => {
        const body = { id, ...getValues() };
        if (isValid) {
            updateCustomer(body)
                .unwrap()
                .then(() => {
                    navigate('/customers')
                    alert("Customer Updated")
                })
                .catch(() => alert("Update Failed"))
        }
    }

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
                                            <label>Cusomter Name</label>
                                            <input
                                                type="text"
                                                name="cusname"
                                                id="cusname"
                                                value={cusname}
                                                {...register("cusname",
                                                    {
                                                        required: cusname ? false : "This field cannot be left blank!",
                                                        onChange: (event) => setCusname(event.target.value), 
                                                    })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="Tran Van A"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.cusname?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>Email Address</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={email}
                                                {...register("email", {
                                                    required: email ? false : "This field cannot be left blank!",
                                                    onChange: (event) => setEmail(event.target.value),
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
                                            <label>Group Customer</label>
                                            <select
                                                value={groupname}
                                                {...register("groupname", {
                                                    required: groupname ? false : "This field must not be omitted",
                                                    onChange: (event) => setGroupname(event.target.value),
                                                })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600">
                                                <option value="group01">Loyah</option>
                                                <option value="group02">Potential</option>
                                                <option value="group03">Old</option>
                                            </select>
                                            <p className="text-red-500 text-xs">
                                                {errors.groupname?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                value={address}
                                                {...register("address", {
                                                    required: address ? false : "This field cannot be left blank!",
                                                    onChange: (event) => setAddress(event.target.value),
                                                })}
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
                                                value={phonenumber}
                                                {...register("phonenumber", {
                                                    required: phonenumber ? false : "This field cannot be left blank!",
                                                    minLength: {
                                                        value: 10,
                                                        message: "This input must exceed 10 characters"
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: "This input must not exceed 10 characters"
                                                    },
                                                    onChange: (event) => setPhonenumber(event.target.value),
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
                                                    onClick={() => navigate('/customers')}
                                                    className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 mx-5 rounded">
                                                    Cancel
                                                </button>
                                                <button
                                                disabled={!isDirty}
                                                    onClick={handleUpdate}
                                                    type="submit"
                                                    className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-teal-700">
                                                    Update
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

export default UpdateCustomer;