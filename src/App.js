import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";

//eslint-disable-next-line
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
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
        <Route path="/campgrounds" element={<Campgrounds />} />
      </Routes>
    </div>
  );
}

export default App;
