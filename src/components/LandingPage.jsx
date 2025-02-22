import { useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import Section_1 from "./sections/Section_1";
import Section_2 from "./sections/Section_2";
import { Section_3 } from "./sections/Section_3";
import Section_4 from "./sections/Section_4";
const LandingPage = () => {
  const [userId] = useLocalStorage("authToken");

  const navigate = useNavigate();


  const handleStartMining = () => {
    if (userId) {
      // If user data exists, redirect to machine listing
      navigate("/machine_listing");
    } else {
      // Otherwise, redirect to login
      navigate("/login");
    }
  };
  return (
    <>
      <div
        className="bg-cover bg-center h-[60vh] sm:h-screen relative"
        style={{ backgroundImage: "url(/Images/bg.png)" }}
      >
        {/* Overlay for button */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="absolute inset-x-0  bottom-10   flex flex-col items-start justify-center pl-6 pr-6 sm:pl-[200px]">
          <div className="flex items-center w-full sm:w-[320px] justify-start bg-opacity-40 bg-[#271A84] px-2 py-2 rounded-full">
            {/* Logo on the left */}
            <img
              src="/Images/dollor.svg"
              alt="Logo"
              className="w-7 h-7 rounded-full"
            />
            {/* Text next to the logo */}
            <div className="ml-2 text-gray-300 cursor-pointer text-sm sm:text-[20px] hover:text-white font-medium">
              Earn with our eco-friendly mining
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-white w-full sm:w-[500px] text-[28px] sm:text-[48px] font-bold mb-4 leading-tight sm:leading-none">
            Crypto Mining Made Easy
          </h1>

          {/* Paragraph */}
          <p className="text-gray-200 text-sm sm:text-[20px] leading-[24px] sm:leading-[28px] max-w-full sm:max-w-[600px] mb-8">
            BIG MINING provides state-of-the-art solar-powered bitcoin mining in
            the tropics. The best platform to earn safely and fast.
          </p>

          {/* Button */}
          <button
            className="text-gray-200 w-[160px] sm:w-[200px] py-3 sm:py-4 text-sm sm:text-[20px] font-medium leading-[24px] sm:leading-[28px] rounded-full px-4 shadow-lg bg-gradient-to-r from-[#29C8A0] to-[#6568EB]"
            onClick={handleStartMining}
          >
            Start Mining
          </button>
        </div>
      </div>

      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />
    </>
  );
};
export default LandingPage;
