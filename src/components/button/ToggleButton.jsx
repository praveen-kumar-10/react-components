import React, { useRef } from "react";
import { useToggleButton } from "react-aria";
import { useToggleState } from "react-stately";
import { ToggleButton as BootstrapToggleButton } from "react-bootstrap";

import "./Button.scss";

// todo: Add Tooltip

const ToggleButton = (props) => {
  let ref = useRef();
  let state = useToggleState(props);
  let { buttonProps, isPressed } = useToggleButton(props, state, ref);

  const {...restProps} = buttonProps

  return (
    <BootstrapToggleButton
      className={`custom-button ${state?.isSelected ? "primary" : "secondary"}`}
      ispressed={isPressed?.toString()}
      {...buttonProps}
      ref={ref}
    >
      {props.children}
    </BootstrapToggleButton>
  );
};

export default ToggleButton;
