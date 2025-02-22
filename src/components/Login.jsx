import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";
import { HOST_URL } from "../utils/constant";
import axios from "axios"; // Import axios at the top of your file
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/UserSlice";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import toast from "react-hot-toast";

import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [token, setToken] = useLocalStorage("authToken"); // 1 day expiry
  const [showText, setShowText] = useState("");
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const referral = searchParams.get("referral");
    if (referral && !isSignIn) {
      setReferralCode(referral); // Set local state with the referral code
    }
  }, [searchParams, isSignIn]);

  // Toggle between Sign In and Sign Up
  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
  };

  // toggle password visiblity

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // Form initial values
  const initialValues = {
    first_name: isSignIn ? "" : "",
    last_name: isSignIn ? "" : "",
    email: isSignIn ? "" : "",
    password: "",
    phone_number: "",
    terms: false,
    invited_referral_code: !isSignIn ? referralCode : null,
  };

  // Form validation schema
  const validationSchema = Yup.object({
    email: !isSignIn
      ? Yup.string()
          .email("Invalid email address")
          .required("Email is required")
      : null,
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    first_name: !isSignIn
      ? Yup.string().required("First Name is required")
      : null,

    invited_referral_code: !isSignIn
      ? Yup.string().min(5, "Referral Must be 5 Character ").nullable()
      : null, // referral code

    last_name: !isSignIn
      ? Yup.string().required("Last Name is required")
      : null, // Only require 'name' for sign-up form
      phone_number: Yup.string()
      .required("Phone Number is required")
      .test('not-start-with-zero', 'Phone Number cannot start with 0', value => {
        // Check if the value exists and doesn't start with '0'
        return value && !value.startsWith('0');
      })
      .matches(/^[1-9][0-9]{9}$/, "Phone Number must be exactly 10 digits and contain only numbers"),

    terms: !isSignIn
      ? Yup.boolean()
          .oneOf([true], "You must accept the terms and conditions")
          .required("You must accept the terms and conditions")
      : null,
    // Only require 'name' for sign-up form
  });

  // Handle form submission
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { terms, ...formData } = values;

    // If user is signing up
    if (!isSignIn) {
      setSubmitting(true);
      const postUrl = `${HOST_URL}/user/save+user`; // Ensure URL is correct

      try {
        // Check if referral code is provided
        if (formData.invited_referral_code) {
          const checkReferral = await axios.get(
            `${HOST_URL}/user/getvalid+referralcode/${formData.invited_referral_code}`
          );

          if (checkReferral.data) {
            setShowText("Correct Referral");

            // Proceed with registration
            await axios.post(postUrl, formData);

            setIsSignIn(true);
            toast.success("You have successfully registered");
          } else {
            setShowText("Incorrect Referral");
            toast.error("Please enter a correct referral code.");
          }
        } else {
          if (!formData.invited_referral_code) {
            formData.invited_referral_code = null; // Remove the field
          }

          await axios.post(postUrl, formData);

          setIsSignIn(true);
          toast.success("You have successfully registered");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Email or Phone number already exist");
      } finally {
        setSubmitting(false); // Always set submitting to false once the request is completed
      }
    } else {
      try {
        const phone = parseInt(values.phone_number);

        const getUrl = `${HOST_URL}/user/getSingleUserByNumber/${phone}`;

        // Send GET request to fetch user data by phone number
        const response = await axios.get(getUrl);

        if (
          values.password === response.data.password &&
          phone === response.data.phone_number
        ) {
          const user_id = response.data.user_id;
          dispatch(addUser(response.data));
          toast.success("You have Logged in Successfully");

          navigate("/machine_listing");

          // Save the user_id in localStorage for 1 hour
          setToken(user_id);
        } else {
          setSubmitting(false);
          toast.error("Credentials Incorrect");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        // Handle error, e.g., display an error message
        // Example: toast.error("Login failed!");
        toast.error("Credentials Incorrect");
      } finally {
        setSubmitting(false); // Ensure to stop submitting after request
      }
    }
  };

  useEffect(() => {
    if (token) {
      // If token exists and is valid, redirect to /machine_listing
      navigate("/machine_listing");
    }
  }, [token, navigate]);

  return (
    <div className="relative py-10  w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Images/building.jpg"
          alt="background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-45"></div>
      </div>
      <div className="flex items-center justify-center h-full relative p-4">
        <div className="bg-[#271A84] bg-opacity-80 md:p-8 p-6 mt-20 md:mt-10 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-6">
            {isSignIn ? "Login" : "Register"}
          </h2>

          {/* Formik form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            context={{ isSignIn }}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                {/* Show Name fields only if it's Sign Up */}
                {!isSignIn && (
                  <>
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="w-full p-3 rounded bg-[#271A84] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#271A84]"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="w-full p-3 rounded bg-[#271A84] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#271A84]"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 rounded bg-[#271A84] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#271A84]"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="text"
                        name="invited_referral_code"
                        placeholder="Referral Code"
                        className="w-full p-3 rounded bg-[#271A84] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#271A84]"
                      />
                      <div className="text-red-400 text-[14px]">{showText}</div>
                      <ErrorMessage
                        name="invited_referral_code"
                        component="div"
                        className="text-red-500 text-sm"
                        value={referralCode} // Bind value to local state
                        onChange={(e) => {
                          setFieldValue(
                            "invited_referral_code",
                            e.target.value
                          ); // Update Formik field value
                          setReferralCode(e.target.value); // Update local state
                        }}
                      />
                    </div>
                  </>
                )}

                <div className="mb-4">
                  <div className="flex items-center bg-[#271A84] rounded">
                    {/* +91 Text */}
                    <span className="text-gray-400 pl-2">+91</span>

                    {/* Phone Number Input */}
                    <Field
                      type="text"
                      name="phone_number"
                      maxLength={10}
                      pattern="[0-9]*"
                      placeholder="Phone Number"
                      className="w-full p-3 bg-[#271A84] text-white placeholder-gray-400 focus:outline-none  focus:ring-[#271A84] rounded-r"
                    />
                  </div>

                  {/* Error Message */}
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative ">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 rounded bg-[#271A84] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#271A84]"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute top-7 text-white right-2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {!isSignIn && (
                  <div className=" mb-4 relative ">
                    <Field
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="mr-2"
                    />
                    <label htmlFor="terms" className="text-white">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-blue-600 hover:underline"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions
                      </Link>
                    </label>

                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                <div className="relative">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7D60F9] py-3 rounded text-white font-semibold transition duration-200 relative flex items-center justify-center"
                  >
                    {isSubmitting && (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <Spinner />
                      </div>
                    )}
                    {!isSubmitting && (
                      <span className="relative z-10">
                        {isSignIn ? "Login" : "Register"}
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Additional Links */}
          <div className="mt-3 text-gray-400 text-center">
            <p>
              {isSignIn ? `New to Mining? ` : "Already a Member? "}
              <a
                href="#"
                onClick={toggleSignIn}
                className="text-white cursor-pointer hover:underline"
              >
                {isSignIn ? "Register" : "Login"}
              </a>
            </p>
          </div>
          <div className="text-center text-gray-400">
            <span className="mb-2 mr-2 ">Forgot your password?</span>
            <Link to="/forget_password" className="text-blue-400" >
            Click Here

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
