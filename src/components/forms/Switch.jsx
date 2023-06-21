import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { useToggleState } from "react-stately";
import { useFocusRing, useSwitch } from "react-aria";

import "./base.scss";

/* 
name
value(example "low")
defaultSelected
isSelected
isDisabled
isReadOnly
onChange
feedback : {type: "valid" | "invalid", message: ""}
*/

function Switch(props) {
  let { children, name, feedback, type = "switch" } = props;
  let state = useToggleState(props);
  let ref = useRef(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { focusProps } = useFocusRing();

  return (
    <Form.Check
      className="custom-form-check"
      {...inputProps}
      {...focusProps}
      id={`${name}-switch`}
      type={type}
      ref={ref}
      label={children}
      isValid={feedback?.type === "valid"}
      isInvalid={feedback?.type === "invalid"}
    />
  );
}

export default Switch;
