import * as React from 'react';
import { UseSelector } from '../../redux/store';
import ItemCard from '../../components/cards/ItemCard';

export interface IPopularProps {
    
}

export default function Popular (props: IPopularProps) {
  const {popularData} = UseSelector(state => state.food)

  const staticPopularData = [
    {
      id: '47667269-21f6-4952-afd8-72ea087030bc',
      type: 'Neapolitan Pizza',
      desc: 'Neapolitan pizza toppings are fresh mozzarella, tomatoes, basil leaves, oregano, and olive oil. Since Neapolitan pizza is thin, it isnt designed to handle the weight of too many toppings. In fact, Neapolitan pizza is so thin that its typically eaten with a fork and knife.',
      price: '10.99',
      foodtype: 'pizza'
    },
    {
      id: '631581eb-2eef-44c5-88a2-aca9b93ff898',
      type: 'Greek Pizza',
      desc: 'It is often only topped with cheese, which is usually a mix of mozzarella and cheddar or provolone. It may feature a variety of non-Greek or Greek toppings, such as feta cheese, black olives, and red onion.',
      price: '10.99',
      foodtype: 'pizza'
    },
    {
      id: '0054ee6f-a094-4b87-9efb-e0cf885a5821',
      type: 'Mediterranean Orzo Pasta Salad',
      desc: 'Quick and easy Mediterranean orzo pasta salad packed with fresh vegetables and herbs is tossed in a Greek lemon vinaigrette. Healthy, light and delicious.',
      price: '12.99',
      foodtype: 'salad'
    },
    {
      id: '7223257a-b234-42e9-b220-7c42ebe51c85',
      type: 'Pesto Penne Pasta',
      desc: 'Freshly cooked pasta is packed with flavour when tossed in pesto, fresh cherry tomatoes, basil pesto and Parmesan cheese.',
      price: '14.99',
      foodtype: 'pasta'
    }
  ]
  return (
    <div id='popular' className=' w-full   mt-10'>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>

        {/* Title */}
        <h4 className='mb-5 text-[25px] font-semibold'>Popular Items</h4>

        {/* Mapped Data */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {staticPopularData?.map((item:any,index:any)=>(
              <ItemCard data={item} key={index}/>
            ))}
        </div>

      </div>
    </div>
  );
}

// mt-10
