import BackButton from "./BackButton";

const Terms = () => {
  return (
    <section className="bg-gray-800 min-h-screen">
   

      <div className="bg-gray-800 py-10 px-4 sm:px-10 md:px-20 lg:px-40 xl:px-[200px] mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-[50px] text-center font-bold text-white mb-6">
          Terms and Conditions
        </h1>

        <p className="text-white mb-4">Effective Date: 01-01-2022</p>

        <p className="text-white mb-4">
          These Terms and Conditions ("Terms") govern the use of the services provided by Cryptomyner ("Company", "we", "us", or "our"). By accessing or using our website, platform, or services, you ("User", "Investor", or "you") agree to comply with and be bound by these Terms. If you do not agree with these Terms, please refrain from using our services.
        </p>

        <h2 className="text-2xl md:text-[30px] font-semibold text-white mt-6 mb-4">
          1. Eligibility
        </h2>
        <ul className="list-disc list-inside mb-4 text-white">
          <li>Be at least 18 years old (or the age of majority in your jurisdiction).</li>
          <li>Have full legal capacity to enter into binding contracts.</li>
          <li>Comply with all applicable laws and regulations regarding cryptocurrency trading and mining in your jurisdiction.</li>
          <li>Provide accurate and complete information during registration and account creation.</li>
        </ul>

        <h2 className="text-2xl md:text-[30px] font-semibold text-white mt-6 mb-4">
          2. Services
        </h2>
        <p className="text-white mb-4">
          Cryptomyner provides cryptocurrency mining services and offers investors the opportunity to earn a share of the profits from mining activities. By investing with us, you acknowledge that:
        </p>
        <ul className="list-disc list-inside mb-4 text-white">
          <li>The performance and profitability of mining operations can fluctuate based on factors outside of our control, including market conditions and mining difficulty.</li>
          <li>Cryptomyner makes no guarantees of specific returns on your investment.</li>
          <li>The funds you invest will be used for cryptomining operations, and you will receive a portion of the profits based on the investment agreement.</li>
        </ul>

        <h2 className="text-2xl md:text-[30px] font-semibold text-white mt-6 mb-4">
          3. Account Registration
        </h2>
        <p className="text-white mb-4">
          To use our services, you must create an account. When creating an account, you agree to:
        </p>
        <ul className="list-disc list-inside mb-4 text-white">
          <li>Provide accurate, current, and complete information as required during the registration process.</li>
          <li>Keep your account credentials secure and confidential.</li>
          <li>Notify us immediately of any unauthorized use or breach of security regarding your account.</li>
          <li>Be responsible for all activities that occur under your account.</li>
        </ul>

        <h2 className="text-2xl md:text-[30px] font-semibold text-white mt-6 mb-4">
          4. Investments and Profit Distribution
        </h2>
        <ul className="list-disc list-inside mb-4 text-white">
          <li>
            <strong>Investment Agreement:</strong> When you invest in Cryptomyner’s mining services, you agree to the terms of the specific investment plan you choose. Each investment plan will specify the minimum investment amount, estimated returns, and payment schedule.
          </li>
          <li>
            <strong>Profit Sharing:</strong> Profits from mining activities will be distributed according to the specific investment plan. You understand that the actual returns may vary depending on market conditions and other operational factors.
          </li>
          <li>
            <strong>Withdrawal of Profits:</strong> Investors may withdraw their share of the profits according to the withdrawal terms of their investment plan. All withdrawals will be processed through the payment method or cryptocurrency wallet provided by the investor.
          </li>
        </ul>

        <h2 className="text-2xl md:text-[30px] font-semibold text-white mt-6 mb-4">
          Contact Us
        </h2>
        <p className="text-white mb-4">
          If you have any questions or concerns regarding these Terms or your use of our services, please contact us at:
        </p>
        <p className="text-white">
        Address: Room 5, Ground Floor Courtney House, 12 Dudley Street, Luton, Beds, England, LU2 0NT <br />

          Email: Cryptomyners@gmail.com <br />
        </p>
      </div>
    </section>
  );
};

export default Terms;
