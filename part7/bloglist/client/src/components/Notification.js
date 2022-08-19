import React from "react";
import Alert from "react-bootstrap/Alert";

const Notification = ({ message }) => (
  <Alert
    variant={message.type === "danger" ? "danger" : "success"}
    className="mt-3"
  >
    {message.message}
  </Alert>
);

export default Notification;
