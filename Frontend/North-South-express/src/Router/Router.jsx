import {
    createBrowserRouter,


} from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import Homepage from "../pages/Homepage/Homepage/Homepage";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import Deshboard from "../Dehoboard/Deshboard/Deshboard";


import BookParcel from "../Dehoboard/UserSite/BookParcel/BookParcel";
import MyParcels from "../Dehoboard/UserSite/MyParcels/MyParcels";
import UpdateParcle from "../Dehoboard/UserSite/UpdateParcle/UpdateParcle";
import UpdateProfile from "../Dehoboard/UserSite/UpdateProfile/UpdateProfile";
import AllDeliveryMen from "../Dehoboard/AdminSite/AllDeliveryMen/AllDeliveryMen";
import AllUsers from "../Dehoboard/AdminSite/AllUsers/AllUsers";
import AllParcels from "../Dehoboard/AdminSite/AllParcel/AllParcels";
import AdminHome from "../Dehoboard/AdminSite/AdminHome/AdminHome";
import DeliveryList from "../Dehoboard/DeliverySite/DeliveryList/DeliveryList";
import MyReviews from "../Dehoboard/DeliverySite/MyReviews/MyReviews";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import AdminRouter from "./AdminRouter/AdminRouter";
import DeliveryRouter from "./DeliveryRouter/DeliveryRouter";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts></MainLayouts>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>

            },
            {
                path:'signup',
                element:   <Signup></Signup>
            },
            {
                path:'login',
                element:<Login></Login>
            }
        ]

    },
    {
        path: '/deshboard',
        element: <Deshboard></Deshboard>,
        children: [
            // user
            {
                path: 'bookparcel',
                element: <PrivateRouter><BookParcel></BookParcel></PrivateRouter>
            },
            {
                path: 'myparcels',
                element: <PrivateRouter><MyParcels></MyParcels></PrivateRouter>
            },
            {
                path: 'updateparcle/:id',
                element: <PrivateRouter> <UpdateParcle></UpdateParcle></PrivateRouter>,
                loader: ({params}) => fetch(`https://north-south-express-render.onrender.com/parcel/${params.id}`)
            },
            
            
            {
                path: 'updateprofile',
                element: <PrivateRouter><UpdateProfile></UpdateProfile></PrivateRouter>
            },

            // admin 
            {
                path: 'adminHome',
                element: <PrivateRouter><AdminRouter><AdminHome></AdminHome></AdminRouter></PrivateRouter>
            },
            {
                path: 'alldeliverymen',
                element: <PrivateRouter><AdminRouter><AllDeliveryMen></AllDeliveryMen></AdminRouter></PrivateRouter>
            },
            {
                path: 'AllUsers',
                element: <PrivateRouter><AdminRouter><AllUsers></AllUsers></AdminRouter></PrivateRouter>
            },
            {
                path: 'AllParcels',
                element: <PrivateRouter> <AdminRouter><AllParcels></AllParcels></AdminRouter></PrivateRouter>
            },
            // delivery
            {
                path: 'deliveryList',
                element: <PrivateRouter> <DeliveryRouter><DeliveryList></DeliveryList></DeliveryRouter></PrivateRouter>
            },
            {
                path: 'myreviews',
                element: <PrivateRouter><DeliveryRouter><MyReviews></MyReviews></DeliveryRouter></PrivateRouter>
            },
        ]
    }
])


    



export default router