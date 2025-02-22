import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { HOST_URL } from "../utils/constant";
import LoadingIcon from "./LoadingIcon";
import toast from "react-hot-toast";

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [userData, setUserData] = useState(null);
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user data and referral data
  const fetchUserData = async () => {
    if (!searchId.trim()) {
      toast.error("Please enter a valid User ID");
      return;
    }

    setLoading(true);
    setUserData(null);
    setReferralData(null);

    try {
      const userResponse = await axios.get(
        `${HOST_URL}/user/getSingleUser/${searchId}`
      );
      const referralResponse = await axios.get(
        `${HOST_URL}/user/getall+refferalusers/${searchId}`
      );
      setUserData(userResponse.data);
      setReferralData(referralResponse.data);
    
    } catch (error) {
      toast.error(`No user found with ID: ${searchId}`);
    } finally {
      setLoading(false);
    }
  };

  // Determine machine status based on end date
  const checkMachineStatus = (endDate) => {
    const currentDate = new Date();
    const machineEndDate = new Date(endDate);
    return currentDate > machineEndDate ? "Expired" : "Active";
  };

  // Reset modal state
  const resetModalState = () => {
    setIsModalOpen(false);
    setSearchId("");
    setUserData(null);
    setReferralData(null);
  };

  return (
    <div>
      {/* Main Button to Open Modal */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-800 cursor-pointer md:p-6 p-4 rounded-lg shadow-lg mb-6"
      >
        <h2 className="text-2xl font-semibold text-white">
          Click to Access User Information
        </h2>
      </div>

      {/* Modal for User Info */}
      <Modal open={isModalOpen} onClose={resetModalState}>
        <Box
          className="bg-gray-800 text-white p-6 rounded-lg w-11/12 md:w-3/5 mx-auto mt-10"
          sx={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Search User</h2>
            <button
              className="text-gray-400 hover:text-white"
              onClick={resetModalState}
            >
              ✖
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Enter User ID"
              className="p-2 border border-gray-600 rounded-md w-full bg-gray-700 text-white"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              onClick={fetchUserData}
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>

          {/* Loading State */}
          {loading && <LoadingIcon />}

          {/* User Data Display */}
          {userData ? (
            <div className="space-y-6">
              {/* Personal Details */}
              <div className="bg-gray-700 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">Personal Details</h3>
                <p>First Name: {userData.first_name}</p>
                <p>Last Name: {userData.last_name}</p>
                <p>Phone Number: {userData.phone_number}</p>
                <p>Email: {userData.email}</p>
                <p>Referral Code: {userData.self_referral_code}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">Bank Details Details</h3>
                <p>Bank Name: {userData.bank_name}</p>
                <p>IFSC Code: {userData.ifsc_code}</p>
                <p>Aadhaar Number: {userData.aadhaar_number}</p>
                <p>Pan card: {userData.pan_card}</p>
                <p>UPI ID: {userData.upi_id}</p>
                <p>Account Number: {userData.account_no}</p>
                <p>Date of Joining: {userData.joined_date}</p>
              </div>

              {/* Financial Summary */}
              <div className="bg-gray-700 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">Financial Summary</h3>
                <p>Total Deposit: ₹{userData.total_deposited_amount}</p>
                <p>Total Interest Earned: ₹{userData.total_interest_earned}</p>
                <p>Available to Withdraw: ₹{userData.available_to_withdraw}</p>
              </div>

              {/* Machines */}
              <div className="bg-gray-700 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">Machines</h3>
                {userData?.user_machines?.length > 0 ? (
                  userData.user_machines.map((machine) => (
                    <div
                      key={machine.id}
                      className="p-4 border border-gray-600 rounded-md flex md:flex-row items-center space-x-4 mb-4"
                    >
                      <img
                        src={machine.machine.url}
                        alt={machine.machine.machine_name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p>Name: {machine.machine.machine_name}</p>
                        <p>Price: ₹{machine.machine.price}</p>
                        <p>Start Date: {machine.machine.start_date}</p>
                        <p>End Date: {machine.machine.end_date}</p>
                        <p>
                          Status:{" "}
                          <span
                            className={
                              checkMachineStatus(machine.machine.end_date) ===
                              "Active"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {checkMachineStatus(machine.machine.end_date)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No machine data available.</p>
                )}
              </div>

              {/* Referral Details */}
              <div className="bg-gray-700 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">Referral Details</h3>
                <p>Total Referral Earned: ₹{userData.total__referral_earned}</p>
                <p>
                  Referral Available to Withdraw: ₹
                  {userData.referral_amount_withdraw}
                </p>

                {referralData && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Referred Users:</h4>
                    {referralData.map((referral) => (
                      <div
                        key={referral.id}
                        className="p-2 border rounded-md mt-2"
                      >
                        <p>Name: {referral.referred_username}</p>
                        <p>First Deposit: ₹{referral.first_deposit}</p>
                        <p>Referral Amount: ₹{referral.referral_amount}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>No Data found</div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UserInfo;
