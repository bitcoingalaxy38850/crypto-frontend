import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { HOST_URL } from "../utils/constant";
import { Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../redux/features/UserSlice";
import LoadingIcon from "./LoadingIcon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null); // To store the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showModal, setShowModal] = useState(false);
  const [userId] = useLocalStorage("authToken"); // 1 day expiry
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_data = useSelector((store) => store.user.userInfo);
  const [flag, setFlag] = useState(false);

  const userApiUrl = `${HOST_URL}/user/getuser+basic+details/${userId}`;

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(userApiUrl);

        setUser(response.data); // Populate user data
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    if (!userId) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, []);

  const handleUpdate = async (updatedData) => {
      console.log("user" , user.user_id);
      
    
    const patchUrl = `${HOST_URL}/user/update+basicdata/${user.user_id}`; // Using user_id from the user object
    try {
      const response = await axios.patch(patchUrl, updatedData);

      console.log(response.data);
      

      // Optionally, update the local user state with the new data after successful update
      setUser(response.data);
      dispatch(updateUserInfo(response.data));

      // Provide success feedback to the user

      toast.success("Profile Updated Successfully");
      setFlag((prev) => !prev);

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error response:", error.response);
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    }
    
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(user.self_referral_code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Hide after 2 seconds
      })
      .catch((error) => {
        console.error("Error copying the referral code: ", error);
      });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon /> {/* Show loading icon while loading */}
      </div>
    );
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="mb-8  ">
      <div className="flex justify-center items-center">
        <div
          onClick={() => navigate("/referral")}
          className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg md:w-1/2   rounded-lg p-6 flex  items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <h3 className="text-xl text-white font-semibold mb-4">
            Referral Section{" "}
          </h3>
        </div>
      </div>

      <div className="p-6 bg-gray-800 mt-10 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl text-white font-bold mb-6 lg:text-center">
          Profile Information
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="mb-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Info
        </button>
        <div className="space-y-6 ">
          {/* General Info Section */}
          <section className="bg-gray-700 lg:p-6 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              General Information
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>First Name:</strong> {user.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {user.last_name}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phone_number}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <div className="flex items-center relative">
                <p className="mr-2">
                  <strong>Self Referral Code:</strong> {user.self_referral_code}
                </p>
                <button onClick={handleCopy} className="flex items-center">
                  <Copy className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-500 transition duration-200" />
                </button>
                {copySuccess && (
                  <div className="absolute bottom-5 left-16 bg-gray-300 text-black text-sm p-2 rounded-md shadow-lg transition-opacity duration-300 opacity-100">
                    Referral code copied!
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Bank Details Section */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Bank Details
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Bank Name:</strong> {user.bank_name || "Not Provided"}
              </p>
              <p>
                <strong>Account Number:</strong>{" "}
                {user.account_no || "Not Provided"}
              </p>
              <p>
                <strong>IFSC Code:</strong> {user.ifsc_code || "Not Provided"}
              </p>
              <p>
                <strong>UPI ID:</strong> {user.upi_id || "Not Provided"}
              </p>
              <p>
                <strong>Aadhaar Card:</strong>{" "}
                {user.aadhaar_number || "Not Provided"}
              </p>
              <p>
                <strong>PAN Card:</strong> {user.pan_card || "Not Provided"}
              </p>
            </div>
          </section>
        </div>

        {/* Modal for updating info */}
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
          handleUpdate={handleUpdate}
        />
      </div>
    </section>
  );
};

export default Profile;
