import * as React from "react";


import {  useNavigate } from "react-router-dom";

export interface ILocationProps {
    handleOpen: () => void
    
}



export default function Location({handleOpen}: ILocationProps) {
  

 const navigate = useNavigate()



  // function clearRoute(){
  //   setDirection(null)
  //   setDistance(null)
  //   setDuration(null)
  //   orginRef!.current!.value =''
  //   directionRef!.current!.value =''
    
  // }

  
  //3327 Las Vegas Blvd S ste 2710, Las Vegas, NV 89109, USA
  
  
  return (
    <div className="w-full flex items-center bg-green p-5 md:bg-gray-200/60 h-[140px]">
      {/* Content */}
      <div className="flex flex-col">
        {/* Title */}
        <h2 className="text-[35px] font-medium">Favs Pizzeria</h2>

        {/* Location */}
        <div className="flex items-center">
          <h5 className="sm:text-[15px] text-[13px] font-medium mr-2">
          3327 Las Vegas Blvd S ste 2710, Las Vegas, NV 89109, USA
          </h5>
          <span className="text-[15px] font-medium underline cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-108 duration-300 hover:text-blue-700" onClick={()=>{
            navigate("/modal")
            handleOpen()
          }}>
            More Info
          </span>
        </div>

        
      </div>
    </div>
  );
}
