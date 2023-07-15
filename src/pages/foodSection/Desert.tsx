import * as React from 'react';
import { UseSelector } from '../../redux/store';
import ItemCard from '../../components/cards/ItemCard';

export interface IDesertProps {
    
}

export default function Desert (props: IDesertProps) {
  const {desertData} = UseSelector(state => state.food)

  const staticDesertData = [
    {
      id: '2cb8a2a7-718c-4b01-ade8-9e0718ca8390',
      type: 'Monkey Bread Pizookie',
      desc: 'Fresh-baked, pull-apart bread | butter | brown sugar | cinnamon | rich vanilla bean ice cream',
      price: '7.99',
      foodtype: 'desert'
    },
    {
      id: '2e43f533-69c3-423c-9175-91c2485b955d',
      type: 'Apple Pie',
      desc: 'Here is our favorite apple pie recipe, with an easy, no-fail, buttery, flaky homemade pie crust, and a filling with a mix of different types of apples, spices, vanilla, and a splash of brandy.',
      price: '6.99',
      foodtype: 'desert'
    },
    {
      id: '75533675-ea21-4a06-ae3e-8dfab586e2a4',
      type: 'Strawberry Shortcake Pizookie',
      desc: 'Buttery sugar cookie | fresh strawberries | strawberry purée | rich vanilla bean ice cream | whipped cream',
      price: '8.59',
      foodtype: 'desert'
    },
    {
      id: '99972195-5ede-402b-8500-1861186b2b95',
      type: 'Triple-Chocolate Buttermilk Pound Cake',
      desc: 'A duo of glazes—one creamy chocolate, the other subtle buttermilk—comes together atop this dreamy confection. Its indulgent and, we admit, so much fun to eat and serve.',
      price: '9.99',
      foodtype: 'desert'
    },
    {
      id: 'bb7a0bd0-2c2f-4b1a-a1a1-09085fa8e7bc',
      type: 'Monkey Bread',
      desc: 'The beauty of monkey bread is just how easy it is. This version starts with a few cans of store-bought buttermilk biscuit dough that gets tossed in cinnamon sugar and then drenched in a buttery caramel sauce. Its truly to die for, no monkeys required.',
      price: '6.99',
      foodtype: 'desert'
    }
  ]
  
  return (
    <div id='desert' className=' w-full   mt-10'>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>

        {/* Title */}
        <h4 className='mb-5 text-[25px] font-semibold'>Desert</h4>

        {/* Mapped Data */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {staticDesertData?.map((item:any,index:any)=>(
              <ItemCard data={item} key={index}/>
            ))}
        </div>

      </div>
    </div>
  );
}
