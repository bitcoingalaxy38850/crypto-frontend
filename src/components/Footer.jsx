import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../utils/hooks/useLocalStorage'; // Assuming this is the hook you're using for auth

const Footer = () => {
  const navigate = useNavigate();
  const [token] = useLocalStorage("authToken"); // Check if the user is logged in

 const handleClick  = ()=>{
  if(token){
    navigate('/video_section');
  }else{
    navigate("/login")
  }
 }

  return (
    <footer className="bg-[#192057] text-white md:py-5 pb-[100px] pt-[20px] px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Logo and Copyright */}
        <div>
          {/* Logo */}
          <div className="text-2xl font-bold mb-4">
            <img src="/Images/logo.png" alt="Logo" className="w-28 h-auto" />
          </div>
          {/* Copyright */}
          <p className="text-gray-300 text-sm">
            © 2022 Your Company. All rights reserved.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/profile.php?id=61566915029014&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="text-white w-6 h-6 hover:text-gray-300" />
            </a>
       
            <a href="https://www.instagram.com/invites/contact/?igsh=8ujzna47pw0i&utm_content=w7ekbcp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="text-white w-6 h-6 hover:text-gray-300" />
            </a>
          </div>
        </div>

        {/* Middle Column: Navigate */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Navigate</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/machine_listing"  onClick={() => handleNavigate("/machine_listing")}>Home</Link>
            </li>
            <li>
              <Link to="/video_section"  onClick={handleClick}>What we do</Link>
            </li>
            <li>
              <Link to="/terms">Terms and Condition</Link>
            </li>
            <li>
              <Link to="/Privacy_Policy"s>Privacy Policy</Link>
            </li>
            <li>
            <a href="https://www.youtube.com/@cryptomyners" target="_blank" rel="noopener noreferrer">YouTube Channel</a>

            </li>
          </ul>
        </div>

        {/* Right Column: Address and Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Address</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="max-w-[300px]">
              Room 5, Ground Floor Courtney House, 12 Dudley Street, Luton,
              Beds, England, LU2 0NT
            </li>
          </ul>
          <h3 className="font-semibold text-lg mt-6">Contact Us</h3>
          <ul className="text-gray-300 text-sm">
            <li className="flex items-center mt-2">
              <Mail className="mr-2" />
              <a href="mailto:Cryptomyners@gmail.com">Cryptomyners@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
