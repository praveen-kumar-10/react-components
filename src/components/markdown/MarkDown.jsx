import { Link } from "react-router-dom";
import CodeBlock from "components/markdown/CodeBlock";
import { ReactComponent as ArrowCircleLeftIcon } from "assets/icons/arrow/circle/arrow-circle-left.svg";

import "./MarkDown.scss";

const components = {
  em: (props) => <i {...props} />,
  pre: (props) => <CodeBlock {...props} />,
  a: (props) => <Anchor {...props} />,
  Back: (props) => <BackBtn {...props} />,
  Preview: (props) => <ComponentPreview {...props} />,
  table: (props) => <Table {...props} />,
};

const Table = (props) => {
  return (
    <div className="table-wrapper">
      <table>{props?.children}</table>
    </div>
  );
};

export const ComponentPreview = (props) => {
  // console.log(props);

  return (
    <div
      className={`component-preview ${props?.className ?? ""} ${
        props?.resetStyles ? "" : "styles"
      }`}
    >
      {props?.children}
    </div>
  );
};

const BackBtn = (props) => {
  // console.log(14, props);
  const { to, children } = props;
  return (
    <>
      <Link to={to}>
        <ArrowCircleLeftIcon />
      </Link>{" "}
      {children}
    </>
  );
};

const Anchor = (props) => {
  // console.log("a", props);
  const { href, children } = props;
  let [type, to] = href?.split(":");
  // console.log({ type, to });

  if (type === "inline") return <a href={to}>{children}</a>;
  return <Link to={to}>{children}</Link>;
};

const MarkDown = ({ component: Component }) => {
  return (
    <div className="markdown-container">
      <Component components={components} />
    </div>
  );
};

export default MarkDown;
