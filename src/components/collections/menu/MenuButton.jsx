import React from "react";
import { useMenuTrigger, useButton } from "react-aria";
import { useMenuTriggerState } from "react-stately";

import { ReactComponent as ArrowDownIcon } from "assets/icons/arrow/chevron/chevron-down.svg";
import { ReactComponent as MoreVerticalIcon } from "assets/icons/menu/more-vertical.svg";

import Popover from "components/overlays/popover/Popover";
import MenuItems from "./MenuItems";

function MenuButton(props) {
  let state = useMenuTriggerState(props);
  const { showDropdownIcon = true, variant, onlyIcon = false } = props;

  let ref = React.useRef(null);
  let { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  return (
    <>
      <Button
        {...menuTriggerProps}
        buttonRef={ref}
        variant={variant}
        onlyIcon={onlyIcon}
      >
        {props.label && props.label}
        {showDropdownIcon && (
          <span aria-hidden="true">
            <ArrowDownIcon />
          </span>
        )}
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <MenuItems {...props} {...menuProps} />
        </Popover>
      )}
    </>
  );
}

export default MenuButton;

function Button(props) {
  let { variant = "primary", onlyIcon } = props;
  let ref = props.buttonRef;
  let { buttonProps } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`custom-button ${
        onlyIcon ? "custom-menu-button" : ""
      } ${variant}`}
    >
      {props?.children}
      {/* {variant === "secondary" ? <MoreVerticalIcon /> : props.children} */}
    </button>
  );
}
