import { Action } from "../Types";

export const ACTIONS: Action[] = [
  {
    index: 0,
    name: "get",
    type: "ACTION",
    color: "blue",
    description: "Perform GET http request.",
  },
  {
    index: 1,
    name: "post",
    type: "ACTION",
    color: "blue",
    description: "Perform POST http request.",
  },
  {
    index: 2,
    name: "axios",
    type: "ACTION",
    color: "blue",
    description: "Perform http request based on AxiosRequestConfig.",
  },
  {
    index: 3,
    name: "pickData",
    type: "ACTION",
    color: "blue",
    description: "Perform json query to pick data from last step.",
  },
  {
    index: 4,
    name: "formatData",
    type: "ACTION",
    color: "blue",
    description:
      "Render string template based on input data from last step using Eta.js.",
  },
  {
    index: 5,
    name: "formatTemplate",
    type: "ACTION",
    color: "blue",
    description:
      "Render template file based on input data from last step using Eta.js.",
  },
  {
    index: 6,
    name: "pickAndVerify",
    type: "VERIFICATION",
    color: "green",
    description:
      "Perform json query to pick data from last step and do a test assert.",
  },
  {
    index: 7,
    name: "verify",
    type: "VERIFICATION",
    color: "green",
    description: "To assert data from last step.",
  },
  {
    index: 8,
    name: "pickStep",
    type: "ACTION",
    color: "blue",
    description: "To pick output data from specific step.",
  },
  {
    index: 9,
    name: "addStep",
    type: "ACTION",
    color: "blue",
    description: "Add a steps from JSON object.",
  },
  {
    index: 10,
    name: "log",
    type: "OTHER",
    color: "gray",
    description: "Last steps will be logged to a file.",
  },
];
