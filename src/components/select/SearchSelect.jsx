import React from "react";

import { ReactComponent as ArrowDownIcon } from "assets/icons/arrow/chevron/chevron-down.svg";

import { useButton, useComboBox, useFilter } from "react-aria";
import { Item, useComboBoxState } from "react-stately";

import ListBox from "components/collections/listbox/ListBox";
import Popover from "components/overlays/popover/Popover";
import { Form, InputGroup } from "react-bootstrap";

import "./Select.scss";

/*
defaultInputValue
items
selectedKey
onSelectionChange
allowsCustomValue
inputValue
onInputChange
disabledKeys
isDisabled
*/

// Reference: https://react-spectrum.adobe.com/react-aria/useComboBox.html

const CustomSearchSelect = (props) => {
  const { feedback } = props;

  let { contains } = useFilter({ sensitivity: "base" });

  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  let { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div className="custom-search-select">
      <Form.Label {...labelProps}>{props?.label}</Form.Label>

      <InputGroup>
        <Form.Control
          {...inputProps}
          ref={inputRef}
          isValid={feedback?.type === "valid"}
          isInvalid={feedback?.type === "invalid"}
        />
        <span
          {...buttonProps}
          ref={buttonRef}
          aria-hidden="true"
          className="input-group-text"
        >
          <ArrowDownIcon />
        </span>

        {feedback?.type && (
          <Form.Control.Feedback type={feedback?.type}>
            {feedback?.message ?? ""}
          </Form.Control.Feedback>
        )}

        {state.isOpen && (
          <Popover
            state={state}
            triggerRef={inputRef}
            popoverRef={popoverRef}
            isNonModal
            placement="bottom start"
          >
            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
          </Popover>
        )}
      </InputGroup>
    </div>
  );
};

const SearchSelect = (props) => {
  const { optionKey, optionValue, ...restProps } = props;

  return (
    <CustomSearchSelect {...restProps}>
      {(item) => (
        <Item key={optionKey ? item[optionKey] : item?.id}>
          {optionValue ? item[optionValue] : item.name}
        </Item>
      )}
    </CustomSearchSelect>
  );
};

export default SearchSelect;
