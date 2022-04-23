import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
import Error404Page from "./pages/Error404Page";
/*STYLES IMPORTS <== */

/* <== COMPONENT DECLARATION*/
function App() {
  /* <== Hooks */
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useState({
    loading: true,
    username: null,
  });
  const { loading, username } = state;

  const toggleLogin = useCallback(
    username => {
      setState(prevState => ({
        ...prevState,
        username: username,
      }));
    },
    [setState]
  );

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: false,
    }));
  }, []);

  /* Hooks ==> */

  /* <== Functions */

  /* Functions ==> */
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <Navbar
        pathname={pathname}
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
              <Login toggleLogin={toggleLogin} />
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
              <CampgroundContent username={username} />
            </Page>
          }
        />
        <Route
          path="/campgrounds/:id/edit"
          element={
            <Page>
              <EditCampground username={username} />
            </Page>
          }
        />
        <Route
          path="/campgrounds/new"
          element={
            <Page>
              <NewCampground username={username} />
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="error404" replace={true} />} />
        <Route path="error404" element={<Error404Page />} />
      </Routes>
      <Footer pathname={pathname} />
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
