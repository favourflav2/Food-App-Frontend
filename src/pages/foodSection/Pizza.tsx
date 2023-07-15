import * as React from 'react';
import { UseSelector } from '../../redux/store';
import ItemCard from '../../components/cards/ItemCard';
import { stat } from 'fs';

export interface IPizzaProps {
}

export default function Pizza (props: IPizzaProps) {
  const {pizzaData} = UseSelector(state => state.food)

  const staticPizzaData = [
    {
      id: '04f692c7-ce4f-4620-9918-eaa2645e3d09',
      type: 'Chicago Pizza',
      desc: 'Generally, the toppings for Chicago pizza are ground beef, sausage, pepperoni, onion, mushrooms, and green peppers, placed underneath the tomato sauce. Some locations will finish off their pizzas with a sprinkle of Parmesan cheese across the tomato sauce.',
      price: 10.99,
      foodtype: 'pizza'
    },
    {
      id: '4024eb04-f6b6-4bfb-a4a5-dc86c2504046',
      type: 'Veggie Pizza',
      desc: 'A cheese pizzas blank canvas screams for a vegetarian makeover. The palette with which to paint it is only limited by your imagination, with everything from mushrooms, arugula, olives, and spinach to grape tomatoes, eggplant, onions, and peppers.',
      price: 10.99,
      foodtype: 'pizza'
    },
    {
      id: '4417ff68-267b-4c5c-a7f8-199177c54edb',
      type: 'Meat Pizza',
      desc: 'A meat lovers pizza is the best choice if youre searching for a pie with a little more heaviness. Whats the difference between ground beef, sausage, and pepperoni? Let the games begin!',
      price: 10.99,
      foodtype: 'pizza'
    },
    {
      id: '47667269-21f6-4952-afd8-72ea087030bc',
      type: 'Neapolitan Pizza',
      desc: 'Neapolitan pizza toppings are fresh mozzarella, tomatoes, basil leaves, oregano, and olive oil. Since Neapolitan pizza is thin, it isnt designed to handle the weight of too many toppings. In fact, Neapolitan pizza is so thin that its typically eaten with a fork and knife.',
      price: 10.99,
      foodtype: 'pizza'
    },
    {
      id: '50bf635a-ca1f-4419-9735-9f7176323361',
      type: 'Pepperoni Pizza',
      desc: 'You say pizza if I say pepperoni! Because the two go hand in hand, pepperoni is clearly the second most often ordered pizza on our list.',
      price: 10.99,
      foodtype: 'pizza'
    },
    {
      id: '631581eb-2eef-44c5-88a2-aca9b93ff898',
      type: 'Greek Pizza',
      desc: 'It is often only topped with cheese, which is usually a mix of mozzarella and cheddar or provolone. It may feature a variety of non-Greek or Greek toppings, such as feta cheese, black olives, and red onion.',
      price: 10.99,
      foodtype: 'pizza'
    },
    {
      id: 'd266b5f6-dd98-489b-b27d-8526758007db',
      type: 'Pizza with cheese',
      desc: 'Its the little things in life that can make a big difference. Its no wonder that a plain cheese pizza reigns supreme as the King of Pizzas, given its versatility.',
      price: 10.99,
      foodtype: 'pizza'
    }
  ]
  return (
    <div id="pizza" className=' w-full   mt-10'>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>

        {/* Title */}
        <h4 className='mb-5 text-[25px] font-semibold'>Pizza</h4>

        {/* Mapped Data */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {staticPizzaData?.map((item:any,index:any)=>(
              <ItemCard data={item} key={index}/>
            ))}
        </div>

      </div>
      
    </div>
  );
}
