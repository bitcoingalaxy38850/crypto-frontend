import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SideBarLinks } from '../utils/constant';
import { useSelector } from 'react-redux'; // To access Redux state

const Sidebar = () => {
    const location = useLocation(); // Get the current pathname
    const pathname = location.pathname;

    // Fetch the user data from Redux store (assuming it contains a role property)
    const user = useSelector((state) => state.user.userInfo);

    // Check if user data is available
    if (!user) {
       <h1>Loading....</h1>
        return null; // or a loading spinner if you prefer
    }

  

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1C1F2E] p-6 pt-20 text-white max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-1 flex-col gap-6'>
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
                            className={`flex gap-4 items-center p-4 rounded-lg justify-start ${isActive ? 'bg-[#7D60F9]' : ''}`}
                        >
                            <img
                                src={link.imgUrl}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className='text-lg font-semibold max-lg:hidden'>
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;
