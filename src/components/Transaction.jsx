import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalWithDraw";
import toast from "react-hot-toast";
import { HOST_URL } from "../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import useLocalStorage from "../utils/hooks/useLocalStorage";

const Transaction = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [userId] = useLocalStorage("authToken"); // 1 hour expiry
  const user_data = useSelector((store) => store.user.userInfo);
 
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [loading, setLoading] = useState(true); // Loading state
  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const getUrl = `${HOST_URL}/user/getSingleUser/${userId}`;
        const response = await axios.get(getUrl);

        setMachineData(response.data.user_machines);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    if (!userId) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [flag]);

  const handleButtonClicked = () => {
    if (
      user_data.ifsc_code &&
      user_data.bank_name &&
      user_data.account_no &&
      user_data.upi_id
    ) {
      setIsModalOpen(true);
    } else {
      toast.error(
        "Please Enter your Bank Information From your Profile Section"
      );
    }
  };

  const handleWithdraw = async (amount) => {
    const postUrl = `${HOST_URL}/user+withdrawal/save+pending+request`;

    const formData = {
      user_id: userId,
      withdrawal_amount: amount, // Cutting 10% from the original amount
      type: "INTEREST",
      is_success: false,
    };


    try {
      const response = await axios.post(postUrl, formData);

      if (response.data) {
        setFlag((prev) => !prev);
        toast.success(`Withdrawal of ${amount} initiated successfully!`);
      } else {
        toast.error(
          "Error in processing your withdrawal request. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while processing your withdrawal. Please try again later."
      );
    }

    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Total Deposit</h2>
          <p className="mt-4 text-lg">₹{userData.total_deposited_amount}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Total Interest Earned</h2>
          <p className="mt-4 text-lg">₹{userData.total_interest_earned}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Available to Withdraw</h2>
          <p className="mt-4 text-lg">₹{userData.available_to_withdraw}</p>
        </div>
      </div>
      <div className="flex mt-4 justify-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleButtonClicked}
        >
          Withdraw
        </button>
      </div>
      {/* Container for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deposit Card */}
        <div
          onClick={() => navigate("/deposit")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <h3 className="text-xl text-white font-semibold mb-4">
            Deposit Section{" "}
          </h3>
        </div>

        {/* Withdrawal Card */}
        <div
          onClick={() => navigate("/withdrawal")}
          className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <h3 className="text-xl text-white font-semibold mb-4">
            Withdrawal Section{" "}
          </h3>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onWithdraw={handleWithdraw}
        initialAmount={userData.available_to_withdraw}
      />
    </div>
  );
};

export default Transaction;
