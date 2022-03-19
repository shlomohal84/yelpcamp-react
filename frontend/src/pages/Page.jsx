import React from "react";
import Footer from "../components/Footer";

function Page(props) {
  return (
    <div>
      {props.children}
      <Footer />
    </div>
  );
}

export default Page;
