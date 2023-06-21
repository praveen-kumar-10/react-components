import React from "react";
import { useCalendarCell } from "react-aria";

function CalendarCell({ state, date }) {
  let ref = React.useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <div
      {...buttonProps}
      ref={ref}
      // hidden={isOutsideVisibleRange}
      className={`day ${isSelected ? "selected" : ""} ${
        isDisabled ? "disabled" : ""
      } ${isUnavailable ? "unavailable" : ""}`}
    >
      {formattedDate}
    </div>
  );


  // return (
  //   <td {...cellProps}>
  //     <div
  //       {...buttonProps}
  //       ref={ref}
  //       hidden={isOutsideVisibleRange}
  //       className={`cell ${isSelected ? "selected" : ""} ${
  //         isDisabled ? "disabled" : ""
  //       } ${isUnavailable ? "unavailable" : ""}`}
  //     >
  //       {formattedDate}
  //     </div>
  //   </td>
  // );
}

export default CalendarCell;
