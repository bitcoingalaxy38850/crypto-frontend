import React, { useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../../utils/constant";
import BackButton from "../../BackButton";

const Create_Qrcode = () => {
  const [formData, setFormData] = useState({
    upi_id: "",
    owner_name: "",
    bank_name: "",
    qrcode_image: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Create_Qrcode_API = `${HOST_URL}/qrcode/save+qrcode`;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(Create_Qrcode_API, formData);
      setSuccessMessage("QR Code created successfully!");
      setFormData({
        upi_id: "",
        owner_name: "",
        bank_name: "",
        qrcode_image: "",
      }); // Reset form
    } catch (error) {
      setErrorMessage("Error creating QR Code. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#161925] p-10 min-h-screen flex flex-col items-center">
      {/* Align BackButton on the left side */}
      <div className="w-full max-w-6xl">
        <BackButton />
      </div>
    
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create QR Code
        </h2>

        <form onSubmit={handleSubmit}>
          {/* UPI ID */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              UPI ID
            </label>
            <input
              type="text"
              name="upi_id"
              value={formData.upi_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter UPI ID"
            />
          </div>

          {/* Owner Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Owner Name"
            />
          </div>

          {/* Bank Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Bank Name"
            />
          </div>

          {/* QR Code Image URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              QR Code Image URL
            </label>
            <input
              type="text"
              name="qrcode_image"
              value={formData.qrcode_image}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter QR Code Image URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create QR Code
          </button>

          {/* Success/Error Messages */}
          {successMessage && (
            <p className="mt-4 text-green-500 text-center font-semibold">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-500 text-center font-semibold">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Create_Qrcode;
