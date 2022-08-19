import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, ref) => {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible((pastVisible) => !pastVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="my-3">
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outline-secondary" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
