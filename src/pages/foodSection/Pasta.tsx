import * as React from 'react';
import { UseSelector } from '../../redux/store';
import ItemCard from '../../components/cards/ItemCard';
export interface IPastaProps {
}

export default function Pasta (props: IPastaProps) {
  const {pastaData} = UseSelector(state => state.food)

  const staticPastaData = [
    {
      id: '2ef5e479-3611-485c-b7aa-98927846d95d',
      type: 'Fettuccine Alfredo',
      desc: 'Also known as fettuccine al burro (fettuccine with butter), fettuccine alfredo is a simple pasta dish consisting of fettuccine (flat pasta ribbons) tossed with parmesan cheese and butter. The process emulsifies the ingredients for a rich, silky finish.',
      price: '14.99',
      foodtype: 'pasta'
    },
    {
      id: '7223257a-b234-42e9-b220-7c42ebe51c85',
      type: 'Pesto Penne Pasta',
      desc: 'Freshly cooked pasta is packed with flavour when tossed in pesto, fresh cherry tomatoes, basil pesto and Parmesan cheese.',
      price: '14.99',
      foodtype: 'pasta'
    },
    {
      id: '74c9b752-f302-4b5d-99cc-04db67efcf1e',
      type: 'Spaghetti Bolognese',
      desc: 'Spaghetti bolognaise is a pasta dish consisting of spaghetti (long, thin cylindrical pasta) and a sauce made of minced beef, tomatoes, onion, bacon, red wine and herbs. It is commonly served with parmesan cheese.',
      price: '14.99',
      foodtype: 'pasta'
    },
    {
      id: 'bea5b2fb-c94a-4e85-92ae-5c44345e3fe6',
      type: 'Macaroni Cheese',
      desc: 'The dish consists of macaroni (short, tubular) pasta, baked in a cheesy bechamel sauce (also known as a Mornay sauce) in the oven.',
      price: '14.99',
      foodtype: 'pasta'
    },
    {
      id: 'fb7a7fb7-8a6c-465b-85af-4611e4f12c99',
      type: 'Ravioli',
      desc: 'ravioli fillings vary but popularly include ricotta cheese and spinach, seasoned with nutmeg, black pepper, spices and sometimes lemon rind',
      price: '14.99',
      foodtype: 'pasta'
    }
  ]
  return (
    <div id="pasta" className=' w-full   mt-10'>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>

        {/* Title */}
        <h4 className='mb-5 text-[25px] font-semibold'>Pasta</h4>

        {/* Mapped Data */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {staticPastaData?.map((item:any,index:any)=>(
              <ItemCard data={item} key={index}/>
            ))}
        </div>

      </div>
    </div>
  );
}
