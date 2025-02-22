import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HOST_URL } from '../../utils/constant';

const ModalBankInfo = ({ showModal, setShowModal, data, handleApprove }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userApiUrl = `${HOST_URL}/user/getuser+basic+details/${data.user_id}`;
            try {
                const response = await axios.get(userApiUrl);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load user data.");
                setLoading(false);
            }
        };

        if (data.user_id) {
            fetchUserData();
        }
    }, [data.user_id]);

    // Close the modal
    const onClose = () => {
        setShowModal(false);
    };

    // Conditional rendering: only show modal if `showModal` is true
    if (!showModal) return null;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white w-full max-w-md mx-auto p-8 rounded-lg shadow-lg transition-transform transform duration-300 scale-100 hover:scale-105">
                <h2 className="text-2xl font-semibold mb-6 text-center">Bank Information</h2>
                
                {/* Bank Information */}
                <div className="mb-6">
                    <p className="mb-2"><strong>Account Holder:</strong> {user?.first_name} {user?.last_name}</p>
                    <p className="mb-2"><strong>Bank Name:</strong> {user?.bank_name || "Not Provided"}</p>
                    <p className="mb-2"><strong>Account Number:</strong> {user?.account_no || "Not Provided"}</p>
                    <p className="mb-2"><strong>IFSC Code:</strong> {user?.ifsc_code || "Not Provided"}</p>
                    <p className="mb-2"><strong>UPI ID:</strong> {user?.upi_id || "Not Provided"}</p>
                    <p className="mb-2"><strong>Withdrawal Amount:</strong>  ₹{data?.withdrawal_amount || "0"}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            handleApprove(data); // Call handleApprove with the data
                            onClose(); // Close modal after approval
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalBankInfo;
