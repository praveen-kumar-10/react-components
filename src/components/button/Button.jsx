import { useRef } from "react";
import { useButton } from "react-aria";

import {
  Button as BootstrapButton,
  Spinner as BootstrapSpinner,
} from "react-bootstrap";

import "./Button.scss";

// todo: Add Tooltip

export const variants = {
  primary: "Primary",
  secondary: "Secondary",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
  info: "Info",
  light: "Light",
  dark: "Dark",
  text: "Text",
  link: "Link",
};

const Button = (props) => {
  let ref = useRef();
  let {
    as,
    size,
    value,
    loader,
    endIcon,
    startIcon,
    className = "",
    isLoader = true,
    loadingIndicator,
    isLoading = false,
    variant = "primary",
    loaderPosition = "start",
    ...useButtonProps
  } = props;

  let { buttonProps } = useButton(useButtonProps, ref);

  if (as) {
    return (
      <BootstrapButton
        {...{ as, className, variant, value, size }}
        {...buttonProps}
        style={props.style}
        disabled={isLoading || buttonProps?.disabled}
      />
    );
  }

  return (
    <BootstrapButton
      {...{ className, variant, value, size }}
      {...buttonProps}
      ref={ref}
      style={props.style}
      disabled={isLoading || buttonProps?.disabled}
    >
      {isLoading && isLoader && loaderPosition === "start" && <Spinner loader={loader} />}

      {startIcon && startIcon}

      {isLoading && loadingIndicator
        ? loadingIndicator
        : props?.children && props?.children}

      {endIcon && endIcon}

      {isLoading && isLoader && loaderPosition === "end" && <Spinner loader={loader} />}
    </BootstrapButton>
  );
};

export default Button;

const Spinner = ({ loader }) => {
  if (loader) return loader;
  return (
    <BootstrapSpinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );
};


export const RButton = () => {
  return <button className="rbutton">Hello</button>
}