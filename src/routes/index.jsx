import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import { createBrowserRouter } from "react-router-dom";
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import AuthLayout from '../layouts/AuthLayout';
import CartPage from '../pages/CartPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <LandingPage/>
            },
            {
                path: "/product/:id",
                element: <ProductPage/>
            },
            {
                path: "/cart",
                element: <CartPage/>
            }
        ]
    },
    {
        path: "/login",
        element: <AuthLayout/>,
        children: [
            {
                path: "/login",
                element: <LoginPage/>
            }
        ]
    }
]);
export default router;
