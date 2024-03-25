import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../redux/api/product.api.slice";
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();
    const [addProduct] = useAddProductMutation();

    const handleCreate = () => {
        let body = { ...getValues() };
        if (isValid) {
            addProduct(body)
                .unwrap()
                .then(() => {
                    navigate('/products');
                    alert('Product created');
                })
                .catch(() => alert('Failed to add product'));
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
                                    <p className="font-medium text-lg">Add Product</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-3">
                                            <label>Product Name</label>
                                            <input
                                                type="text"
                                                name="proname"
                                                id="proname"
                                                {...register("proname",
                                                    {
                                                        required: "This field cannot be left blank!"
                                                    })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="Tran Van A"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.proname?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label>Category</label>
                                            <input
                                                type="text"
                                                name="category"
                                                id="category"
                                                {...register("category",
                                                    {
                                                        required: "This field cannot be left blank!"
                                                    })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="brand..."
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.category?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label>Quantity</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                {...register("quantity",
                                                    {
                                                        required: "This field cannot be left blank!",
                                                        pattern: {
                                                            value: /\d+/,
                                                            message: "This input is number only."
                                                        },
                                                        min: {
                                                            value: 1,
                                                            message: "Value must be > 0"
                                                        }
                                                    })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="0"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.quantity?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Entry Price</label>
                                            <input
                                                type="text"
                                                name="entryprice"
                                                id="entryprice"
                                                {...register("entryprice", {
                                                    required: "This field cannot be left blank!",
                                                    pattern: {
                                                        value: /\d+/,
                                                        message: "This input is number only."
                                                    },
                                                    min: {
                                                        value: 1,
                                                        message: "Value must be > 0"
                                                    }
                                                })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="pink..."
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.entryprice?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label>Discount</label>
                                            <input
                                                type="number"
                                                name="discount"
                                                id="discount"
                                                {...register("discount",
                                                    {
                                                        required: "This field cannot be left blank!",
                                                        min: {
                                                            value: 0,
                                                            message: "Value must be >= 0"
                                                        }
                                                    })
                                                }
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="0"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.discount?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                {...register("price", {
                                                    required: "This field cannot be left blank!",
                                                    min: {
                                                        value: 1,
                                                        message: "Value must be > 0"
                                                    }
                                                })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="pink..."
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.price?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Color</label>
                                            <input
                                                type="text"
                                                name="color"
                                                id="color"
                                                {...register("color", {
                                                    required: "This field cannot be left blank!"
                                                })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="pink..."
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.color?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>Image</label>
                                            <input
                                                type="text"
                                                name="image"
                                                id="image"
                                                {...register("image", { required: "This field cannot be left blank!" })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="../../"
                                            />
                                            <p className="text-red-500 text-xs">
                                                {errors.image?.message}
                                            </p>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    onClick={() => navigate('/products')}
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

export default AddProduct;
