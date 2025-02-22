import { CrossIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const UPIButton = ({ upiData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/android|iphone|ipad|ipod/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  const handlePayment = (app) => {
    const upiId = upiData.upiID;
    const payeeName = upiData.payeeName;
    const amount = upiData.amount;
    const transactionNote = "Machine Purchase";
    const currency = "INR";

    let upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=${currency}&tn=${transactionNote}`;

    if (app === "gpay") {
      upiLink += "&package=com.google.android.apps.nbu.paisa.user";
    } else if (app === "phonepe") {
      upiLink += "&package=com.phonepe.app";
    } else if (app === "paytm") {
      upiLink += "&package=net.one97.paytm";
    }

    if (isMobile) {
      window.location.href = upiLink;
    }
  };

  return (
    <div className="relative">
      {/* Pay Now Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white md:m-0 mb-5 text-xl font-semibold px-8 py-4 rounded-lg shadow-lg w-full max-w-sm mx-auto"
      >
        Pay Now
      </button>

      {/* Modal */}
      {isModalOpen && isMobile && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6  rounded-lg shadow-lg w-96 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-bold">Choose UPI App</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-red-500 text-xl"
              >
                ✖
              </button>
            </div>
            {/* UPI App Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handlePayment("gpay")}
                className="flex items-center justify-between text-white text-lg px-4 py-3 rounded-lg w-full"
              >
                <span>Pay with Google Pay</span>
                <img
                  src="/Images/google-pay.png"
                  alt="Google Pay"
                  className="h-6 w-auto"
                />
              </button>
              <button
                onClick={() => handlePayment("phonepe")}
                className="flex items-center justify-between text-white text-lg px-4 py-3 rounded-lg w-full"
              >
                <span>Pay with PhonePe</span>
                <img
                  src="/Images/phone-pay.png"
                  alt="PhonePe"
                  className="h-6 w-auto"
                />
              </button>
              <button
                onClick={() => handlePayment("paytm")}
                className="flex items-center justify-between  text-white text-lg px-4 py-3 rounded-lg w-full"
              >
                <span>Pay with Paytm</span>
                <img
                  src="/Images/paytm-pay.png"
                  alt="Paytm"
                  className="h-6 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display message for non-mobile users */}
      {!isMobile && (
        <div className="text-center mt-4 text-red-500 text-lg">
          *Please use a mobile device to make payments through UPI Apps.
        </div>
      )}
    </div>
  );
};

export default UPIButton;
