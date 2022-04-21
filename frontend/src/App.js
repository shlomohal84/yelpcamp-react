import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import "bootstrap";

/*==>STYLES IMPORTS */
import "./components/component_styles/starability-all.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
/*STYLES IMPORTS <== */

/* <== COMPONENT DECLARATION*/
function App() {
  /* <== Hooks */
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useState({
    currentUser: {},
    loading: true,
    username: null,
  });
  const { currentUser, loading, username } = state;

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: false,
      currentCampgroundId: "",
    }));
  }, []);

  /* Hooks ==> */

  /* <== Functions */
  const toggleLogin = username => {
    setState(prevState => ({
      ...prevState,
      username: username,
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
        currentUser={currentUser}
        toggleLogin={toggleLogin}
        username={username}
        //
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Page>
              <Register toggleLogin={toggleLogin} />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page>
              <Login currentUser={currentUser} toggleLogin={toggleLogin} />
            </Page>
          }
        />
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
              <CampgroundContent currentUser={currentUser} />
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
