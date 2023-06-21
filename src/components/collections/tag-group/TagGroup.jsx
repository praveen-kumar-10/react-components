import React from "react";
import { Item, useListState } from "react-stately";
import { Form } from "react-bootstrap";
import { useFocusRing, useTag, useTagGroup } from "react-aria";

import { ReactComponent as CloseIcon } from "assets/icons/close/close.svg";

import Button from "components/button/Button";

import "../base.scss";

/*
selectionMode
selectedKeys
onSelectionChange
items
onRemove
disabledKeys
*/

function CustomTagGroup(props) {
  let { label, feedback } = props;
  let ref = React.useRef(null);

  let state = useListState(props);
  let { gridProps, labelProps } = useTagGroup(props, state, ref);

  return (
    <div className="custom-tag-group">
      <Form.Label {...labelProps}>{label}</Form.Label>
      <div {...gridProps} ref={ref} className="tags-wrapper">
        {[...state.collection].map((item) => (
          <Tag key={item.key} item={item} state={state} />
        ))}
      </div>

      {feedback?.type && (
        <Form.Control.Feedback type={feedback?.type}>
          {feedback?.message ?? ""}
        </Form.Control.Feedback>
      )}
    </div>
  );
}

function Tag(props) {
  let { item, state } = props;
  let ref = React.useRef(null);
  let { focusProps, isFocusVisible } = useFocusRing({ within: true });
  let { rowProps, gridCellProps, removeButtonProps, allowsRemoving } = useTag(
    props,
    state,
    ref
  );

  console.log({ rowProps, gridCellProps, state });

  return (
    <div
      ref={ref}
      {...rowProps}
      {...focusProps}
      data-focus-visible={isFocusVisible}
      className="tag-wrapper"
    >
      <div {...gridCellProps} className="tag">
        <span>{item.rendered}</span>
        {allowsRemoving && (
          <Button
            {...removeButtonProps}
            variant={rowProps["aria-selected"] ? "primary" : "secondary"}
          >
            <CloseIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

const TagGroup = (props) => {
  return (
    <CustomTagGroup {...props}>
      {(item) => <Item>{item.name}</Item>}
    </CustomTagGroup>
  );
};

export default TagGroup;
