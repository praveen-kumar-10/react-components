import React, { useState } from "react";
import { Item, Section, useListData } from "react-stately";

import { ReactComponent as Icon } from "assets/icons/menu/more-vertical.svg";

import Button from "components/button/Button";
// import ToggleButton from "components/button/ToggleButton";

import Select from "components/select/Select";
import SearchSelect from "components/select/SearchSelect";

import Radio from "components/forms/Radio";
import Switch from "components/forms/Switch";
import Checkbox from "components/forms/Checkbox";
import TextField from "components/forms/TextField";

import TagGroup from "components/collections/tag-group/TagGroup";
import MenuButton from "components/collections/menu/MenuButton";
import Menu from "components/collections/menu/Menu";
import Calendar from "components/date-and-time/Calendar";
import { useDateFormatter } from "react-aria";
import { getLocalTimeZone } from "@internationalized/date";

const ITEMS = [
  { id: 1, name: "Aerospace" },
  { id: 2, name: "Mechanical" },
  { id: 3, name: "Civil" },
  { id: 4, name: "Biomedical" },
  { id: 5, name: "Nuclear" },
  { id: 6, name: "Industrial" },
  { id: 7, name: "Chemical" },
  { id: 8, name: "Agricultural" },
  { id: 9, name: "Electrical" },
];

const App = () => {
  let [selected, setSelected] = useState("");
  let [open, setOpen] = React.useState(true);
  let [date, setDate] = React.useState("");
  let formatter = useDateFormatter({ dateStyle: "full" });

  let list = useListData({
    initialItems: [
      { id: 1, name: "News" },
      { id: 2, name: "Travel" },
      { id: 3, name: "Gaming" },
      { id: 4, name: "Shopping" },
    ],
  });

  return (
    <>
      <Button>Button</Button>

      <br />

      {/* <ToggleButton isToggle={true}>Toggle</ToggleButton> */}

      <br />

      <Checkbox
        name="test"
        // feedback={{ type: "valid", message: "Hello" }}
      >
        Unsubscribe
      </Checkbox>

      <br />

      <Radio
        defaultValue="second"
        name="radio-item"
        label="Radio"
        items={{ first: "First Item", second: "Second Item" }}
      />

      <br />

      <Switch name="test">Hello</Switch>

      <br />

      <Select
        label="Favorite Color"
        // selectedKey={selected}
        // feedback={{ type: "valid", message: "Hello" }}
        // onSelectionChange={(selected) => setSelected(selected)}
        items={ITEMS}
        // optionKey='id'
        // optionValue='name'
      />

      {/* <p>{selected}</p> */}

      <br />

      <SearchSelect
        // allowsCustomValue
        // selectedKey={selected}
        // onSelectionChange={(selected) => setSelected(selected)}
        label="Favorite Animal"
        defaultItems={ITEMS}
      />

      <br />

      <TextField
        label="Label"
        // feedback={{ type: "invalid", message: "Hello" }}
      />

      <br />

      <TagGroup
        label="Categories"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={list.items}
        disabledKeys={[1]}
        // onRemove={(keys) => list.remove(...keys)}
      />

      <br />

      <Menu
        isSection
        onlyIcon
        showDropdownIcon={false}
        label={<Icon />}
        variant="secondary"
        // isOpen={open}
        // onOpenChange={() => setOpen(true)}
        selectionMode="multiple"
        isSelection={true}
        items={[
          {
            name: "Left Panel",
            id: "left",
            children: [{ id: 1, name: "Final Copy (1)" }],
          },
          {
            name: "Right Panel",
            id: "right",
            children: [
              { id: 2, name: "index.ts" },
              { id: 3, name: "package.json" },
              { id: 4, name: "license.txt" },
            ],
          },
        ]}
      />
      <br />

      <Calendar aria-label="Event date" />

      {/* <DateField label="Event date" /> */}
    </>
  );
};

export default App;
