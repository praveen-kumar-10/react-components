import React from "react";
import { useTextField } from "react-aria";
import { Form } from "react-bootstrap";

import "./base.scss";

function TextField(props) {
  let { label, feedback } = props;
  let ref = React.useRef(null);
  let { labelProps, inputProps } = useTextField(
    { ...props, inputElementType: props?.as },
    ref
  );

  return (
    <div className="custom-text-field">
      <Form.Label {...labelProps}>{label}</Form.Label>
      <Form.Control
        as={props?.as}
        {...inputProps}
        ref={ref}
        isValid={feedback?.type === "valid"}
        isInvalid={feedback?.type === "invalid"}
      />

      {feedback?.type && (
        <Form.Control.Feedback type={feedback?.type}>
          {feedback?.message ?? ""}
        </Form.Control.Feedback>
      )}
    </div>
  );
}

export default TextField;
