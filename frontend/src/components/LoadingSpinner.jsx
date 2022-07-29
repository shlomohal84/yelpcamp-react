import { Spinner } from "react-bootstrap";
function LoadingSpinner() {
  return (
    <div
      style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}
    >
      <Spinner
        animation="border"
        style={{
          position: "relative",
          marginRight: "auto",
          fontSize: "1.2em",
          width: "3em",
          height: "3em",
          // borderWidth: "0.5em",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
