import { useRef, useMemo } from "react";

import "./Button.scss";

// todo: Add Tooltip
// todo: Add Different custom Loader Animation or use 'react-spinners'
// * refer: https://cssloaders.github.io/, https://loading.io/css/

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
    // as,
    size = "md",
    endIcon,
    startIcon,
    className = "",
    variant = "primary",

    loader,
    isLoading = false,
    isLoader = true,
    loaderAnimation,
    loaderSize,
    loadingIndicator,
    loaderPosition = "start",

    // todo: if useButton is used then remove isDisabled and buttonProps
    isDisabled,
    ...buttonProps
    // ...useButtonProps
  } = props;

  const buttonClassName = useMemo(() => {
    let clsName = `btn btn-${variant} btn-${size}`;

    clsName && (clsName += ` ${className}`);

    return clsName;
  }, [className, size, variant]);

  // todo: add if want to use reat-aria-button
  // let { buttonProps } = useButton({...useButtonProps, onPress: onClick}, ref);

  // todo: add if want to replace the button with react-bootstrap-button
  // if (as) {
  //   return (
  //     <button
  //       {...{ as, className, variant, value, size }}
  //       {...buttonProps}
  //       style={props.style}
  //       disabled={isLoading || buttonProps?.disabled}
  //     />
  //   );
  // }

  return (
    <button
      {...buttonProps}
      ref={ref}
      style={props.style}
      className={buttonClassName}
      disabled={
        isLoading || isDisabled
        // todo: if using useButton - || buttonProps?.disabled
      }
    >
      {isLoading && isLoader && loaderPosition === "start" && (
        <Spinner
          {...{
            loader,
            animation: loaderAnimation,
            size: loaderSize,
          }}
        />
      )}

      {startIcon && startIcon}

      {isLoading && loadingIndicator
        ? loadingIndicator
        : props?.children && props?.children}

      {endIcon && endIcon}

      {isLoading && isLoader && loaderPosition === "end" && (
        <Spinner
          {...{
            loader,
            animation: loaderAnimation,
            size: loaderSize,
          }}
        />
      )}
    </button>
  );
};

export default Button;

const Spinner = ({ loader, animation = "border", size = "sm" }) => {
  if (loader) return loader;
  return (
    <div
      className={`spinner-${animation} spinner-${animation}-${size}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export const RButton = () => {
  return <button className="rbutton">Hello</button>;
};
