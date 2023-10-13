import { withRouter } from "storybook-addon-react-router-v6";
import Pagination from "./Pagination.jsx";

export default {
  title: "Pagination",
  component: Pagination,
  tags: ["autodocs"],
  decorators: [withRouter],
};

export const Primary = {
  args: {
    currentPage: 7,
    recordsPerPage: 6,
    numberOfRecords: 100,
  },
};
