import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";

import Machine_Listing from "./components/Machine_Listing";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import Deposit from "./components/Deposit";
import WithDrawal from "./components/WithDrawal";
import Referral from "./components/Referral";
import BuyMachine from "./components/BuyMachine";
import ProtectedRoute from "./components/Protected_Route";
import Admin from "./components/Admin/Admin";
import { useEffect } from "react";

import useLocalStorage from "./utils/hooks/useLocalStorage";
import { addUser, addUserPendingDeposit } from "./redux/features/UserSlice";
import { HOST_URL } from "./utils/constant";
import axios from "axios";
import Pending_Deposit from "./components/pages/Pending_Deposit";
import Approved_Deposit from "./components/pages/Approved_Deposit";
import Pending_Withdrawal from "./components/pages/Pending_Withdrawal";
import Approved_Withdrawal from "./components/pages/Approved_Withdrawal";
import Create_Qrcode from "./components/Admin/Actions/Create_Qrcode";
import View_Qrcode from "./components/Admin/Actions/View_Qrcode";
import Create_Machine from "./components/Admin/Actions/Create_Machine";
import View_Machine from "./components/Admin/Actions/View_Machine";

import User_Pending_Deposit from "./components/User_Pending_Despoit";
import { Toaster } from "react-hot-toast";
import Video_Section from "./components/Video_Section";
import NotFound from "./components/NotFound";
import Privacy_Policy from "./components/Privacy_Policy";
import Transaction from "./components/Transaction";
import Terms from "./components/Terms";
import ScrollToTop from "./components/ScrollToTop";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const [userId] = useLocalStorage("authToken");

  const dispatch = useDispatch();

  useEffect(() => {
    const userApiUrl = `${HOST_URL}/user/getSingleUser/${userId}`;
    const user_pending_deposit_API = `${HOST_URL}/pending+request/getsingleuser+pendingmachine/${userId}`;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(userApiUrl);
        dispatch(addUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserPendingDeposit = async () => {
      try {
        const response = await axios.get(user_pending_deposit_API);

        dispatch(addUserPendingDeposit(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPendingDeposit();

    fetchUserDetails();
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <Outlet /> {/* This renders the child routes */}
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <LandingPage />,
          errorElement: <NotFound />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/machine_listing",
          element: (
            <Layout>
              <Machine_Listing />
            </Layout>
          ),
        },
        {
          path: "/profile",
          element: (
            <Layout>
              <Profile />
            </Layout>
          ),
        },
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdrawal",
          element: <WithDrawal />,
        },
        {
          path: "/transaction",
          element: (
            <Layout>
              <Transaction />
            </Layout>
          ),
        },
        {
          path: "/referral",
          element: <Referral />,
          errorElement: <NotFound />,
        },
        {
          path: "/admin",
          element: (
            <ProtectedRoute role="CARTEL">
              {" "}
              {/* Only allow 'CARTEL' role to access */}
              <Layout>
                <Admin /> {/* Admin page content */}
              </Layout>
            </ProtectedRoute>
          ),
        },
        {
          path: "/buy_machine/:machine_id",
          element: <BuyMachine />,
        },
        {
          path: "/approved_deposit",
          element: <Approved_Deposit />,
        },
        {
          path: "/pending_deposit",
          element: <Pending_Deposit />,
        },
        {
          path: "/pending_withdrawal",
          element: <Pending_Withdrawal />,
        },
        {
          path: "/approved_withdrawal",
          element: <Approved_Withdrawal />,
        },
        {
          path: "/forget_password",
          element: <ForgetPassword />,
        },
        {
          path: "/create_qrcode",
          element: <Create_Qrcode />,
        },
        {
          path: "/view_qrcode",
          element: <View_Qrcode />,
        },
        {
          path: "/create_machine",
          element: <Create_Machine />,
        },
        {
          path: "/view_machine",
          element: <View_Machine />,
        },
        {
          path: "/user_pending_deposit",
          element: <User_Pending_Deposit />,
        },
        {
          path: "/video_section",
          element: (
            <Layout>
              <Video_Section />
            </Layout>
          ),
        },
        {
          path: "/Privacy_Policy",
          element: <Privacy_Policy />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;
