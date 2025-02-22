import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import { HOST_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { addUserPendingDeposit } from "../redux/features/UserSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";

const Layout = ({ children }) => {
  const [userId, setUserId] = useLocalStorage("authToken"); // 1 day expiry
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserPendingDeposit = async () => {
      const user_pending_deposit_API = `${HOST_URL}/pending+request/getsingleuser+pendingmachine/${userId}`;

      try {
        const response = await axios.get(user_pending_deposit_API);

        dispatch(addUserPendingDeposit(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (!userId) {
      navigate("/login");
    } else {
      fetchUserPendingDeposit();
    }
  }, []);
  return (
    <main className="relative ">
      <div className="flex">
        <Sidebar /> {/* Sidebar Component */}
        <section className="flex  w-full bg-[#161925]  flex-1 flex-col px-4 py-10  lg:pt-10 pt-5  max-md:pb-14  md:px-14">
          <div className="w-full">
            {/* Render dynamic children (like MachineListing or other content) */}
            {children}
          </div>
        </section>
        <MobileNav />
      </div>
    </main>
  );
};

export default Layout;
