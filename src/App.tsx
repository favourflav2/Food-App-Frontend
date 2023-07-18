import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Location from "./components/navbar/Location";
//import DirectionModal from "./components/models/DirectionModal";
//import Home from "./pages/Home/Home";
import SuccessPage from "./pages/Stripe/Success";
import ErrorPage from "./pages/Stripe/Error";

const Home = lazy(() => import("./pages/Home/Home"))
const DirectionModal = lazy(() => import("./components/models/DirectionModal"))

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
          <Route path="/" element={
            <Suspense fallback={<div className="homebg w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
              <Home />
            </Suspense>
          } />

          <Route
            path="/modal"
            element={
              <Suspense fallback={<div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:h-auto h-full"><div>Loading...</div></div>}>
                <DirectionModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                setOpen={setOpen}
              />
              </Suspense>
            }
          />

          <Route path="/success" element={
            <Suspense fallback={<div className="homebg w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
              <SuccessPage />
            </Suspense>
          } />
          <Route path="/error" element={
            <Suspense fallback={<div className="homebg w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
              <ErrorPage />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
