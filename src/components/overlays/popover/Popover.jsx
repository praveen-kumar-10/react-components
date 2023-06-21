import React from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";

function Popover(props) {
  let ref = React.useRef(null);
  let { popoverRef = ref, state, children, isNonModal } = props;

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      {!isNonModal && (
        <div {...underlayProps} style={{ position: "fixed", inset: 0 }} />
      )}
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{
          ...popoverProps.style,
        }}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

export default Popover;
