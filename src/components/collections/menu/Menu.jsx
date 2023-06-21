import React, { useEffect, useMemo, useState } from "react";
import MenuButton from "./MenuButton";
import { Item, Section } from "react-stately";

const Menu = (props) => {
  const { isSection = false, items, ...restProps } = props;

  const menuItems = useMemo(() => {
    let tempItems = [];

    if (!isSection) {
      if (!Array.isArray(items)) {
        Object.entries(items)?.forEach(([key, name]) =>
          tempItems.push({ id: key, name })
        );
      } else tempItems = items;
    }

    return tempItems;
  }, [isSection, items]);

  if (isSection)
    return (
      <MenuButton {...restProps} items={props?.items}>
        {(sectionItem) => (
          <Section items={sectionItem?.children} title={sectionItem?.name}>
            {(item) => <Item>{item?.name}</Item>}
          </Section>
        )}
      </MenuButton>
    );

  return (
    <MenuButton {...restProps} items={menuItems}>
      {(item) => <Item>{item?.name}</Item>}
    </MenuButton>
  );
};

export default Menu;
