import {
  Box,
  Modal,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { IconButton, Skeleton } from "@mui/material";

import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

export interface IDirectionModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  //React.Dispatch<React.SetStateAction<boolean>>
}

export default function DirectionModal({
  open,
  handleClose,
  handleOpen,
  setOpen
}: IDirectionModalProps) {
  const navigate = useNavigate();

  const [map, setMap] = React.useState<null | google.maps.Map>(null);
  const [direction, setDirection] =
    React.useState<google.maps.DirectionsResult | null>(null);
  const [duration, setDuration] = React.useState<
    google.maps.DirectionsRoute | string | null | undefined
  >(null);
  const [distance, setDistance] = React.useState<
    google.maps.DirectionsRoute | string | null | undefined
  >(null);
  const [userLocation, setUserLocation] =
    React.useState<GeolocationCoordinates | null>(null);
  const [address, setAddress] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("Pick Up");

  const naviagte = useNavigate();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position.coords);
      setUserLocation(position.coords);
    });
  }, []);

  React.useEffect(()=>{
    if(open === false){
      setOpen(true)
    }
  },[])

 

 
  //   async function userAddress() {
  //     if (userLocation) {
  //       try {
  //         setLoading(true);
  //         const res = await axios.get(
  //           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=${process.env.REACT_APP_GOOGLE_KEY}`
  //         );
  //         console.log(res.data.results[0].formatted_address);
  //         setAddress(res.data.results[0].formatted_address);
  //         setLoading(false);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   }

  //console.log(address)
  const [libraries] = React.useState<
    ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]
  >(["places"]);
  //const libraries:("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ['places']
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_KEY}`,
    libraries,
  });

  async function calculateRoute() {
    if (userLocation) {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=${process.env.REACT_APP_GOOGLE_KEY}`
        );
        console.log(res.data.results[0].formatted_address);
        setAddress(res.data.results[0].formatted_address);
        //setLoading(false);

        if (res.data.results[0].formatted_address) {
          const directionService = new google.maps.DirectionsService();
          const results = await directionService.route({
            origin: res.data.results[0].formatted_address,
            destination:
              "3327 Las Vegas Blvd S ste 2710, Las Vegas, NV 89109, USA",
            travelMode: google.maps.TravelMode.DRIVING,
          });
          console.log(results);
          setDirection(results);
          setDistance(results.routes[0]?.legs[0]?.distance?.text);
          setDuration(results.routes[0]?.legs[0]?.duration?.text);
          setLoading(false);
        } else {
          return alert("We cannot find your address");
        }
      } catch (e: any) {
        console.log(e);
        alert(e.message);
      }
    } else {
      return alert("Still fetching your location... Click again in a few");
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const hourData = [
    { day: "Monday", hour: "11:00 AM - 8:00PM" },
    { day: "Tuesday", hour: "11:00 AM - 8:00PM" },
    { day: "Wednesday", hour: "11:00 AM - 8:00PM" },
    { day: "Thursday", hour: "11:00 AM - 8:00PM" },
    { day: "Friday", hour: "11:00 AM - 8:00PM" },
    { day: "Saturday", hour: "12:00 AM - 8:00PM" },
    { day: "Sunday", hour: "12:00 AM - 8:00PM" },
  ];

  const isNonMobile = useMediaQuery("(min-width:640px)");

  const center = {
    lat: 36.12426,
    lng: -115.16812,
  };
  //3327 Las Vegas Blvd S ste 2710, Las Vegas, NV 89109, USA

  return (
    <>
      <button onClick={handleOpen}></button>
      <Modal
        open={open}
        onClose={() => {
          navigate("/");
          handleClose();
        }}
      >
        <Box className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:h-auto h-full">
          {/* Content */}
          <Box className="flex flex-col w-full h-full items-center">
            {/* Title */}
            <Box className="flex w-full sm:h-[70px] border-b border-gray-300 items-center p-4 justify-between bg-gray-100/30 modalShadow ">
              <Typography className="text-[32px] font-bold ">
                Hours & Map
              </Typography>
              <IconButton
                onClick={() => {
                  naviagte("/");
                  handleClose();
                }}
              >
                <CloseIcon className="text-[40px]"/>
              </IconButton>
            </Box>

            {/* Googele Map */}
            {loading ? 
            (
              <Skeleton width={450} height={300} sx={{ bgcolor: "grey.500",padding:0, margin:0}} />
            ) 
            : 
            !isLoaded ? 
            (
              <Skeleton width={400} height={300} sx={{ bgcolor: "grey.500" }} />
            ) 
            : 
            isNonMobile ? 
            (
              <GoogleMap
                center={center}
                zoom={11}
                mapContainerStyle={{ width: "470px", height: "200px" }}
                onLoad={(map) => setMap(map)}
                options={{
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                <MarkerF position={center} />
                {direction && <DirectionsRenderer directions={direction} />}
              </GoogleMap>
            ) 
            : 
            (
              <GoogleMap
                center={center}
                zoom={11}
                mapContainerStyle={{ width: "600px", height: "700px" }}
                onLoad={(map) => setMap(map)}
                options={{
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                <MarkerF position={center} />
                {direction && <DirectionsRenderer directions={direction} />}
              </GoogleMap>
            )}

            {/* REstureant Location */}
            <Box className="flex flex-col w-full sm:h-full  p-4">
              {/* title */}
              <Typography className="sm:text-[14.5px] text-[25px] font-semibold mb-2">
                Favs Pizzeria - Las Vegas
              </Typography>

              {/* address */}
              <Typography className="sm:text-[13.5px] text-[17px] ">
                3327 Las Vegas Blvd S ste 2710, Las Vegas, NV 89109, USA
              </Typography>

              {/* phone */}
              <Typography className="sm:text-[13.5px] text-[17px] ">(702) 754-3450</Typography>

              {/* Directions */}
              <Typography
                className="sm:text-[13.5px] text-[20px]  cursor-pointer sm:mt-2 mt-5 sm-border-0 border border-black sm:w-[100px] w-[190px] hover:underline flex justify-center  p-2 sm:p-0"
                onClick={calculateRoute}
              >
                Get Directions
              </Typography>
            </Box>

            {/* Hours */}
            <Box className="w-full h-full p-4 flex flex-col">
              {/* Tabs */}
              <Tabs
                value={value}
                onChange={handleChange}
                className="border-b border-gray-300"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "black",
                  },
                }}
              >
                <Tab
                  label={
                    <Typography className="text-black sm:text-[13px] text-[17px] font-semibold">
                      Pickup Hours
                    </Typography>
                  }
                  value="Pick Up"
                ></Tab>
                <Tab
                  label={
                    <Typography className="text-black sm:text-[13px] text-[17px] font-semibold">
                      Delivery Hours
                    </Typography>
                  }
                  value="Delivery"
                ></Tab>
              </Tabs>

              {/* Hours Data */}
              {value === "Pick Up" && (
                isNonMobile ? 
                (
                <Box className="w-full h-full py-1 flex flex-col">
                {hourData.map((item: any, index: any) => (
                  <Box
                    className="flex items-center justify-between my-[6px]"
                    key={index}
                  >
                    <Typography className="sm:text-[14px] text-[16px] font-medium">
                      {item.day}
                    </Typography>
                    <Typography className="sm:text-[14px] text-[16px] font-medium">
                      {item.hour}
                    </Typography>
                  </Box>
                ))}
              </Box>)
              :
              (
              <div className="flex flex-col h-full w-full py-3">
              <div className="flex items-center justify-between my-1">
                  <h2 className="sm:text-[14px] text-[16px] font-medium">Monday - Friday</h2>
                  <h2 className="sm:text-[14px] text-[16px] font-medium">11:00am - 8:00pm</h2>
              </div>

              <div className="flex items-center justify-between my-1">
                  <h2 className="sm:text-[14px] text-[16px] font-medium">Saturday - Sunday</h2>
                  <h2 className="sm:text-[14px] text-[16px] font-medium">12:00pm - 8:00pm</h2>
              </div>
          </div>
          )
                 
              )}
              {value === "Delivery" && (
                <Box className="w-full py-[50px] h-full flex justify-center ">
                  <Box className="w-[90%] p-2 bg-gray-400/20 h-[60px] flex items-center rounded-xl">
                    <span className="text-gray-500">Delivery Unavailable</span>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}


{/* <Box className="w-full h-full py-1 flex flex-col">
                   {hourData.map((item: any, index: any) => (
                     <Box
                       className="flex items-center justify-between my-[6px]"
                       key={index}
                     >
                       <Typography className="sm:text-[14px] text-[16px] font-medium">
                         {item.day}
                       </Typography>
                       <Typography className="sm:text-[14px] text-[16px] font-medium">
                         {item.hour}
                       </Typography>
                     </Box>
                   ))}
                 </Box> */}