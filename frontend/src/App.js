import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Campgrounds from "./pages/Campgrounds";
import NewCampground from "./pages/NewCampground";
import CampgroundContent from "./pages/CampgroundContent";

/*==>STYLES IMPORTS */
//eslint-disable-next-line
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import "./components/component_styles/starability-all.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
/*STYLES IMPORTS <== */

/*==>COMPONENT DECLARATION*/
function App() {
  const { pathname } = useLocation();
  const [appStates, setAppStates] = useState({ isLoggedIn: true });
  const { isLoggedIn } = appStates;

  const toggleLogin = (state) => {
    setAppStates({ ...appStates, isLoggedIn: state });
  };
  return (
    <div className={`${pathname === "/" ? "App-root" : "App"}`}>
      <Navbar
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        toggleLogin={toggleLogin}
        //
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/campgrounds/new" element={<NewCampground />} />
        <Route path="/campgrounds/campground" element={<CampgroundContent />} />
      </Routes>
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
