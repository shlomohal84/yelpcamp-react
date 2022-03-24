import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import Page from "./pages/Page";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
  const [user, setUser] = useState({});
  /* const [currentUser, setCurrentUser] =  */
  /* <== Destructures */
  const { isLoggedIn } = appStates;
  /* Destructures ==> */

  useEffect(() => {
    async function getApi() {
      const response = await axios.get("/");
      setUser(response.data);
    }
    getApi();
  }, []);
  /* Hooks ==> */

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
              <Campgrounds />
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
      <Footer pathname={pathname} />
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
