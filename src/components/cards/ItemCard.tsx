import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { Dispatch } from '../../redux/store';
import {  setHandleOpen } from '../../redux/features/foodSlice';
export interface IItemCardProps {
    data:{
        id:string,
        type:string,
        desc:string,
        price:string
        foodtype:string
    }
}

export default function ItemCard ({data}: IItemCardProps) {

    const isXL = useMediaQuery("(min-width:1280px)");
    const dispatch = Dispatch()
    

  return (
    <div className='w-full h-auto xl:h-auto border-[2px] border-gray-300 flex my-1 rounded-2xl p-4 cursor-pointer' onClick={()=>dispatch(setHandleOpen(data))}>
        {/* Content */}
        <div className='flex flex-col'>

            {/* Title */}
            <h4 className='text-[14px] font-bold mb-2'>{data?.type}</h4>

            {/* desc */}
            {isXL ? (<h5 className='text-[13px] font-medium mb-1'>{data?.desc.slice(0,80)}...</h5>):(<h5 className='text-[13px] font-medium mb-1'>{data?.desc.slice(0,120)}...</h5>)}
            

            {/* price */}
            <h5 className='text-[14px] font-medium mb-1'>${data?.price}</h5>
        </div>
        
    </div>
  );
}
