import * as React from 'react';
import { UseSelector } from '../../redux/store';
import ItemCard from '../../components/cards/ItemCard';

export interface ISaladProps {
}

export default function Salad (props: ISaladProps) {
  const {saladData} = UseSelector(state => state.food)

  const staticSaladData = [
    {
      id: '0054ee6f-a094-4b87-9efb-e0cf885a5821',
      type: 'Mediterranean Orzo Pasta Salad',
      desc: 'Quick and easy Mediterranean orzo pasta salad packed with fresh vegetables and herbs is tossed in a Greek lemon vinaigrette. Healthy, light and delicious.',
      price: '12.99',
      foodtype: 'salad'
    },
    {
      id: '0e54640f-e11b-4a46-9067-a5382b5f86b8',
      type: 'Caesar Salad',
      desc: 'Classic Caesar Salad is fresh, crisp, delicious, and flavorful. With three simple ingredients tossed in a creamy Caesar dressing, its ready in minutes.',
      price: '12.99',
      foodtype: 'salad'
    },
    {
      id: '35ad0aaf-7bfd-4948-a0e6-1e0f071dcc50',
      type: 'Tomato Cucumber Avocado Salad',
      desc: 'Simple tomato cucumber avocado salad with a delicious lemon vinaigrette is a light and refreshing salad that comes together in literally 5 minutes.',
      price: '12.99',
      foodtype: 'salad'
    },
    {
      id: '84d412e3-f535-4e9c-96cc-b83b95973a04',
      type: 'Classic Potato Salad',
      desc: 'Classic Potato Salad is tangy and creamy with chunks of fluffy potatoes, soft eggs, and crunchy vegetables. It’s a perfect, quick and easy summer side dish.',
      price: '12.99',
      foodtype: 'salad'
    }
  ]
  return (
    <div id="salad" className=' w-full   mt-10'>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>

        {/* Title */}
        <h4 className='mb-5 text-[25px] font-semibold'>Salad</h4>

        {/* Mapped Data */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {staticSaladData?.map((item:any,index:any)=>(
              <ItemCard data={item} key={index}/>
            ))}
        </div>

      </div>
    </div>
  );
}
