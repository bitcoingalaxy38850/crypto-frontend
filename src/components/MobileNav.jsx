import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SideBarLinks } from '../utils/constant';
import { useSelector } from 'react-redux'; // To access Redux state
import LoadingIcon from './LoadingIcon';

const MobileNav = () => {
  const location = useLocation(); // Get the current pathname
  const pathname = location.pathname;

  // Fetch the user data from Redux store (assuming it contains a role property)
  const user = useSelector((state) => state.user.userInfo);

  if (!user) {
    return <LoadingIcon />; // or a loading spinner if you prefer
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1C1F2E] sm:hidden">
      <div className="flex justify-around items-center p-2 overflow-x-auto whitespace-nowrap">
        {SideBarLinks.map((link) => {
          // Conditionally render based on the user role
          if (link.role === 'CARTEL' && user.role !== 'CARTEL') {
            return null; // Don't render the admin link if the user doesn't have the 'CARTEL' role
          }

          const isActive = pathname === link.route;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`flex flex-col items-center text-white 
                ${isActive ? 'bg-[#7D60F9]' : ''} 
                 px-[10px] py-[0.3rem] rounded-[4px] transition-colors duration-200 ease-in-out`}
            >
              <img
                src={link.imgUrl}
                alt={link.label}
                width={20}
                height={20}
              />
              <p className="text-[12px]">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
