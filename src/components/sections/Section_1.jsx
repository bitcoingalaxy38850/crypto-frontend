const Section_1 = () => {
  return (
    <div className="bg-[#160242] relative pt-16 px-4 md:px-8 lg:px-20">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 justify-center absolute left-0 right-0">
          <span className="w-[12px] h-[12px] bg-blue-500 rounded-full"></span>
          <span className="w-[12px] h-[12px] bg-violet-500 rounded-full"></span>
          <span className="w-[12px] h-[12px] bg-yellow-500 rounded-full"></span>
          <span className="w-[12px] h-[12px] bg-green-500 rounded-full"></span>
          <span className="w-[12px] h-[12px] bg-blue-900 rounded-full"></span>
          <span className="w-[12px] h-[12px] bg-orange-500 rounded-full"></span>
          <span className="w-[12px] h-[12px] bg-violet-500 rounded-full"></span>
        </div>

        <div className="mt-8 text-center text-white">
          <h1 className="text-[30px] md:text-[40px]">How To Start</h1>
          <p className="mt-3 text-gray-300 text-[16px] md:text-[20px]">
            Start earning right away
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Side Image - Hidden on small screens */}
        <div className="w-full md:w-1/2 flex justify-center md:block hidden">
          <img
            src="/Images/summer.png"
            alt="Mining"
            className="w-3/4 md:w-full h-auto animate-up-down mt-10"
          />
        </div>

        {/* Right Side Columns */}
        <div className="w-full md:w-1/2 flex flex-col justify-start space-y-8 p-6 md:p-12">
          {/* First Step */}
          <div className="flex flex-col p-5 rounded-lg shadow-md bg-[#291674] space-y-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#7D60F9] rounded-full text-white text-[25px] font-bold">
                1
              </div>
              <div className="ml-4 text-white text-[20px] md:text-[25px] font-bold">
                Register
              </div>
            </div>
            <div className="ml-16 text-[14px] md:text-[15px] text-gray-300">
              Create your account in a few steps
            </div>
          </div>

          {/* Second Step */}
          <div className="flex flex-col p-5 rounded-lg shadow-md bg-[#291674] space-y-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#7D60F9] rounded-full text-white text-[25px] font-bold">
                2
              </div>
              <div className="ml-4 text-white text-[20px] md:text-[25px] font-bold">
                Choose Your Package
              </div>
            </div>
            <div className="ml-16 text-[14px] md:text-[15px] text-gray-300">
            Select the mining package you desire. Each package has its own unique benefits
            </div>
          </div>

          {/* Third Step */}
          <div className="flex flex-col p-5 rounded-lg shadow-md bg-[#291674] space-y-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#7D60F9] rounded-full text-white text-[25px] font-bold">
                3
              </div>
              <div className="ml-4 text-white text-[20px] md:text-[25px] font-bold">
              Receive profits
              </div>
            </div>
            <div className="ml-16 text-[14px] md:text-[15px] text-gray-300">
            Start earning money from your chosen package. You will receive your first payment in 24 Hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section_1;
