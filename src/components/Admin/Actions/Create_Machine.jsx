import React, { useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../../utils/constant";
import BackButton from "../../BackButton";

const Create_Machine = () => {
  const Create_Machine_API = `${HOST_URL}/display+machine/save+machine`;

  const [formData, setFormData] = useState({
    machine_name: "",
    price: "",
    valid_days: "",
    interest_per_day: "",
    url: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await axios.post(Create_Machine_API, formData);
      setSuccessMessage("Machine created successfully!");
      setFormData({
        machine_name: "",
        price: "",
        valid_days: "",
        interest_per_day: "",
        url: "",
      }); // Reset form
    } catch (error) {
      setErrorMessage("Error creating machine. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#161925] p-10 min-h-screen flex flex-col items-center justify-center">
      {/* Align BackButton */}
      <div className="w-full max-w-6xl">
        <BackButton />
      </div>

      {/* Form Container */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Machine</h2>

        <form onSubmit={handleSubmit}>
          {/* Machine Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Machine Name</label>
            <input
              type="text"
              name="machine_name"
              value={formData.machine_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Machine Name"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Price"
            />
          </div>

          {/* Valid Days */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Valid Days</label>
            <input
              type="number"
              name="valid_days"
              value={formData.valid_days}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Valid Days"
            />
          </div>

          {/* Interest Per Day (%) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Interest Per Day (%)</label>
            <input
              type="number"
              name="interest_per_day"
              value={formData.interest_per_day}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Interest Per Day"
            />
          </div>

          {/* Machine URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Machine URL</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter Machine URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Machine
          </button>

          {/* Success/Error Messages */}
          {successMessage && (
            <p className="mt-4 text-green-500 text-center font-semibold">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-500 text-center font-semibold">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Create_Machine;
