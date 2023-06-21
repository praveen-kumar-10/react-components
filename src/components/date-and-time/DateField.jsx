import React, { useEffect, useRef, useState } from "react";
import { useDateField, useDateSegment, useLocale } from "react-aria";
import { useDateFieldState } from "react-stately";
import { createCalendar } from "@internationalized/date";

import "./DateField.scss";
import { Form } from "react-bootstrap";

function DateField(props) {
  let ref = React.useRef(null);

  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let { labelProps, fieldProps } = useDateField(props, state, ref);

  const [customSegments, setCustomSegments] = useState(state?.segments ?? []);

  useEffect(() => {
    if (state?.segments) {
      let idx = state?.segments?.findIndex((item) => item?.type === "day");

      let temp = [];
      let dlidx;

      state?.segments?.forEach((segment, idx) => {
        if(segment?.type === 'day') {


        } 
      });
      //   setCustomSegments((prev) => [
      //     ...state.segments?.splice(idx, idx + 1),
      //     ...state?.segments?.splice(0, idx),
      //     ...state?.segments?.splice(idx + 2),
      //   ]);
    }
  }, [state]);

  // console.log({ state });

  return (
    <div className="wrapper">
      <Form.Label {...labelProps}>{props.label}</Form.Label>
      <div {...fieldProps} ref={ref} className="field">
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  );
}

function DateSegment({ segment, state }) {
  let ref = useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`segment ${segment.isPlaceholder ? "placeholder" : ""}`}
    >
      {segment.text}
    </div>
  );
}

export default DateField;
