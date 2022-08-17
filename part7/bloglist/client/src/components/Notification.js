import React from "react";

const Notification = ({ message }) => (
  <p
    style={
      message.type === "danger"
        ? {
            backgroundColor: "#f1f1f1",
            color: "red",
            border: "2px solid red",
            padding: "5px",
          }
        : {
            backgroundColor: "#f1f1f1",
            color: "green",
            border: "2px solid green",
            padding: "5px",
          }
    }
  >
    {message.message}
  </p>
);

export default Notification;
