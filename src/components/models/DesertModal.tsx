import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import {
  Box,
  Modal,
  Typography,

  Button,
  Divider,
  
} from "@mui/material";
import { addToCart, setHandleClose } from "../../redux/features/foodSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {v4 as uuidv4} from 'uuid';

export interface IDesertModalProps {}

export default function DesertModal(props: IDesertModalProps) {
  const {desertModal, selectedItem } = UseSelector((state) => state.food);
  const dispatch = Dispatch();
  //console.log(selectedItem);
  const [Price, setPrice] = React.useState<number>(Number(selectedItem?.price));
  const [count,setCount] = React.useState<number>(1)
  const [textAera,setTextArea] = React.useState("")

 


const totalPrice = count * Number(Price)
//uuidv4(),

const whatWeWantToAddToCart = {
  id:uuidv4(),
  type:selectedItem?.type,
  desc: selectedItem?.desc,
  price: Price ,
  count: count,
  textAera: textAera,
  cart:true,
  typeOfModal:"desertCart",
  originalPrice: selectedItem?.price
}



  return (
    <div>
      <Modal
        open={desertModal}
        onClose={() => dispatch(setHandleClose("desert"))}
      >
        <Box className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[580px] bg-white sm:h-auto h-full sm:rounded-3xl">
          {/* Content */}
          <Box className="flex flex-col w-full h-full p-6">
            {/* Title */}
            <Box className="flex flex-col w-full border-b border-gray-400 pb-8">
              <Box className="flex items-center justify-between mb-2">
                <Typography className="text-[20px] font-bold">
                  {selectedItem?.type}
                </Typography>
                <CloseIcon
                  onClick={() => dispatch(setHandleClose("desert"))}
                  className="text-[29px]"
                />
              </Box>
              <Typography className="text-[14px] font-medium">
                {selectedItem?.desc}
              </Typography>
            </Box>

            

            {/* Special Instrutions */}
            <Box className="border-t border-gray-400 mb-5 flex flex-col w-full relative">
                <Typography className="my-5 text-[14px] font-bold">Special Instructions</Typography>

                <textarea name="" id="" value={textAera} maxLength={80} className="border border-gray-400 h-[120px] resize-none p-2 text-[15px]" onChange={(e)=>setTextArea(e.target.value)}></textarea>
                <span className=" absolute bottom-0 right-1">80</span>
            </Box>
            
            {/* Horizontal Line */}
            <div className="w-full border-t border-gray-400 py-2"></div>

            {/* Price */}
            <Box className="flex sm:items-center w-full flex-col sm:flex-row justify-center sm:justify-normal">
                
                {/* Count Object */}
                <div className="flex items-center w-full justify-center sm:justify-normal mb-6 sm:mb-0">
                    <Button variant="outlined" disabled={count === 1} className="border border-black h-[35px] w-full text-black btnColorHover p-3" onClick={()=>{
                        setCount(item => item - 1)
                       
                    }}><RemoveIcon /></Button>
                    <span className="mx-4">{count}</span>
                    <Button variant="outlined" className="border border-black h-[35px] w-full text-black btnColorHover p-3" onClick={()=>{
                        setCount(item => item + 1)
                       
                    }}><AddIcon /></Button>
                </div>

                {/* Add To Order Button */}
                <Button variant="contained" className="btnColor text-white w-full sm:ml-5 p-3 rounded-3xl hover:bg-green-700" onClick={()=>{

                        dispatch(addToCart(whatWeWantToAddToCart))
                        dispatch(setHandleClose("desert"))
                        setTextArea("")
                        setCount(1)
                        setPrice(Number(selectedItem?.price))
                        
                   
                }}>Add to order <Divider orientation="vertical" flexItem className="mx-2 bg-white"/> ${typeof totalPrice === 'number' && totalPrice.toFixed(2)}</Button>
            </Box>

            
          </Box>
        </Box>
      </Modal>
    </div>
  );
}