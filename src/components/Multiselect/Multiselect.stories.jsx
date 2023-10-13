import { useState } from "react";
import Multiselect from "./Multiselect.jsx";

export default {
  title: "Inputs/Multiselect",
  component: Multiselect,
};

const Template = (args) => {
  const [value, setValue] = useState(undefined);

  return (
    <Multiselect
      {...args}
      placeholder="Select an option"
      options={[
        { name: "Rock", value: "1" },
        { name: "Electronic", value: "2" },
        { name: "Pop", value: "3" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  error: true,
};
