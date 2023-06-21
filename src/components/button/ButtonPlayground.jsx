import { useMemo, useState } from "react";
import { Form } from "react-bootstrap";

import Button, { variants } from "components/button/Button";
import { ComponentPreview } from "components/markdown/MarkDown";

import "./ButtonPlayground.scss";
import Switch from "components/forms/Switch";
import Radio from "components/forms/Radio";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { exclueValuesFromListOrObject } from "helper/excludeValuesFromListOrObject";

// 1 - input
// 2 - checkbox
//  3 - radio
//  4 - switch
//  5 - select

const INITIAL_STATE = {
  children: "Button",
  variant: "primary",
  isLoading: false,
  isLoader: true,
  loaderPosition: "start",
  size: "md",
  outline: false,
  isDisabled: false,
};

const ButtonPlayground = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const buttonProps = useMemo(() => {
    let { children, variant, outline, text, ...restProps } = state;
    variant = outline ? `outline-${variant}` : variant;
    return { ...restProps, variant };
  }, [state]);

  const code = useMemo(() => {
    let obj = Object.entries(exclueValuesFromListOrObject(state, ["children"]));

    const typeOfValue = (value) => {
      if (typeof value === "string") return `'${value}'`;
      else return value;
    };

    let props = obj?.map(([key, value], idx, arr) =>
      idx === obj?.length - 1
        ? `${key}={${typeOfValue(value)}}\t`
        : `${key}={${typeOfValue(value)}}\n\t`
    );

    let codeStr = `<Button \n\t${props?.join("")}\n>\n\t${
      state?.children
    }\n</Button>`;

    return codeStr;
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const FIELDS = useMemo(
    () => [
      {
        name: "children",
        input_type: 1,
        label: "Text",
      },
      {
        input_type: 4,
        name: "outline",
        label: "Outline",
      },
      {
        input_type: 5,
        name: "variant",
        label: "Variant",
        options: variants,
      },
      {
        input_type: 5,
        name: "size",
        label: "Size",
        options: { sm: "Small", md: "Medium", lg: "Large" },
      },
      {
        input_type: 4,
        name: "isLoading",
        label: "isLoading",
      },
      {
        input_type: 3,
        name: "loaderPosition",
        label: "Loader Position",
        items: { start: "Start", end: "End" },
        show: state?.isLoading,
      },
      {
        input_type: 1,
        name: "loadingIndicator",
        label: "Loading Indicator",
        show: state?.isLoading,
      },
      {
        input_type: 4,
        name: "isDisabled",
        label: "Disabled",
      },
    ],
    [state?.isLoading]
  );

  return (
    <div className="playground">
      <ComponentPreview>
        {FIELDS?.map(({ show = true, ...field }) => (
          <div className="input_wrapper">
            {![3, 4]?.includes(field?.input_type) && (
              show && <Form.Label>{field?.label}</Form.Label>
            )}

            {field?.input_type === 1 && show && (
              <Form.Control
                {...field}
                value={state[field?.name] ?? ""}
                onChange={handleChange}
              />
            )}

            {field?.input_type === 3 && show && (
              <Radio
                {...field}
                defaultValue={state[field?.name]}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, [field?.name]: value }))
                }
              />
            )}

            {field?.input_type === 4 && (
              <Switch
                {...field}
                defaultSelected={state[field?.name]}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, [field?.name]: value }))
                }
              >
                {field?.label}
              </Switch>
            )}
            {field?.input_type === 5 && (
              <Form.Select
                name={field?.name}
                value={state[field?.name] ?? ""}
                onChange={handleChange}
              >
                {/* <option value=''>Select</option> */}
                {!Array.isArray(field?.options) &&
                  Object.entries(field?.options)?.map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
              </Form.Select>
            )}
          </div>
        ))}
      </ComponentPreview>
      <div className="preview-and-code">
        <ComponentPreview>
          <Button {...buttonProps}>{state?.children}</Button>
        </ComponentPreview>
        <SyntaxHighlighter
          language="jsx"
          style={nightOwl}
          wrapLongLines
          customStyle={
            {
              // width: "70%",
            }
          }
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ButtonPlayground;
