import React, { useRef } from "react";
import { useListBox, useOption } from "react-aria";
import { ListGroup } from "react-bootstrap";

import "../base.scss";

function ListBox(props) {
  let ref = useRef(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ListGroup
      as="ul"
      {...listBoxProps}
      ref={listBoxRef}
      variant="flush"
      className="custom-list-group"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ListGroup>
  );
}

export default ListBox;

function Option({ item, state }) {
  let ref = useRef(null);
  let { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  //   let backgroundColor;
  //   let color = "black";

  //   if (isSelected) {
  //     backgroundColor = "blueviolet";
  //     color = "white";
  //   } else if (isFocused) {
  //     backgroundColor = "gray";
  //   } else if (isDisabled) {
  //     backgroundColor = "transparent";
  //     color = "gray";
  //   }

  return (
    <ListGroup.Item
      as="li"
      {...optionProps}
      ref={ref}
      active={isSelected}
      className={isFocused ? "is-focused" : ""}
    >
      {item.rendered}
      {/* {isSelected ? <span>✓</span> : null} */}
    </ListGroup.Item>
  );
}
