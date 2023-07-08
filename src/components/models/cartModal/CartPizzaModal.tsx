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
} from "@mui/material";
import {
  setHandleClose,
  updateCart,
} from "../../../redux/features/foodSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


export interface ICartPizzaModalProps {}

export default function CartPizzaModal(props: ICartPizzaModalProps) {
  interface CheckboxState {
    Mushrooms: boolean;
    Olives: boolean;
    Pepperoni: boolean;
    Pineapple: boolean;
    Sausage: boolean;
    Spinach: boolean;
  }

  const { pizzaCartModal, selectedItem, loading} = UseSelector(
    (state) => state.food
  );
  const dispatch = Dispatch();
  //console.log(selectedItem);
  const [Price, setPrice] = React.useState<number>(Number(selectedItem?.price));
  const [state, setState] = React.useState<CheckboxState>(selectedItem?.state);
  const [textAera, setTextArea] = React.useState(selectedItem?.textAera);
  const [count, setCount] = React.useState<number>(selectedItem?.count);
 
  const arr = [
    "Pepperoni",
    "Sausage",
    "Pineapple",
    "Mushrooms",
    "Olives",
    "Spinach",
  ];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((value) => {
      return {
        ...value,
        [event.target.name]: event.target.checked,
      };
    });
    //console.log(event.target.checked);
    arr.filter((item) => {
      if (event.target.name === item) {
        if (event.target.checked === true) {
          setPrice((value) => (value += 1.5));
        } else {
          setPrice((value) => value - 1.5);
        }
      }
      return false;
    });
  };

  //   function addAndSubtract() {
  //     if (state.Pepperoni === false) {
  //       setPrice((value) => (value += 1.5));
  //     } else {
  //       setPrice((value) => value - 1.5);
  //     }
  //   }

  //   function addSausage() {
  //     if (state.Sausage === false) {
  //       setPrice((value) => (value += 1.5));
  //     } else {
  //       setPrice((value) => value - 1.5);
  //     }
  //   }

  //   function addPineApple() {
  //     if (state.Pineapple === false) {
  //       setPrice((value) => (value += 1.5));
  //     } else {
  //       setPrice((value) => value - 1.5);
  //     }
  //   }



  const totalPrice = Price * count;
  const whatWeWantToAddToCartUpdate = {
    id: selectedItem?.id,
    type: selectedItem?.type,
    desc: selectedItem?.desc,
    price: Price,
    count: count,
    textAera: textAera,
    state: state,
    cart: true,
    typeOfModal: "pizzaCart",
    originalPrice: selectedItem?.originalPrice,
  };

  return (
    <div>
      {loading ? (
        <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[580px] bg-white sm:h-auto w-full h-full sm:rounded-3xl"></div>
      ) : (
        <Modal
          open={pizzaCartModal}
          onClose={() => dispatch(setHandleClose("pizzaCart"))}
        >
          <Box className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[580px] bg-white sm:h-auto h-full sm:rounded-3xl">
            {/* Content */}
            <Box className="flex flex-col w-full h-full sm:p-4 p-4">
              {/* Title */}
              <Box className="flex flex-col w-full border-b border-gray-400 sm:pb-2 pb-2">
                <Box className="flex items-center justify-between mb-2">
                  <Typography className="text-[20px] font-bold">
                    {selectedItem?.type}
                  </Typography>
                  <CloseIcon
                    onClick={() => dispatch(setHandleClose("pizzaCart"))}
                    className="text-[29px]"
                  />
                </Box>
                <Typography className="sm:text-[12px] text-[12px] font-medium">
                  {selectedItem?.desc}
                </Typography>
              </Box>

              {/* All Toppings */}
              <Box className="flex flex-col mt-[2px] mb-[5px]">
                <Box className="flex items-center justify-between">
                  <Typography className="text-[15px] font-bold">
                    Meat Toppings
                  </Typography>
                  <div className="text-black border-gray-400 border p-1 rounded-md text-[14px]">
                    Optional
                  </div>
                </Box>

                {/* CheckBox */}

                <FormControl
                  className="mt-[5px]"
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    <Box className="flex items-center justify-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Pepperoni}
                            onChange={(e) => {
                              handleChange(e);
                              //addAndSubtract();
                            }}
                            name="Pepperoni"
                            sx={{
                              "&.Mui-checked": {
                                color: "rgb(19, 170, 109)",
                              },
                            }}
                          />
                        }
                        label={
                          selectedItem?.type === "Chicago Pizza" &&
                          "Pepperoni Pizza" &&
                          "Meat Pizza" ? (
                            <Typography className="text-[14px] font-medium">
                              Extra Pepperoni
                            </Typography>
                          ) : (
                            <Typography className="text-[14px] font-medium">
                              Pepperoni
                            </Typography>
                          )
                        }
                      />

                      <span>$1.50</span>
                    </Box>

                    {/* Sausage */}
                    <Box className="flex items-center justify-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Sausage}
                            onChange={(e) => {
                              handleChange(e);
                              //addSausage();
                            }}
                            name="Sausage"
                            sx={{
                              "&.Mui-checked": {
                                color: "rgb(19, 170, 109)",
                              },
                            }}
                          />
                        }
                        label={
                          selectedItem?.type === "Chicago Pizza" &&
                          "Meat Pizza" ? (
                            <Typography className="text-[14px] font-medium">
                              Extra Sausage
                            </Typography>
                          ) : (
                            <Typography className="text-[14px] font-medium">
                              Sausage
                            </Typography>
                          )
                        }
                      />
                      <span>$1.50</span>
                    </Box>

                    {/* horizontal line */}
                    <div className="border-b border-gray-400 py-2"></div>

                    {/* Title for veggies */}
                    <Box className="flex items-center justify-between pt-1 mb-[5px]">
                      <Typography className="text-[15px] font-bold">
                        Veggie Toppings
                      </Typography>
                      <div className="text-black border-gray-400 border p-1 rounded-md text-[14px]">
                        Optional
                      </div>
                    </Box>

                    {/* Veggies */}

                    {/* Pineapple */}
                    <Box className="flex items-center justify-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Pineapple}
                            onChange={(e) => {
                              handleChange(e);
                              //addPineApple();
                            }}
                            name="Pineapple"
                            sx={{
                              "&.Mui-checked": {
                                color: "rgb(19, 170, 109)",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography className="text-[14px] font-medium">
                            Pineapple
                          </Typography>
                        }
                      />
                      <span>$1.50</span>
                    </Box>

                    {/* Mushrooms */}
                    <Box className="flex items-center justify-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Mushrooms}
                            onChange={(e) => {
                              handleChange(e);
                              //addMushrooms();
                            }}
                            name="Mushrooms"
                            sx={{
                              "&.Mui-checked": {
                                color: "rgb(19, 170, 109)",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography className="text-[14px] font-medium">
                            Mushrooms
                          </Typography>
                        }
                      />
                      <span>$1.50</span>
                    </Box>

                    {/* Black Olives */}
                    <Box className="flex items-center justify-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Olives}
                            onChange={(e) => {
                              handleChange(e);
                              //addOlives();
                            }}
                            name="Olives"
                            sx={{
                              "&.Mui-checked": {
                                color: "rgb(19, 170, 109)",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography className="text-[14px] font-medium">
                            Black Olives
                          </Typography>
                        }
                      />
                      <span>$1.50</span>
                    </Box>

                    {/* Spinach */}
                    <Box className="flex items-center justify-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Spinach}
                            onChange={(e) => {
                              handleChange(e);
                              //addSpinach();
                            }}
                            name="Spinach"
                            sx={{
                              "&.Mui-checked": {
                                color: "rgb(19, 170, 109)",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography className="text-[14px] font-medium">
                            Spinach
                          </Typography>
                        }
                      />
                      <span>$1.50</span>
                    </Box>
                  </FormGroup>
                </FormControl>
              </Box>

              {/* Special Instrutions */}
              <Box className="border-t border-gray-400 sm:mb-5 mb-3 flex flex-col w-full relative">
                <Typography className="sm:my-5 my-2 text-[14px] font-bold">
                  Special Instructions
                </Typography>

                <textarea
                  name=""
                  id=""
                  value={textAera}
                  maxLength={80}
                  className="border border-gray-400 h-[80px] resize-none p-2 text-[15px]"
                  onChange={(e) => setTextArea(e.target.value)}
                ></textarea>
                <span className=" absolute bottom-0 right-1">80</span>
              </Box>

              {/* Horizontal Line */}
              <div className="w-full border-t border-gray-400 py-2"></div>

              {/* Price */}
              <Box className="flex sm:items-center w-full flex-col sm:flex-row justify-center sm:justify-normal">
                {/* Count Object */}
                <div className="flex items-center w-full justify-center sm:justify-normal mb-4 sm:mb-0">
                  <Button
                    variant="outlined"
                    disabled={count === 1}
                    className="border border-black h-[35px] w-full text-black btnColorHover p-3"
                    onClick={() => {
                        // if we have 2 item price(value) === 10.99
                      
                      setCount((item) => item - 1);
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                  <span className="mx-4">{count}</span>
                  <Button
                    variant="outlined"
                    className="border border-black h-[35px] w-full text-black btnColorHover p-3"
                    onClick={() => {
                      
                      setCount((item) => item + 1);
                    }}
                  >
                    <AddIcon />
                  </Button>
                </div>

                {/* Add To Order Button */}
                <Button
                  variant="contained"
                  className="btnColor text-white sm:w-full sm:ml-5 p-3 rounded-3xl hover:bg-green-700 mt-1 sm:mt-0"
                  onClick={() => {
                    console.log("Update");
                    dispatch(updateCart(whatWeWantToAddToCartUpdate));
                    dispatch(setHandleClose("pizzaCart"));
                  }}
                >
                  Update Order{" "}
                  <Divider
                    orientation="vertical"
                    flexItem
                    className="mx-2 bg-white"
                  />{" "}
                  ${typeof Price === "number" && totalPrice.toFixed(2)}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}
//Spinach
