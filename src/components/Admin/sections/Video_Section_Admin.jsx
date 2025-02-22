import {  Video } from "lucide-react";
import { Link } from "react-router-dom";

const Video_Section_Admin = () => {
  return (
    <div className="md:mb-10 mb-5 md:p-6">
      <Link
        to="/video_section"
        className="bg-gradient-to-r cursor-pointer from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg  hover:shadow-xl transition-transform text-white flex flex-col sm:flex-row sm:justify-between items-center"
      >
        <div className="flex flex-col items-center sm:items-start">
          <Video className="w-12 h-12 mb-2" /> {/* Margin bottom for spacing */}
          <span className="text-lg font-semibold text-center sm:text-left">
            Video Tutorials
          </span>
        </div>
      </Link>
    </div>
  );
};
export default Video_Section_Admin;
