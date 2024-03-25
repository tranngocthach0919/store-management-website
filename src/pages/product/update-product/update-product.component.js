import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../../../redux/api/product.api.slice";


const UpdateProduct = () => {
    const { id } = useParams();
    const [proname, setProname] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [quantity, setQuantity] = useState('');
    const [entryprice, setEntryprice] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm();

    const onSubmit = data => console.log(data);

    const { data } = useGetProductQuery(id);
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
        if (!data) {
            return;
        }
        const { proname, category, color, quantity, entryprice, price, discount, image } = data;
        setProname(proname);
        setCategory(category);
        setColor(color);
        setQuantity(quantity);
        setEntryprice(entryprice);
        setPrice(price);
        setDiscount(discount);
        setImage(image);
    }, [data]);

    const handleUpdate = () => {
        const body = { id, ...getValues() };
        console.log(body);
        if (isValid) {
            updateProduct(body)
                .unwrap()
                .then(() => {
                    navigate('/products')
                    alert("Product Updated")
                })
                .catch(() => alert("Update Failed"))
        }
    };

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
                                        <div className="md:col-span-3">
                                            <label>Product Name</label>
                                            <input
                                                type="text"
                                                name="proname"
                                                id="proname"
                                                value={proname}
                                                {...register("proname",
                                                    {
                                                        required: proname ? false : "This field cannot be left blank!",
                                                        onChange: (event) => setProname(event.target.value)
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
                                                value={category}
                                                {...register("category",
                                                    {
                                                        required: category ? false : "This field cannot be left blank!",
                                                        onChange: (event) => setCategory(event.target.value),
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
                                                value={quantity}
                                                {...register("quantity",
                                                    {
                                                        required: quantity ? false : "This field cannot be left blank!",
                                                        onChange: (event) => setQuantity(event.target.value),
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
                                                type="number"
                                                name="entryprice"
                                                id="entryprice"
                                                value={entryprice}
                                                {...register("entryprice", {
                                                    required: entryprice ? false : "This field cannot be left blank!",
                                                    onChange: (event) => setEntryprice(event.target.value),
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
                                                value={discount}
                                                {...register("discount",
                                                    {
                                                        required: discount ? false : "This field cannot be left blank!",
                                                        onChange: (event) => setDiscount(event.target.value),
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
                                                value={price}
                                                {...register("price", {
                                                    required: price ? false : "This field cannot be left blank!",
                                                    onChange: (event) => setPrice(event.target.value),
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
                                                value={color}
                                                {...register("color", {
                                                    required: color ? false : "This field cannot be left blank!",
                                                    onChange: (event) => setColor(event.target.value)
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
                                                value={image}
                                                {...register("image", {
                                                    required: image ? false : "This field cannot be left blank!",
                                                    onChange: (event) => setImage(event.target.value)
                                                })}
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
                                                    className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 mx-6 rounded">
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

export default UpdateProduct;