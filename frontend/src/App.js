import { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

// component imports
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
import Error404Page from "./pages/Error404Page";
/*==>STYLES IMPORTS */
import "bootstrap";
import "./components/component_styles/starability-all.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import Error404Page from "./pages/Error404Page";
/*STYLES IMPORTS <== */

/* <== COMPONENT DECLARATION*/
function App() {
  /* <== Hooks */

  const routerHooks = {
    location: useLocation(),
    params: useParams(),
    navigate: useNavigate(),
  };

  const [mainAlert, setMainAlert] = useState({
    mainError: null,
    mainSuccess: null,
  });

  const handleMainAlert = (error, success) => {
    setMainAlert(prevState => ({
      ...prevState,
      mainError: error,
      mainSuccess: success,
    }));
  };
  /* Hooks ==> */

  /* <== Functions */

  /* Functions ==> */
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <div className="App">
      <Navbar {...routerHooks} handleAlert={handleMainAlert} />

      <Routes>
        <Route
          path="/"
          element={<Home {...routerHooks} handleAlert={handleMainAlert} />}
        />
        <Route
          path="/register"
          element={
            <Page>
              <Register {...mainAlert} handleAlert={handleMainAlert} />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page>
              <Login {...mainAlert} handleAlert={handleMainAlert} />
            </Page>
          }
        />
        <Route path="/campgrounds" element={<Page />}>
          <Route
            index
            element={
              <Campgrounds {...mainAlert} handleAlert={handleMainAlert} />
            }
          />
          <Route path=":id" element={<CampgroundContent {...routerHooks} />} />
          <Route path=":id/edit" element={<EditCampground />} />
          <Route
            path="new"
            element={<NewCampground handleAlert={handleMainAlert} />}
          />
        </Route>

        <Route path="/error404" element={<Error404Page />} />
        <Route path="*" element={<Navigate replace to="/error404" />} />
      </Routes>
      <Footer {...routerHooks} />
    </div>
  );
}
/*COMPONENT DECLARATION<==*/

export default App;
