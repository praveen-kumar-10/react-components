import React from "react";
import { useRoutes } from "react-router-dom";

import MarkDown from "components/markdown/MarkDown";

import Components from "components/components.mdx";
import Button from "components/button/button.mdx";

const AppD = () => {
  let element = useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <MarkDown component={Components} />,
        },
        {
          path: "button",
          element: <MarkDown component={Button} />,
        },
      ],
    },
  ]);

  return element;
};

export default AppD;
