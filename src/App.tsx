import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Location from "./components/navbar/Location";
import DirectionModal from "./components/models/DirectionModal";
import Home from "./pages/Home/Home";
import SuccessPage from "./pages/Stripe/Success";
import ErrorPage from "./pages/Stripe/Error";

function App() {
  // Open State for googel maps
  //* This allows me to only call the googel maps api when we are directed to the page
  //! Instead of calling the google api everytime the page is rendered
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="">
      <BrowserRouter>
        <NavBar />
        <Location handleOpen={handleOpen} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/modal"
            element={
              <DirectionModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                setOpen={setOpen}
              />
            }
          />

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
