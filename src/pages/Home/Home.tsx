import * as React from "react";
import Popular from "../foodSection/Popular";
import Pizza from "../foodSection/Pizza";
import Pasta from "../foodSection/Pasta";
import Salad from "../foodSection/Salad";
import Desert from "../foodSection/Desert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, Button, Modal, Typography, IconButton, Menu, MenuItem, CircularProgress, Tooltip } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Dispatch, UseSelector } from "../../redux/store";
import {
  deleteFromCart,
  getDesert,
  getPasta,
  getPizza,
  getPopular,
  getSalad,
  setDateState,
  setHandleOpen,
  setOrderDate,
  setTimeState,
  stripePayment,
} from "../../redux/features/foodSlice";
import PizzaModal from "../../components/models/PizzaModal";
import PastaModal from "../../components/models/PastaModal";
import SaladModal from "../../components/models/SaladModal";
import DesertModal from "../../components/models/DesertModal";
import ScrollIntoView from "react-scroll-into-view";
import CartPizzaModal from "../../components/models/cartModal/CartPizzaModal";
import CartPastaModal from "../../components/models/cartModal/CartPastaModal";
import CartSaladModal from "../../components/models/cartModal/CartSaladModal";
import CartDesertModal from "../../components/models/cartModal/CartDesertModal";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openMobileDate, setOpenMobileDate] = React.useState(false);
  const handleOpenMobileDate = () => setOpenMobileDate(true);
  const handleCloseMobileDate = () => setOpenMobileDate(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  // eslint-disable-next-line
  const [value, setValue] = React.useState("pickup");

  //Menu Catergoires
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //const [orderTodayDate, setOrderTodayDate] = React.useState<any>();
  //const date = new Date();
  //const today = dayjs();
  //const aheadTenMin = dayjs().add(2, "m");
  const elevenAM = dayjs().set("hour", 11).startOf("hour");
  const eightPM = dayjs().set("hour", 20).startOf("hour");
  const fiveDaysAhead = dayjs().add(5, "day");
  //const formatDate = dayjs(date).format("ddd, MMMM D h:mma");
  // const year = dayjs().format("YYYY-MM-DD");
  // const time = dayjs().format("YYYY-MM-DDTHH:mm");
  const [expand, setExpand] = React.useState<boolean>(true);

  const { OrderDate, selectedItem, cart, DateState, TimeState,loading } = UseSelector((state) => state.food);
  const dispatch = Dispatch();
  const [datePickerState, setDatePickerState] = React.useState<Dayjs | null>(
    //dayjs(year)
    null
  );
  const [timePickerState, setTimePickerState] = React.useState<Dayjs | null>(
    //dayjs(time)
    null
  );

  //! MY react useEffect is commented is because getting the sql from my backend it taking to long.....
  //* So whenever i add anything to my sql database all i have to do is go to my backend and console log the new data array

  // React.useEffect(() => {
  //   dispatch(getPopular());
  //   dispatch(getPizza());
  //   dispatch(getPasta());
  //   dispatch(getSalad());
  //   dispatch(getDesert());
  //   // eslint-disable-next-line
  // }, []);

  // if(loading){
  //   return <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]  ">
  //     <CircularProgress />
  //   </div>
  //  }

  const subTotalPrice = cart?.reduce((a, c) => a + c.count * c.price, 0);

  //! In order to set up state for my date section/modal i need to set up my redxu state and persit it

  return (
    <div className="flex w-full h-auto p-4">
      {/* Content */}
      <div className="w-full h-full flex flex-col">
        {/* Item Modals */}
        {selectedItem?.foodtype === "pizza" && <PizzaModal />}
        {selectedItem?.foodtype === "pasta" && <PastaModal />}
        {selectedItem?.foodtype === "salad" && <SaladModal />}
        {selectedItem?.foodtype === "desert" && <DesertModal />}
        {selectedItem?.cart && selectedItem.typeOfModal === "pizzaCart" && <CartPizzaModal />}
        {selectedItem?.cart && selectedItem.typeOfModal === "pastaCart" && <CartPastaModal />}
        {selectedItem?.cart && selectedItem.typeOfModal === "saladCart" && <CartSaladModal />}
        {selectedItem?.cart && selectedItem.typeOfModal === "desertCart" && <CartDesertModal />}
        {/* Sticky Cart and Catergoreies */}
        {/* <div className="sticky top-[85px] bg-purple-300">sticky</div> */}

        {/* Grid Content Desktop */}
        <div className="md:grid md:grid-cols-[60%_40%] hidden">
          {/* Left Side Boxes */}
          <div className="flex flex-col pr-[40px]">
            {/* Categories Box */}
            <div className="w-full  sticky top-[85px] flex items-center justify-between border-b border-gray-400 bg-white ">
              {/* Left Side */}
              <div className="flex items-center w-full py-2">
                <h3 className="text-[16px] font-medium mr-2">Categories</h3>

                <IconButton onClick={handleClickMenu}>
                  <ExpandMoreIcon className="text-gray-400" />
                </IconButton>

                {/* Menu For categores */}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>
                    <ScrollIntoView selector="#popular" onClick={handleCloseMenu}>
                      <button className="mdl-button mdl-js-button mdl-button--raised">Popular</button>
                    </ScrollIntoView>
                  </MenuItem>
                  <MenuItem>
                    <ScrollIntoView selector="#pizza" onClick={handleCloseMenu}>
                      <button className="mdl-button mdl-js-button mdl-button--raised">Pizza</button>
                    </ScrollIntoView>
                  </MenuItem>
                  <MenuItem>
                    <ScrollIntoView selector="#pasta" onClick={handleCloseMenu}>
                      <button className="mdl-button mdl-js-button mdl-button--raised">Pasta</button>
                    </ScrollIntoView>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <ScrollIntoView selector="#salad" onClick={handleCloseMenu}>
                      <button className="mdl-button mdl-js-button mdl-button--raised">Salad</button>
                    </ScrollIntoView>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <ScrollIntoView selector="#desert" onClick={handleCloseMenu}>
                      <button className="mdl-button mdl-js-button mdl-button--raised">Desert</button>
                    </ScrollIntoView>
                  </MenuItem>
                </Menu>
              </div>

              <div className="border-l border border-gray-400/40 h-full mr-4"></div>

              <div className="flex items-center w-full py-2">
                <SearchIcon className="text-gray-400 text-[20px] mr-1" />
                <input
                  type="text"
                  placeholder="Search"
                  className="indent-1 border border-white rounded-md p-1 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Popualr */}
            <Popular />

            {/* Pizza */}
            <Pizza />

            {/* Pasta */}
            <Pasta />

            {/* Salad */}
            <Salad />

            {/* Desert */}
            <Desert />
          </div>

          {/* Right Side */}
          <div className="sticky top-[85px] ">
            {/* Content */}
            <div className=" flex flex-col w-full h-full">
              {/* Pick & Deleveris Button */}
              <div className="sticky top-[85px] flex items-center w-full h-[50px] ">
                <Button variant="contained" className="btnColor w-[90%] h-full rounded-3xl hover:bg-green-700" onClick={() => setValue("pickup")}>
                  Pickup
                </Button>
                <Button variant="contained" disabled className="btnColor w-[90%] h-full rounded-3xl">
                  Delivery Unavailable
                </Button>
              </div>

              {/* Date Box */}
              <div
                className="sticky top-[170px] w-full border border-gray-300 flex items-center justify-center p-4 rounded-[30px]  text-black cursor-pointer hover:border-black mt-[40px]"
                onClick={handleOpen}
              >
                <CalendarTodayIcon className=" font-light text-[18px] mr-2" />
                <h3>{OrderDate === null ? "Select A Date" : OrderDate}</h3>
              </div>

              {/* Time Picker Modal */}
              <Modal open={open} onClose={handleClose} className="">
                <Box className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] sm:w-[480px] w-[95%] bg-white h-auto rounded-2xl">
                  {/* Content */}
                  <Box className="flex flex-col w-full ">
                    {/* Title */}
                    <Box className="flex items-center justify-between p-4 h-[70px] border-b border-gray-300">
                      <Typography className=" text-[22px] font-bold">Pickup Details</Typography>
                      <CloseIcon className="text-[35px] text-gray-400" onClick={handleClose} />
                    </Box>

                    <Typography className="p-4 mt-[20px]">Order Time</Typography>

                    {/* Time Selection */}
                    <Box className="p-4">
                      <DemoContainer components={["DatePicker", "DateTimePicker", "TimePicker", "DateRangePicker"]}>
                        <Box>
                          <DemoItem label="Select Date">
                            <DatePicker
                              value={datePickerState}
                              maxDate={fiveDaysAhead}
                              disablePast
                              views={["month", "day"]}
                              onChange={(newValue) => {
                                dispatch(setDateState(newValue));
                                setDatePickerState(newValue);
                              }}
                            />
                          </DemoItem>
                        </Box>
                        <DemoItem label="Select Time">
                          <TimePicker
                            value={timePickerState}
                            minTime={elevenAM}
                            maxTime={eightPM}
                            //className=""
                            //disablePast
                            onChange={(newValue) => {
                              dispatch(setTimeState(newValue));
                              setTimePickerState(newValue);
                            }}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </Box>

                    {/* Button */}
                    <Box className="border-t-[2px] bg-gray-400 my-2"></Box>
                    <Button
                      variant="contained"
                      className="btnColor mx-4 mt-4 mb-10 h-[55px] rounded-3xl hover:bg-green-700"
                      onClick={() => {
                        dispatch(setOrderDate());
                        handleClose();
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </Modal>

              {/* Order Summary */}
              <div className="sticky top-[260px] flex w-full  rounded-3xl mt-[35px] max-h-[600px]">
                {/* Content */}
                <div className="flex flex-col w-full h-full border-[2px] border-gray-300 rounded-3xl p-4">
                  {/* Title */}
                  <div className="flex items-center justify-between border-b-[2px] border-gray-300 pb-4 pt-2">
                    <h4>Order Summary</h4>
                    {expand ? (
                      <ExpandLessIcon onClick={() => setExpand((value) => !value)} />
                    ) : (
                      <ExpandMoreIcon onClick={() => setExpand((value) => !value)} />
                    )}
                  </div>

                  {/* Mapped Data From Cart */}
                  <div className="flex flex-col w-full  overflow-auto">
                    {/* expand less card */}
                    {expand === true &&
                      cart?.map((item: any, index: any) => (
                        <div className="flex  w-full py-4 border-b border-gray-300 cursor-pointer " key={index}>
                          {/* How much items */}
                          <h5 className="mr-3 text-[14.5px] font-semibold m-0 p-0">{item?.count}</h5>

                          {/* card content */}
                          <div className="flex flex-col w-full ">
                            {/* food name */}
                            <div className="flex items-center justify-between">
                              <h5 className="text-[14.5px] font-semibold hover:underline">{item?.type}</h5>
                              <h5 className="text-[14.5px] mr-2">${item.count * item.price.toFixed(2)}</h5>
                            </div>

                            {/* {item?.howMuch ?<span className="my-2 text-[14.5px]">Full</span>: <></>} */}

                            {/* edit and Delete */}
                            <div className="flex items-center my-2">
                              <h5 className="mr-3 text-[14.5px] hover:underline cursor-pointer" onClick={() => dispatch(setHandleOpen(item))}>
                                Edit Item
                              </h5>
                              <h5 className="text-[14.5px] hover:underline cursor-pointer" onClick={() => dispatch(deleteFromCart(item))}>
                                Remove
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* not expanded card */}
                    {expand === false &&
                      cart?.map((item: any, index: any) => (
                        <div
                          className="flex w-full py-4 flex-col border-b border-gray-300 cursor-pointer group"
                          onClick={() => dispatch(setHandleOpen(item))}
                          key={index}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center mr-3">
                              <h5 className="mr-3 text-[14.5px]  font-semibold">{item?.count}</h5>
                              <h5 className="text-[14.5px] font-semibold group-hover:underline">{item?.type}</h5>
                            </div>

                            <h5 className="text-[14.5px] ">${item.count * item.price.toFixed(2)}</h5>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Checkout Button */}
                  <div className="flex flex-col w-full py-5">
                    {/* Total Price */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-bold">Subtotal</h3>
                      <h3 className="text-[18px] font-bold">${subTotalPrice.toFixed(2)}</h3>
                    </div>

                    <Tooltip
                    title="My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15
                    minutes of inactivity. So, this will cause a delay in the response if this your is the first request to my backend."
                    >
                      <Button
                        variant="contained"
                        disabled={cart.length < 1}
                        className="btnColor w-full p-3 mt-5 rounded-3xl hover:bg-green-700"
                        onClick={() => {
                          const dateState = dayjs(`${DateState} ${TimeState}`, "YYYY-MM-DD hh:mma");

                          const isAfter = dayjs(dateState).isAfter(dayjs());

                          if (OrderDate === null) {
                            return alert("Please select a date");
                          }

                          if (dayjs(timePickerState).hour() < 11) {
                            return alert("We open at 11AM");
                          } else if (dayjs(timePickerState).hour() >= 20) {
                            return alert("We close at 8PM");
                          }

                          if (isAfter) {
                            if (cart?.length) {
                              dispatch(stripePayment({ date: OrderDate, cart: cart }));
                            } else {
                              alert("Your cart is empty");
                            }
                          } else {
                            alert("The date you selected is not valid");
                          }
                        }}
                      >
                        {loading ? "Loading...": "Checkout"}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className=" w-full h-full flex-col md:hidden flex">
          {/* Order Date & Pickup & Deleivery Unavailable section */}
          <div className="h-full  w-full">
            {/* Content */}
            <div className="flex flex-col w-full h-full">
              {/* Pick & Deleveris Button */}
              <div className="flex items-center w-full h-[50px] ">
                <Button variant="contained" className="btnColor w-[90%] h-full rounded-3xl hover:bg-green-700" onClick={() => setValue("pickup")}>
                  Pickup
                </Button>
                <Button variant="contained" disabled className="btnColor w-[90%] h-full rounded-3xl">
                  Delivery Unavailable
                </Button>
              </div>

              {/* Date Box */}
              <div
                className="w-full border border-gray-300 flex items-center justify-center p-4 rounded-[30px]  text-black cursor-pointer hover:border-black mt-[10px] mb-[55px]"
                onClick={handleOpenMobileDate}
              >
                <CalendarTodayIcon className=" font-light text-[18px] mr-2" />
                <h3>{OrderDate === null ? "Select A Date" : OrderDate}</h3>
              </div>

              {/* Time Picker Modal */}
              <Modal open={openMobileDate} onClose={handleCloseMobileDate} className="">
                <Box className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] sm:w-[480px] w-[95%] bg-white h-auto rounded-2xl">
                  <Box className="flex flex-col w-full ">
                    <Box className="flex items-center justify-between p-4 h-[70px] border-b border-gray-300">
                      <Typography className=" text-[22px] font-bold">Pickup Details</Typography>
                      <CloseIcon className="text-[35px] text-gray-400" onClick={handleCloseMobileDate} />
                    </Box>

                    <Typography className="p-4 mt-[20px]">Order Time</Typography>

                    <Box className="p-4">
                      <DemoContainer components={["DatePicker", "DateTimePicker", "TimePicker", "DateRangePicker"]}>
                        <Box>
                          <DemoItem label="Select Date">
                            <DatePicker
                              value={datePickerState}
                              maxDate={fiveDaysAhead}
                              disablePast
                              views={["month", "day"]}
                              onChange={(newValue) => {
                                dispatch(setDateState(newValue));
                                setDatePickerState(newValue);
                              }}
                            />
                          </DemoItem>
                        </Box>
                        <DemoItem label="Select Time">
                          <TimePicker
                            value={timePickerState}
                            minTime={elevenAM}
                            maxTime={eightPM}
                            //className=""
                            //disablePast
                            onChange={(newValue) => {
                              dispatch(setTimeState(newValue));
                              setTimePickerState(newValue);
                            }}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </Box>

                    <Box className="border-t-[2px] border-gray-300 my-2"></Box>
                    <Button
                      variant="contained"
                      className="btnColor mx-4 mt-4 mb-10 h-[55px] rounded-3xl hover:bg-green-700"
                      onClick={() => {
                        dispatch(setOrderDate());
                        handleCloseMobileDate();
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </div>
          </div>

          {/* Food Data */}
          {/* Categories Box */}
          <div className="w-full  sticky top-[85px] flex items-center justify-between border-b border-gray-300 bg-white ">
            {/* Right Side */}
            <div className="flex items-center w-full py-2">
              <h3 className="text-[16px] font-medium">Categories</h3>
              <IconButton>
                <ExpandMoreIcon className="text-gray-400" />
              </IconButton>
            </div>

            <div className="border-l border border-gray-400/40 h-full mr-4"></div>

            <div className="flex items-center w-full py-2">
              <SearchIcon className="text-gray-400 text-[20px] mr-1" />
              <input
                type="text"
                placeholder="Search"
                className="indent-1 border border-white rounded-md p-1 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Popualr */}
          <Popular />

          {/* Pizza */}
          <Pizza />

          {/* Pasta */}
          <Pasta />

          {/* Salad */}
          <Salad />

          {/* Desert */}
          <Desert />

          {cart?.length && (
            <div className=" fixed bottom-0  rounded-3xl sm:w-[95%] w-[94%] flex justify-center items-center mb-5">
              <Button
                className="text-white sm:w-[60%] w-[70%] p-3 rounded-3xl flex items-center btnColor hover:bg-green-700 font-semibold"
                onClick={handleOpen2}
              >
                <ShoppingCartIcon className="text-[19px] mr-1" /> {cart?.length} Item in Order
              </Button>
            </div>
          )}

          {/* Cart Modal */}
          <Modal open={open2} onClose={handleClose2}>
            <div className="flex w-full h-full bg-white p-4">
              <div className="flex flex-col w-full h-full border-[2px] border-gray-300 rounded-3xl p-4">
                {/* Title */}
                <div className="flex items-center justify-between border-b-[2px] border-gray-300 pb-4 pt-2">
                  <h4>Order Summary</h4>
                  <CloseIcon onClick={handleClose2} className="text-3xl" />
                </div>

                {/* Mapped Data From Cart */}
                <div className="flex flex-col w-full  overflow-auto no-scrollbar">
                  {/* expand less card */}

                  {cart?.map((item: any, index: any) => (
                    <div className="flex  w-full py-4 border-b border-gray-300 " key={index}>
                      {/* How much items */}
                      <h5 className="mr-3 text-[14.5px] font-semibold m-0 p-0">{item?.count}</h5>

                      {/* card content */}
                      <div className="flex flex-col w-full ">
                        {/* food name */}
                        <div className="flex items-center justify-between">
                          <h5 className="text-[14.5px] font-semibold">{item?.type}</h5>
                          <h5 className="text-[14.5px] mr-2">${item.count * item.price.toFixed(2)}</h5>
                        </div>

                        {/* <span className="my-2 text-[14.5px]">Full</span> */}

                        {/* edit and Delete */}
                        <div className="flex items-center my-2">
                          <h5 className="mr-3 text-[14.5px] underline cursor-pointer" onClick={() => dispatch(setHandleOpen(item))}>
                            Edit Item
                          </h5>
                          <h5 className="text-[14.5px] underline cursor-pointer" onClick={() => dispatch(deleteFromCart(item))}>
                            Remove
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Button */}
                <div className="flex flex-col w-full py-5 h-auto">
                  {/* Total Price */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold">Subtotal</h3>
                    <h3 className="text-[18px] font-bold">${subTotalPrice.toFixed(2)}</h3>
                  </div>

                  {loading && <h1 className="text-xs pt-2 text-red-500 font-bold">My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15
            minutes of inactivity. So, this will cause a delay in the response if this your is the first request to my backend."</h1>}

                  <Button
                    variant="contained"
                    className="btnColor w-full p-3 mt-5 rounded-3xl hover:bg-green-700"
                    disabled={cart.length < 1}
                    onClick={() => {
                      const dateState = dayjs(`${DateState} ${TimeState}`, "YYYY-MM-DD hh:mma");

                      const isAfter = dayjs(dateState).isAfter(dayjs());

                      if (OrderDate === null) {
                        return alert("Please select a date");
                      }

                      if (dayjs(timePickerState).hour() < 11) {
                        return alert("We open at 11AM");
                      } else if (dayjs(timePickerState).hour() >= 20) {
                        return alert("We close at 8PM");
                      }

                      if (isAfter) {
                        if (cart?.length) {
                          dispatch(stripePayment({ date: OrderDate, cart: cart }));
                        } else {
                          alert("Your cart is empty");
                        }
                      } else {
                        alert("The date you selected is not valid");
                      }
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
