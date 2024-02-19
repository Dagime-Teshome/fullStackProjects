import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visibility, SetVisibility] = useState(false);
  const showWhenVisible = { display: visibility ? "" : "none" };
  const hideWhenVisible = { display: visibility ? "none" : "" };
  const toggleVisibility = () => {
    SetVisibility(!visibility);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;
