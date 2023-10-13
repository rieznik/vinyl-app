import TextInput from "./TextInput.jsx";

export default {
  title: "TextInput",
  component: TextInput,
};

export const Primary = {
  args: {
    name: "artist",
    placeholder: "Artist",
    register: () => {},
  },
};

export const Error = {
  args: {
    name: "artist",
    placeholder: "Artist",
    isError: true,
    register: () => {},
  },
};
