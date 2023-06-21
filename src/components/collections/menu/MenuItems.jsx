import React from "react";
import { useMenu } from "react-aria";
import { useTreeState } from "react-stately";
import { ListGroup } from "react-bootstrap";

import MenuItem from "./MenuItem";
import MenuSection from "./MenuSection";

import "../base.scss";

function MenuItems(props) {
  let state = useTreeState(props);
  let { isSelection } = props;

  let ref = React.useRef(null);
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ListGroup
      as="ul"
      {...menuProps}
      ref={ref}
      variant="flush"
      className="custom-list-group"
    >
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <MenuSection
            isSelection={isSelection}
            key={item.key}
            section={item}
            state={state}
          />
        ) : (
          <MenuItem
            isSelection={isSelection}
            key={item.key}
            item={item}
            state={state}
          />
        )
      )}
    </ListGroup>
  );
}
export default MenuItems;
