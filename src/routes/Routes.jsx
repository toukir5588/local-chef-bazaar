import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
// import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/ChefD/MyInventory'
import ManageOrders from '../pages/Dashboard/ChefD/ManageOrders'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import { createBrowserRouter } from 'react-router'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import SellerRequests from '../pages/Dashboard/Admin/ChefRequests'

import AdminRoute from './AdminRoute'
import ChefRoute from './ChefRoute'
import AddMeal from '../pages/Dashboard/ChefD/AddMeal'
import MealDetails from '../pages/MealDetails/MealDetails'
import MyFavorites from '../pages/Dashboard/Customer/MyFavorites'
import AllMeals from '../pages/AllMeals/AllMeals'
import AboutUs from '../pages/AboutUs/AboutUs'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-meal',
        element: <AllMeals />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/meal/:id',
        element: <MealDetails/>,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      // <PrivateRoute>
        <DashboardLayout />
      // </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          // <PrivateRoute>
            <Statistics />
          // </PrivateRoute>
        ),
      },
      {
        path: 'add-meals',
        element: (
          // <PrivateRoute>
            <ChefRoute>
              <AddMeal />
            </ChefRoute>
          // </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          // <PrivateRoute>
            <ChefRoute>
              <MyInventory />
             </ChefRoute>
          // </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          // <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          // </PrivateRoute>
        ),
      },
      {
        path: 'chef-requests',
        element: (
          // <PrivateRoute>
            <AdminRoute>
              <SellerRequests />
             </AdminRoute>
          // </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          // <PrivateRoute>
            <Profile />
          // </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          // <PrivateRoute>
            <MyOrders />
          // </PrivateRoute>
        ),
      },
      {
        path: 'my-favorites',
        element: (
          // <PrivateRoute>
            <MyFavorites />
          // </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          // <PrivateRoute>
            <ChefRoute>
              <ManageOrders />
            </ChefRoute>
          // </PrivateRoute>
        ),
      },
    ],
  },
])
