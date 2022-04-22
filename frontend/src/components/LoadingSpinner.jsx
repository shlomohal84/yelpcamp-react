import { Spinner } from "react-bootstrap";
function LoadingSpinner() {
  return (
    <>
      <Spinner
        animation="border"
        variant="primary"
        style={{
          position: "absolute",
          top: "45%",
          left: "45%",
          width: "10em",
          height: "10em",
          borderWidth: "1em",
        }}
      />
    </>
  );
}

export default LoadingSpinner;
