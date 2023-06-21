import React from "react";
import { useRadioGroupState } from "react-stately";
import { useRadio, useRadioGroup } from "react-aria";
import { Form } from "react-bootstrap";

import "./base.scss";

let RadioContext = React.createContext(null);

function RadioGroup(props) {
  let { children, label, description, errorMessage, validationState } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className="custom-radio-group">
      <Form.Label {...labelProps}>{label}</Form.Label>
      <RadioContext.Provider value={state}>
        <div className="radio-options-wrapper">{children}</div>
      </RadioContext.Provider>
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {errorMessage && validationState === "invalid" && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

function CustomRadio(props) {
  let { children, name, value, feedback, type = "radio" } = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let { inputProps } = useRadio(props, state, ref);

  return (
    <Form.Check type={type} className="custom-form-check" id={`${value}-radio`}>
      <Form.Check.Input
        {...inputProps}
        type={type}
        ref={ref}
        isValid={feedback?.type === "valid"}
        isInvalid={feedback?.type === "invalid"}
      />
      <Form.Check.Label>{children}</Form.Check.Label>

      {feedback?.type && (
        <Form.Control.Feedback type={feedback?.type}>
          {feedback?.message ?? ""}
        </Form.Control.Feedback>
      )}
    </Form.Check>
  );
}

const Radio = (props) => {
  const { items, name, ...restProps } = props;
  return (
    <RadioGroup {...restProps}>
      {Object.entries(items)?.map(([key, value]) => (
        <CustomRadio name={name} value={key}>
          {value}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
};

export default Radio;
