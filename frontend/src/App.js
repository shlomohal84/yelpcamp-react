import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
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

  const routerHooks = {
    location: useLocation(),
    params: useParams(),
    navigate: useNavigate(),
  };
  const [state, setState] = useState({
    loading: true,
  });
  const { username } = state;

  // const toggleLogin = useCallback(
  //   username => {
  //     setState(prevState => ({
  //       ...prevState,
  //       username: username,
  //     }));
  //   },
  //   [setState]
  // );

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: false,
    }));
  }, []);

  /* Hooks ==> */

  /* <== Functions */

  /* Functions ==> */
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <div className="App">
      <Navbar {...routerHooks} />
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
            // <Page>
            <Login />
            // </Page>
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
              <CampgroundContent />
            </Page>
          }
        />
        <Route
          path="/campgrounds/:id/edit"
          element={
            <Page>
              <EditCampground />
            </Page>
          }
        />
        <Route
          path="/campgrounds/new"
          element={
            <Page>
              <NewCampground />
            </Page>
          }
        />
        {/* <Route path="*" element={<Error404Page />} /> */}
        {/* <Route path="error404" element={<Error404Page />} /> */}
      </Routes>
      <Footer /* pathname={pathname} */ />
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
