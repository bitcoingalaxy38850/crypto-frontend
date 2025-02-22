import React from 'react';
import { QrCode, Box, Eye, Settings } from 'lucide-react'; // Lucide icons for actions
import { Link } from 'react-router-dom';

const ActionSection = () => {
  return (
    <div className="md:mb-10 mb-5 md:p-6">
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {/* Create QR Code */}
        <Link to="/create_qrcode" className="bg-gradient-to-r cursor-pointer from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-white text-center">
          <QrCode className="w-12 h-12 mx-auto mb-4" />
          <button className="text-lg font-semibold">Create QR Code</button>
        </Link>

        {/* Create Machine */}
        <Link to="/create_machine" className="bg-gradient-to-r cursor-pointer from-green-500 to-teal-500 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-white text-center">
          <Box className="w-12 h-12 mx-auto mb-4" />
          <button className="text-lg font-semibold">Create Machine</button>
        </Link>

        {/* View QR Codes */}
        <Link to="/view_qrcode" className="bg-gradient-to-r cursor-pointer from-blue-500 to-cyan-500 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-white text-center">
          <Eye className="w-12 h-12 mx-auto mb-4" />
          <button className="text-lg font-semibold">View QR Codes</button>
        </Link>

        {/* View Machines */}
        <Link to="/view_machine" className="bg-gradient-to-r cursor-pointer from-orange-500 to-yellow-500 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-white text-center">
          <Settings className="w-12 h-12 mx-auto mb-4" />
          <button className="text-lg font-semibold">View Machines</button>
        </Link>
      </div>
    </div>
  );
}

export default ActionSection;
