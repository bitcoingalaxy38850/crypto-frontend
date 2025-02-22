import Carousel from "./Carousel";

export const Section_3 = () => {
  return (
    <div className="py-10 px-4 md:px-8 lg:px-20 bg-[#380855] flex flex-col justify-center items-center space-y-6">
      {/* Text Section */}
      <div className="text-center text-white">
        <h1 className="text-[28px] md:text-[36px] lg:text-[40px]">Testimonial</h1>
        <p className="mt-2 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px]">
          What members are saying.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="w-full md:w-3/4 lg:w-1/2">
        <Carousel />
      </div>
    </div>
  );
};
