import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionsSection from './sections/ActionAdmin';
import DepositAdmin from './sections/DepositAdmin';
import WithdrawalAdmin from './sections/WithdrawalAdmin';
import { HOST_URL } from '../../utils/constant';
import axios from 'axios';
import { addApprovedDeposit, addApprovedWithDrawal, addPendingDeposit, addPendingWithdrawal } from '../../redux/features/AdminSlice';
import Video_Section from '../Video_Section';
import Video_Section_Admin from './sections/Video_Section_Admin';
import LoadingIcon from '../LoadingIcon';
import UserInfo from '../UserInfo';

// API URLs
const getPendingDepositsUrl = `${HOST_URL}/pending+request/getall`;
const getApprovedDepositsUrl = `${HOST_URL}/deposit+success/getall+success+request`;
const getPendingWithdrawalsUrl = `${HOST_URL}/user+withdrawal/getAll+pending+request`;
const getApprovedWithdrawalsUrl = `${HOST_URL}/user+withdrawal/getAll+approved+withdrawals`;

const Admin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Fetching data from Redux store
  const pending_deposit = useSelector((state) => state.admin.admin.pending_deposit) || [];
  const approved_deposit = useSelector((state) => state.admin.admin.approved_deposit) || [];
  const pending_withdrawal = useSelector((state) => state.admin.admin.pending_withdrawal) || [];
  const approved_withdrawal = useSelector((state) => state.admin.admin.approved_withdrawal) || [];



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch pending deposits
        const pendingDepositsResponse = await axios.get(getPendingDepositsUrl);
    
        dispatch(addPendingDeposit(pendingDepositsResponse.data));

        // Fetch approved deposits
        const approvedDepositsResponse = await axios.get(getApprovedDepositsUrl);
        dispatch(addApprovedDeposit(approvedDepositsResponse.data));

        // Fetch pending withdrawals
        const pendingWithdrawalsResponse = await axios.get(getPendingWithdrawalsUrl);
        dispatch(addPendingWithdrawal(pendingWithdrawalsResponse.data));

        // Fetch approved withdrawals
        const approvedWithdrawalsResponse = await axios.get(getApprovedWithdrawalsUrl);
        dispatch(addApprovedWithDrawal(approvedWithdrawalsResponse.data));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <div className="flex justify-center items-center h-screen">
  <LoadingIcon /> {/* Show loading icon while loading */}
</div>

  return (
    <div className="bg-gray-900 min-h-screen md:p-6 sm:p-4">
  <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Dashboard</h1>
   <UserInfo />
  {/* Deposit Section */}
  <div className="bg-gray-800 md:p-6 p-4 rounded-lg shadow-lg mb-6">
    <h2 className="text-2xl font-semibold text-white mb-4">Deposit Management</h2>
    <DepositAdmin 
      pendingDeposits={pending_deposit} 
      approvedDeposits={approved_deposit} 
    />
  </div>

  {/* Withdrawal Section */}
  <div className="bg-gray-800 md:p-6 p-4 rounded-lg shadow-lg mb-6">
    <h2 className="text-2xl font-semibold text-white mb-4">Withdrawal Management</h2>
    <WithdrawalAdmin 
      pendingWithdrawals={pending_withdrawal} 
      approvedWithdrawals={approved_withdrawal} 
    />
  </div>


  {/* Actions Section */}
  <div className="bg-gray-800 md:p-6 p-4 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-white mb-4">Actions</h2>
    <ActionsSection />
  </div>
</div>

  );
};

export default Admin;
