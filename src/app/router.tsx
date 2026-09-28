import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import CustomerDetailView from "../components/customers/CustomerDetailView";
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
                    },
                    {
                        path: "customers/:customerId",
                        element: <CustomerDetailView />
                    },
                ]
            }
        ]
    }
])