// Render alert message
import React, { useState } from "react";
import { Alert } from "react-bootstrap";

export function ShowErrorMessage({ msg, handleAlert }) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    handleAlert && handleAlert(null, null);
  };
  if (show) {
    return (
      <Alert
        style={{ maxWidth: "75%" }}
        className="mx-auto"
        variant="danger"
        onClose={handleClose}
        dismissible
      >
        {msg}
      </Alert>
    );
  }
}

export function ShowSuccessMessage({ msg, handleAlert }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    handleAlert && handleAlert(null, null);
  };

  if (show) {
    return (
      <Alert
        style={{ maxWidth: "75%" }}
        className="mx-auto"
        variant="success"
        onClose={handleClose}
        dismissible
      >
        {msg}
      </Alert>
    );
  }
}
