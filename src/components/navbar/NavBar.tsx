import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';

export interface INavBarProps {
}

export default function NavBar (props: INavBarProps) {
  return (
    <div className=' h-[85px] w-full sticky top-0 flex border-b border-gray-300 items-center p-5 z-10 bg-white backdrop-blur-lg'>

        {/* Content */}
        <div className='flex justify-between w-full'>
            
            {/* Left Side */}
            <div className='flex items-center'>

                {/* Title */}
                <h2 className='text-[14px] font-semibold'>Favs Pizzeria</h2>
                {/* Vertical Line */}
                <div className='border-l h-[50px] mx-4 border-gray-300 sm:block hidden'></div>
                {/* Address */}
                <h3 className='text-[14px] font-medium sm:block hidden'>8546 Forrest Drive Lane, Las Vegas, NV 89156</h3>
            </div>

            {/* RIght Side */}
            <div className='flex items-center cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[2px] hover:scale-110 duration-300'>
                <IconButton><PersonIcon className='text-black'/></IconButton>
                <h5 className='text-[14px]'>Login</h5>
            </div>
        </div>
         
    </div>
  );
}
