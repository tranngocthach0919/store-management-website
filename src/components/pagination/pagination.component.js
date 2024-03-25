import { useDispatch } from "react-redux";
import { setPage } from "../../redux/filters/filters.slice";

const Pagination = ({ page, totalPages }) => {
    const dispatch = useDispatch();

    return (
        <nav className="flex justify-around mt-2 mr-24">
            <ul className="flex items-center -space-x-px h-8 text-sm overflow-x-auto shadow-md sm:rounded-lg">
                <li>
                    <button
                        disabled={page === 1}
                        onClick={() => dispatch(setPage(page - 1))}
                        className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25 disabled:hover:bg-white">
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </button>
                </li>
                <li>
                    <button
                        disabled
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                        {page}
                    </button>
                </li>
                <li>
                    <button
                        disabled={page === totalPages}
                        onClick={() => dispatch(setPage(page + 1))}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25 disabled:hover:bg-white">
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
