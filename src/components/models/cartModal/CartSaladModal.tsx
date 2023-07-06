import * as React from "react";
import { Dispatch, UseSelector } from "../../../redux/store";
import {
  Box,
  Modal,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Divider,
  FormLabel,
  Alert,
  Collapse
} from "@mui/material";
import {  setHandleClose, updateCart } from "../../../redux/features/foodSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export interface ICartSaladModalProps {}

export default function CartSaladModal(props: ICartSaladModalProps) {
  const { saladCartModal, selectedItem } = UseSelector((state) => state.food);
  const dispatch = Dispatch();
  //console.log(selectedItem);
  const [Price, setPrice] = React.useState<number>(Number(selectedItem?.price));
  const [state, setState] = React.useState<string>(selectedItem?.state);
  const [textAera,setTextArea] = React.useState(selectedItem?.textAera)
  const [count,setCount] = React.useState<number>(selectedItem.count)
  const [open, setOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.name)

    if(event.target.name === "Full"){
        setPrice(12.99)
    }else if(event.target.name === "Half"){
        setPrice(7.99)
    }
  };

 


const totalPrice = count * Number(Price)
const error = state.length < 1 || state.length === 0

const whatWeWantToAddToCart = {
  id:selectedItem?.id,
  type:selectedItem?.type,
  desc: selectedItem?.desc,
  price: Price ,
  count: count,
  textAera: textAera,
  state: state,
  cart:true,
  typeOfModal:"saladCart",
  originalPrice: selectedItem?.price
}


  return (
    <div>
      <Modal
        open={saladCartModal}
        onClose={() => dispatch(setHandleClose("saladCart"))}
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
                  onClick={() => dispatch(setHandleClose("saladCart"))}
                  className="text-[29px]"
                />
              </Box>
              <Typography className="text-[14px] font-medium">
                {selectedItem?.desc}
              </Typography>
            </Box>

            {/* All Toppings */}
            <Box className="flex flex-col mt-[26px] mb-[15px]">
              <Box className="flex items-center justify-between">
                <Typography className="text-[15px] font-bold">Salad Selection</Typography>
                <div className="text-black border-gray-400 border p-1 rounded-md text-[14px]">
                  Required
                </div>
              </Box>

              {/* CheckBox */}

              <FormControl
                className="mt-[15px]"
                component="fieldset"
                variant="standard"
                error={error}
                required

              >
                <FormLabel component="legend">Pick One</FormLabel>
                <FormGroup>
                  <Box className="flex items-center justify-between">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state === "Full"}
                          onChange={(e) => {
                            handleChange(e);
                            //addAndSubtract();
                            
                          }}
                          name="Full"
                          sx={{
                            '&.Mui-checked': {
                              color: 'rgb(19, 170, 109)',
                            },
                          }}
                        />
                      }
                      label={<Typography className="text-[14px] font-medium">Full</Typography>}
                    />

                    <span>$12.99</span>
                  </Box>

                  {/* Sausage */}
                  <Box className="flex items-center justify-between">
                    <FormControlLabel
                      control={
                        <Checkbox
                        
                          checked={state === "Half"}
                          onChange={(e) => {
                            handleChange(e);
                            //addSausage();
                          }}
                          name="Half"
                          sx={{
                            '&.Mui-checked': {
                              color: 'rgb(19, 170, 109)',
                            },
                          }}
                        />
                      }
                      label={<Typography className="text-[14px] font-medium">Half</Typography>}
                    />
                   <span>$7.99</span>
                  </Box>

                  {/* Error */}
                    <Collapse in={open}>
                         <Alert severity="error" onClose={()=>setOpen(false)}>Please Select A Pasta</Alert>
                    </Collapse>
                  
                  
                 

                  
                </FormGroup>
              </FormControl>
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
                    if(!error){
                        dispatch(setHandleClose("saladCart"))
                        dispatch(updateCart(whatWeWantToAddToCart))
                        setTextArea("")
                        setCount(1)
                        setPrice(Number(selectedItem?.price))
                        setState("")
                    }else{
                        setOpen(true)
                    }
                }}>Update Order <Divider orientation="vertical" flexItem className="mx-2 bg-white"/> ${typeof totalPrice === 'number' && totalPrice.toFixed(2)}</Button>
            </Box>

            
          </Box>
        </Box>
      </Modal>
    </div>
  );
}