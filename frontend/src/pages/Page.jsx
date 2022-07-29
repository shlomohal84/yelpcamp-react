// Main page container

import { Outlet } from "react-router-dom";

function Page(props) {
  return (
    <div className="Page container mt-3" style={{ minHeight: "82.3vh" }}>
      {props.children || <Outlet />}
    </div>
  );
}

export default Page;
