import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks

import Loading from "./Loading";
import { addUserPendingDeposit } from "../redux/features/UserSlice";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { HOST_URL } from "../utils/constant";
import axios from "axios";
import BackButton from "./BackButton";

const User_Pending_Deposit = () => {
  const [userId, setUserId] = useLocalStorage("authToken"); // 1 hour expiry

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Accessing userDepositPending from the Redux store
  const user_pending_deposit = useSelector(
    (store) => store.user.userPendingDeposit
  );

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
    fetchUserPendingDeposit();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Loading key={index} />
        ))}
      </div>
    );
  }

  // Render the machine cards once data is available
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        User Pending Deposit
      </h2>

      <BackButton />

      {user_pending_deposit && user_pending_deposit.length > 0 ? (
        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {user_pending_deposit.map((machine) => (
            <div
              className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              key={machine.machine_id}
            >
              <img
                src={machine.url}
                alt={machine.machine_name}
                className="w-full h-40 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h3 className="text-2xl font-bold mb-2">
                {machine.machine_name}
              </h3>
              <p className="text-lg text-gray-300 mb-1">
                Price: <span className="text-green-400">₹{machine.price}</span>
              </p>
              <p className="text-sm text-gray-400 mb-3">
                Valid for{" "}
                <span className="text-yellow-300">{machine.valid_days}</span>{" "}
                days
              </p>
              <p className="text-sm text-gray-400 mb-1">
                Interest Per Day: ₹
                {Math.round((machine.price * machine.interest_per_day) / 100)}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                Total Maturity Amount: ₹
                {((machine.price * machine.interest_per_day) / 100) *
                  machine.valid_days}
              </p>
              <button
                onClick={() => handleMachineClicked(machine.machine_id)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 w-full text-white font-semibold py-2 px-4 rounded transition"
              >
                Waiting For Approval
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          No pending deposits available.
        </p>
      )}
    </div>
  );
};

export default User_Pending_Deposit;
