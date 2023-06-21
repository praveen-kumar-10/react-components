import React from "react";
import { useMenuSection } from "react-aria";
import MenuItem from "./MenuItem";
import { ListGroup } from "react-bootstrap";

function MenuSection({ section, state, isSelection }) {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      <ListGroup.Item
        as="li"
        {...itemProps}
        className="list-group-section-item"
      >
        {section.rendered && <span {...headingProps}>{section.rendered}</span>}
      </ListGroup.Item>

      <ListGroup
        as="ul"
        variant="flush"
        {...groupProps}
        className="custom-list-section-group"
      >
        {[...section.childNodes].map((node) => (
          <MenuItem
            key={node.key}
            item={node}
            state={state}
            isSelection={isSelection}
          />
        ))}
      </ListGroup>
    </>
  );
}

export default MenuSection;
