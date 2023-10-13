/** @type { import('@storybook/react').Preview } */

import "../src/main.css";

// if (import.meta.env.DEV) {
const { worker } = await import("../src/mocks/browser.js");
worker.start();
// }

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
