import React from "react";

const MessageBox = ({ name }) => {
  let message;

  // Determine the message based on the name prop
  switch (name) {
    case "deposit":
      message = "Your deposit has been successful!";
      break;
    case "withdrawal":
      message = (
        <>
          Your withdrawal request has been successfully submitted. Our admin
          team is reviewing the request for approval. Please allow{" "}
          <strong className="text-yellow-600">3-6 hours</strong> for processing.
        </>
      );
      break;
    case "referral":
      message = (
        <>
          You will receive a{" "}
          <strong className="text-yellow-600">5% commission</strong> on their
          first deposit when someone uses your referral code.
        </>
      );
      break;

    case "buy_machine":
      message = (
        <>
          To proceed with the machine purchase, please follow these steps:
          <ul className="mt-2">
            <li className="mb-1">
              1. Scan the <strong className="text-yellow-600">QR code</strong>{" "}
              provided to initiate the payment.
            </li>
            <li className="mb-1">
              2. After completing the payment, enter the{" "}
              <strong className="text-yellow-600">
                UTR (Unique Transaction Reference) 12 digit number
              </strong>{" "}
              in the payment confirmation section.
            </li>
            <li className="mb-1">
              3. Your transaction will be verified, and you'll receive a
              confirmation once the payment is processed successfully.
            </li>
          </ul>
          Please ensure you complete these steps accurately to avoid any delays
          in processing.
        </>
      );
      break;

    default:
      message =
        "This is a message! You can close this by clicking the cross icon.";
  }

  return (
    <div className="bg-[#7D60F9] bg-opacity-40 text-white p-4 mb-5 rounded-md shadow-md flex items-center justify-between">
      {/* Message content */}
      <p className="text-sm">{message}</p>
      {/* Close icon can be added here if needed */}
    </div>
  );
};

export default MessageBox;
