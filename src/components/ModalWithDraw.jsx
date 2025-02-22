import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onWithdraw, initialAmount }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(initialAmount);
  const [isWithdrawDisabled, setIsWithdrawDisabled] = useState(true); // State to control the disabled button
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleInputChange = (e) => {
    setWithdrawalAmount(e.target.value);
  };

  useEffect(() => {
    const amount = parseFloat(withdrawalAmount); // Convert to number
    // Check if the input is a valid number, greater than or equal to 20, and does not exceed initialAmount
    if (isNaN(amount) || amount < 50) {
      setIsWithdrawDisabled(true);
      setErrorMessage(`The withdrawal amount must be at least ₹50.`);
    } else if (amount > initialAmount) {
      setIsWithdrawDisabled(true);
      setErrorMessage(`The withdrawal amount cannot exceed ₹${initialAmount}.`);
    } else {
      setIsWithdrawDisabled(false);
      setErrorMessage(""); // Clear error message if conditions are met
    }
  }, [withdrawalAmount, initialAmount]); // Run this effect when withdrawalAmount or initialAmount changes

  const handleWithdrawClick = () => {
    if (!isWithdrawDisabled) {
      onWithdraw(withdrawalAmount); // Pass the amount to the withdrawal handler
      setWithdrawalAmount("")
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
          <h2 className="text-xl font-bold mb-4 text-center">Withdrawal Confirmation</h2>
          <p className="text-red-500 text-[14px] mt-2">*10% Platform Fees Will Be Deducted on Withdrawal Amount</p>
          <p className="text-gray-700 mb-4">Available to Withdraw: <span className="font-semibold">₹{initialAmount}</span></p>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter amount to withdraw"
          />
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-150 ease-in-out"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 rounded transition duration-150 ease-in-out ${
                isWithdrawDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={handleWithdrawClick}
              disabled={isWithdrawDisabled} // Button is disabled based on state
            >
              Withdraw
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
