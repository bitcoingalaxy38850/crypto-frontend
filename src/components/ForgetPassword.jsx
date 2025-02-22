import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HOST_URL } from "../utils/constant";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error("Please enter a valid Email Address");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `${HOST_URL}/email/forgot+password/${email}`
      );
      console.log(response.data);

      if (response.data) {
        toast.success("Password is sent to your Registered email address");
      } else {
        toast.error("Error: Unable to process your request.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error during request:", error);
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center md:p-0 p-6 items-center h-screen bg-gray-800">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-6 text-center">Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? "Submitting...." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
