import { roles } from "../../constants/auth-constant";
import { AccountIcon, CustomerIcon, EmployeeIcon, HomeIcon, OrderIcon, ProductIcon } from "../icon/icon.component";

export const menu = [
    {
        id: 1,
        link: '/',
        icon: <HomeIcon />,
        label: 'Home',
        role: roles.user,
    },
    {
        id: 2,
        link: '/orders',
        icon: <OrderIcon />,
        label: 'Orders',
        role: roles.user,
    },
    {
        id: 3,
        link: '/products',
        icon: <ProductIcon />,
        label: 'Products',
        role: roles.user,
    },
    {
        id: 4,
        link: '/employees',
        icon: <EmployeeIcon />,
        label: 'Employees',
        role: roles.admin,
    },
    {
        id: 5,
        link: '/customers',
        icon: <CustomerIcon />,
        label: 'Customers',
        role: roles.user,
    },
    {
        id: 6,
        link: '/accounts',
        icon: <AccountIcon />,
        label: 'Accounts',
        role: roles.admin,
    },
];