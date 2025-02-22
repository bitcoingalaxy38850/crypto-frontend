import { partners } from "../../utils/constant";

const Section_4 = () => {
  return (
    <div className="flex flex-col sm:px-[100px] items-center py-10  md:px-[200px] bg-gradient-to-b from-[#380855] to-[#160242] justify-center">
      {/* First Div: Circles */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-[12px] h-[12px] bg-blue-500 rounded-full"></span>
        <span className="w-[12px] h-[12px] bg-violet-500 rounded-full"></span>
        <span className="w-[12px] h-[12px] bg-yellow-500 rounded-full"></span>
        <span className="w-[12px] h-[12px] bg-green-500 rounded-full"></span>
        <span className="w-[12px] h-[12px] bg-blue-900 rounded-full"></span>
        <span className="w-[12px] h-[12px] bg-orange-500 rounded-full"></span>
        <span className="w-[12px] h-[12px] bg-violet-500 rounded-full"></span>
      </div>

      {/* Second Div: Heading and Paragraph */}
      <div className="text-center text-white">
        <h1 className="text-[32px] md:text-[40px]">Our Partners</h1>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white flex flex-col sm:w-[160px] sm:h-[180px] sm:p-3 justify-between items-center w-[200px] h-[260px] rounded-lg shadow-lg p-4 md:w-[150px] md:h-[300px]"
          >
            <img
              src={partner.mainImage}
              alt={partner.title}
              className="w-[120px] h-[120px] object-contain rounded-t-lg md:w-[150px] md:h-[150px]"
            />
            <div className="px-5 py-2 rounded-lg bg-[#160242] mt-4">
              <img
                src={partner.smallImage}
                alt={partner.title}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section_4;
