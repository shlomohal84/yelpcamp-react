import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import Page from "./pages/Page";
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

/* <== COMPONENT DECLARATION*/
function App() {
  /* <== Hooks */
  const { pathname } = useLocation();
  const [appStates, setAppStates] = useState({ isLoggedIn: false });
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    console.clear();
    async function getApi() {
      try {
        const response = await axios({
          method: "GET",
          url: "/campgrounds",
        });
        setCampgrounds(response.data);
        console.log("API data loaded successfully");
      } catch (error) {
        setCampgrounds([]);
        console.error(error);
      }
    }
    getApi();
  }, []);
  /* Hooks ==> */

  /* <== Destructures */
  const { isLoggedIn } = appStates;
  /* Destructures ==> */

  /* <== Functions */
  const toggleLogin = state => {
    setAppStates({ ...appStates, isLoggedIn: state });
  };

  /* Functions ==> */

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
        <Route
          path="/campgrounds"
          element={
            <Page>
              <Campgrounds campgrounds={campgrounds} />
            </Page>
          }
        />
        <Route
          path="/campgrounds/:id"
          element={
            <Page>
              <CampgroundContent />
            </Page>
          }
        />
        <Route path="/campgrounds/new" element={<NewCampground />} />
      </Routes>
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
