import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import the ArrowLeft icon

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This mimics the browser back button functionality
  };

  return (
    <button
      onClick={goBack}
      className="flex items-center justify-center px-2 md:px-3 md:py-2 mb-2 w-[50px] md:w-[100px] md:text-[14px] text-[10px] bg-gray-800 border border-[#7D60F9] text-white rounded-[30px] hover:bg-[#7D60F9] transition-all"
    >
      <ArrowLeft className="w-6 h-6 mr-1 md:mr-2" /> {/* Icon added */}

    </button>
  );
};

export default BackButton;
