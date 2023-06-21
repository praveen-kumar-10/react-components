import React from "react";

import { useCalendar, useLocale, useButton } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";

import { ReactComponent as ArrowLeftIcon } from "assets/icons/arrow/triangle/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow/triangle/arrow-right.svg";

import CalendarGrid from "./CalendarGrid";

import "./base.scss";

function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="custom-calendar">
      <div className="header">
        <Button {...prevButtonProps}>
          <ArrowLeftIcon />
        </Button>
        <span>{title}</span>
        <Button {...nextButtonProps}>
          <ArrowRightIcon />
        </Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

export default Calendar;

function Button(props) {
  let ref = React.useRef(null);
  let { buttonProps } = useButton(props, ref);
  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
