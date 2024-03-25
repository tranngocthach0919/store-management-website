import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
// import App from './App';
import Login from './pages/login/login.component';
import Home from './pages/home/home.component';
import Template from './components/template/template.component';
import Order from './pages/order/order.component';
import Product from './pages/product/product.component';
import Customer from './pages/customer/customer.component';
import Employee from './pages/employee/employee.component';
import Account from './pages/account/account.component';
import AddAccount from './pages/account/add-account/add-account.component';
import UpdateAccount from './pages/account/update-account/update-account.component';
import AddEmployee from './pages/employee/add-employee/add-employee.component';
import UpdateEmployee from './pages/employee/update-employee/update-employee.component';
import AddCustomer from './pages/customer/add-customer/add-customer.component';
import UpdateCustomer from './pages/customer/update-customer/update-customer.component';
import AddProduct from './pages/product/add-product/add-product.component';
import UpdateProduct from './pages/product/update-product/update-product.component';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Template />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/orders',
        element: <Order />
      },
      {
        path: '/products',
        element: <Product />
      },
      {
        path: '/employees',
        element: <Employee />
      },
      {
        path: '/customers',
        element: <Customer />
      },
      {
        path: '/accounts',
        element: <Account />
      }
    ]
  },
  {
    path: '/accounts/add',
    element: <AddAccount />
  },
  {
    path: '/accounts/update/:id',
    element: <UpdateAccount />
  },

  // Employees
  {
    path: '/employees/add',
    element: <AddEmployee />
  }
  ,
  {
    path: '/employees/update/:id',
    element: <UpdateEmployee />
  },
  // Customers
  {
    path: '/customers/add',
    element: <AddCustomer />
  }
  ,
  {
    path: '/customers/update/:id',
    element: <UpdateCustomer />
  },
  // Products
  {
    path: '/products/add',
    element: <AddProduct />
  },
  {
    path: '/products/update/:id',
    element: <UpdateProduct />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);