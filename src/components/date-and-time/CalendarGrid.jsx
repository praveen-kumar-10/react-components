import React from "react";

import { useCalendarGrid, useLocale } from "react-aria";
import { getWeeksInMonth } from "@internationalized/date";
import CalendarCell from "./CalendarCell";

function CalendarGrid({ state, ...props }) {
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <div {...gridProps} className="calender-wrapper">
      <div className="weekdays">
        {weekDays.map((day, index) => (
          <div className="weekday" key={index}>
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <div className="week" key={weekIndex}>
            {state.getDatesInWeek(weekIndex).map((date, i) =>
              date ? (
                <CalendarCell key={i} state={state} date={date} />
              ) : (
                <div className="day" key={i}>
                  E
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // return (
  //   <table {...gridProps}>
  //     <thead {...headerProps}>
  //       <tr>
  //         {weekDays.map((day, index) => (
  //           <th key={index}>{day}</th>
  //         ))}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
  //         <tr key={weekIndex}>
  //           {state
  //             .getDatesInWeek(weekIndex)
  //             .map((date, i) =>
  //               date ? (
  //                 <CalendarCell key={i} state={state} date={date} />
  //               ) : (
  //                 <td key={i}>E</td>
  //               )
  //             )}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
}

export default CalendarGrid;
