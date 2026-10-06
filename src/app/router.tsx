import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import CustomerDetailView from "../components/customers/customer_details/CustomerDetailView";
import Orders from "../pages/Orders";
import OrderDetailView from "../components/orders/order_details/OrderDetailView";
import AddOrderModal from "../components/orders/AddOrderModal";
import AddCustomerModal from "../components/customers/AddCustomerModal";
// import AddCustomerModal from "../components/customers/AddCustomerModal";



export const router = createBrowserRouter([

    {
        index: true,
        element: <Navigate to="/login" replace />
    },

    {
        path: "/login",
        element: <Login />
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout/>,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "customers",
                        element: <Customers />,
                        children: [
                            {
                                path: "create",
                                element: <AddCustomerModal />
                            }
                        ]
                    },
                    {
                        path: "customers/:customerId",
                        element: <CustomerDetailView />
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                        children: [
                            {
                                path: "create",
                                element: <AddOrderModal />
                            },
                        ]
                    },
                    {
                        path: "orders/:orderNumber",
                        element: <OrderDetailView />
                    }
                ]
            }
        ]
    }
])