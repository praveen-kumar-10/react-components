import React from "react";

import { Item, useSelectState } from "react-stately";
import { HiddenSelect, useSelect, useButton } from "react-aria";

import Popover from "components/overlays/popover/Popover";
import ListBox from "components/collections/listbox/ListBox";
import { Form } from "react-bootstrap";

import "./Select.scss";

/*
items
selectedKey
onSelectionChange
disabledKeys
isDisabled
*/

function CustomSelect(props) {
  const { feedback } = props;

  let state = useSelectState(props);

  let ref = React.useRef(null);

  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  return (
    <div className="custom-select">
      <Form.Label {...labelProps}>{props?.label}</Form.Label>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button
        className={`form-select ${feedback?.type && `is-${feedback?.type}`}`}
        {...triggerProps}
        buttonRef={ref}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        {/* <span aria-hidden="true">
          <ArrowDownIcon />
        </span> */}
      </Button>

      {feedback?.type && (
        <Form.Control.Feedback type={feedback?.type}>
          {feedback?.message ?? ""}
        </Form.Control.Feedback>
      )}

      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}

const Select = (props) => {
  const { optionKey, optionValue, ...restProps } = props;
  return (
    <CustomSelect
      {...restProps}
      // feedback={{ type: "invalid", message: "Hello" }}
    >
      {(item) => (
        <Item key={optionKey ? item[optionKey] : item?.id}>
          {optionValue ? item[optionValue] : item.name}
        </Item>
      )}
    </CustomSelect>
  );
};

export default Select;

function Button(props) {
  let ref = props.buttonRef;
  let { buttonProps } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={props?.className}
      style={props.style}
    >
      {props.children}
    </button>
  );
}
