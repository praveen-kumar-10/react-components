import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { useCheckbox } from "react-aria";
import { useToggleState } from "react-stately";

import "./base.scss";

/* 
name
value
defaultSelected
isSelected
isIndeterminate
isDisabled
isReadOnly
onChange
feedback : {type: "valid" | "invalid", message: ""}
*/

const Checkbox = (props) => {
  let { children, name, feedback, type = "checkbox" } = props;
  let state = useToggleState(props);
  let ref = useRef(null);
  let { inputProps } = useCheckbox(props, state, ref);

  return (
    <Form.Check
      type={type}
      className="custom-form-check"
      id={`${name}-checkbox`}
    >
      <Form.Check.Input
        {...inputProps}
        type={type}
        ref={ref}
        isValid={feedback?.type === "valid"}
        isInvalid={feedback?.type === "invalid"}
      />

      {children && <Form.Check.Label>{children}</Form.Check.Label>}

      {feedback?.type && (
        <Form.Control.Feedback type={feedback?.type}>
          {feedback?.message ?? ""}
        </Form.Control.Feedback>
      )}
    </Form.Check>
  );
};

export default Checkbox;
