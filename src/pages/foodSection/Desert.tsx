import * as React from 'react';
import { UseSelector } from '../../redux/store';
import ItemCard from '../../components/cards/ItemCard';

export interface IDesertProps {
    
}

export default function Desert (props: IDesertProps) {
  const {desertData} = UseSelector(state => state.food)
  
  return (
    <div id='desert' className=' w-full   mt-10'>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>

        {/* Title */}
        <h4 className='mb-5 text-[25px] font-semibold'>Desert</h4>

        {/* Mapped Data */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {desertData?.map((item:any,index:any)=>(
              <ItemCard data={item} key={index}/>
            ))}
        </div>

      </div>
    </div>
  );
}
