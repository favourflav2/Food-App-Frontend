import React from 'react'
import {  Alert, AlertTitle } from "@mui/material";
import { Link } from 'react-router-dom';
import { Dispatch } from '../../redux/store';
import { setClearCart } from '../../redux/features/foodSlice';

export interface  SuccessPageProps {
}

export default function SuccessPage (props:  SuccessPageProps) {
    const dispatch = Dispatch()

    React.useEffect(()=>{
        dispatch(setClearCart())
        // eslint-disable-next-line
    },[])
  return (
    <div className='w-full h-screen p-4 bg-gray-200'>
      <Alert severity='success' variant='filled'>
            <AlertTitle>Success</AlertTitle>
            You have successfully made an Order {"-"}
            <strong>Congrats</strong>
                <br />
            <strong className=' mt-3'>Back to <Link to="/">Home?</Link></strong>
        </Alert>
    </div>
  );
}
