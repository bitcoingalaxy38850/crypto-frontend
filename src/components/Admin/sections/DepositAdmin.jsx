import React from 'react';
import { Clock, CheckCircle } from 'lucide-react'; // Lucide icons for pending and approved deposits
import { Link } from 'react-router-dom';

const DepositAdmin = ({pendingDeposits , approvedDeposits }) => {

  const  pendingDepositLength = pendingDeposits.length;
  const approvedDepositLength = approvedDeposits.length;


  return (
    <div className="md:mb-10 mb-5 md:p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Pending Deposits */}
        <Link 
          to="/pending_deposit" 
          className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-white flex flex-col sm:flex-row sm:justify-between items-center"
        >
          <div className="flex flex-col items-center sm:items-start">
            <Clock className="w-12 h-12 mb-2" /> {/* Margin bottom for spacing */}
            <span className="text-lg font-semibold text-center sm:text-left">Pending Deposits</span>
          </div>
          <span className="text-2xl font-bold mt-2 sm:mt-0">{pendingDepositLength}</span>
        </Link>

        {/* Approved Deposits */}
        <Link 
          to="/approved_deposit" 
          className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-white flex flex-col sm:flex-row sm:justify-between items-center"
        >
          <div className="flex flex-col items-center sm:items-start">
            <CheckCircle className="w-12 h-12 mb-2" /> {/* Margin bottom for spacing */}
            <span className="text-lg font-semibold text-center sm:text-left">Approved Deposits</span>
          </div>
          <span className="text-2xl font-bold mt-2 sm:mt-0">{approvedDepositLength}</span>
        </Link>

      </div>
    </div>
  );
};

export default DepositAdmin;
