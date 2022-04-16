import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import axios from "axios";

import Page from "./pages/Page";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Campgrounds from "./pages/Campgrounds";
import NewCampground from "./pages/NewCampground";
import CampgroundContent from "./pages/CampgroundContent";
import EditCampground from "./pages/EditCampground";
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
  const [state, setState] = useState({
    isLoggedIn: true,
    currentUser: { username: "admin", id: "6240b7187630b25715fcdc34" },
    loading: true,
  });
  const { isLoggedIn, currentUser, loading } = state;

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: false,
      currentCampgroundId: "",
    }));
  }, []);

  /* Hooks ==> */

  /* <== Functions */
  const toggleLogin = (loginStatus, user) => {
    setState(prevState => ({
      ...prevState,
      isLoggedIn: loginStatus,
      currentUser: user,
    }));
  };

  /* Functions ==> */
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <Navbar
        pathname={pathname}
        toggleLogin={toggleLogin}
        isLoggedIn={isLoggedIn}
        //
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Page>
              <Register />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page>
              <Login
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                toggleLogin={toggleLogin}
              />
            </Page>
          }
        />
        <Route
          path="/campgrounds"
          element={
            <Page>
              <Campgrounds isLoggedIn={isLoggedIn} />
            </Page>
          }
        />
        <Route
          path="/campgrounds/:id"
          element={
            <Page>
              <CampgroundContent
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
              />
            </Page>
          }
        />
        <Route
          path="/campgrounds/:id/edit"
          element={
            <Page>
              <EditCampground currentUser={currentUser} />
            </Page>
          }
        />
        <Route
          path="/campgrounds/new"
          element={
            <Page>
              <NewCampground currentUser={currentUser} />
            </Page>
          }
        />
      </Routes>
      <Footer pathname={pathname} />
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
