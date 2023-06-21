import React from "react";

import { useMenuItem } from "react-aria";
import { Form, ListGroup } from "react-bootstrap";

import "../base.scss";
import Checkbox from "components/forms/Checkbox";
import Switch from "components/forms/Switch";

function MenuItem({ item, state, isSelection }) {
  // Get props for the menu item element
  let ref = React.useRef(null);
  let { menuItemProps, isFocused, isSelected, isDisabled } = useMenuItem(
    { key: item.key },
    state,
    ref
  );

  return (
    <ListGroup.Item
      as="li"
      {...menuItemProps}
      ref={ref}
      active={isSelection ? false : isSelected}
      className={`${isFocused ? "is-focused" : ""}`}
    >
      {item.rendered}
      {isSelection && <Switch name={item?.rendered} isSelected={isSelected} />}
      {/* {isSelection && <Form.Check type="switch" checked={isSelected} />} */}
      {/* {isSelected && <span aria-hidden="true">✅</span>} */}
    </ListGroup.Item>
  );
}

export default MenuItem;
