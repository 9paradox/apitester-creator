import { CloneObject } from "../Helper";
import { Field, Dictionary, ActionInput } from "../Types";
import { ACTIONS } from "./ACTIONS";

const ToBeType = [
  "equal",
  "==",
  "notEqual",
  "!=",
  "greaterThan",
  ">",
  "greaterThanOrEqual",
  ">=",
  "lessThan",
  "<",
  "lessThanOrEqual",
  "<=",
  "in",
  "notIn",
  "contains",
];

const ActionNames = ACTIONS.map((action) => action.name);

const StepOptionsType: Field[] = [
  {
    label: "action",
    description: "name of the action",
    type: "string",
    element: "select",
    options: CloneObject(ActionNames),
    value: "",
  },
  {
    label: "inputData",
    description: "input data in json format",
    type: "any",
    element: "json",
    value: "",
  },
];

const RawOptions: Field[] = [
  {
    label: "raw",
    description: "raw data in json format, set null to pick from last step",
    type: "any",
    element: "json",
    value: "",
  },
];

const AxiosRequestConfigType: Field[] = [
  {
    label: "url",
    description: "http url of the request",
    type: "string",
    element: "input",
    value: "",
  },
  {
    label: "data",
    description: "data of the request in json format",
    type: "any",
    element: "json",
    value: "",
  },
  {
    label: "method",
    description: "method of the request",
    type: "string",
    element: "select",
    options: ["GET", "POST", "PUT", "DELETE"],
    value: "GET",
  },
  {
    label: "params",
    description: "params of the request",
    type: "any",
    element: "textarea",
    value: "",
  },
  {
    label: "headers",
    description: "headers of the request in json format",
    type: "any",
    element: "json",
    value: "",
  },
  {
    label: "responseType",
    description: "response type of the request",
    type: "string",
    element: "input",
    value: "",
  },
  {
    label: "timeout",
    description: "timeout of the request",
    type: "number",
    element: "input",
    value: "",
  },
  {
    label: "auth",
    description: "auth of the request in json format",
    type: "any",
    element: "json",
    value: "",
  },
];

export const ACTIONS_INPUT: Dictionary<ActionInput> = {
  get: {
    inputDataSimple: [
      {
        label: "url",
        description: "http url of the request",
        type: "string",
        element: "input",
        value: "",
      },
    ],
    inputDataAdvance: CloneObject(AxiosRequestConfigType),
    inputDataRaw: CloneObject(RawOptions),
  },
  post: {
    inputDataSimple: [
      {
        label: "url",
        description: "http url of the request",
        type: "string",
        element: "input",
        value: "",
      },
      {
        label: "data",
        description: "data of the request in json format",
        type: "any",
        element: "json",
        value: "",
      },
    ],
    inputDataAdvance: CloneObject(AxiosRequestConfigType),
    inputDataRaw: CloneObject(RawOptions),
  },
  axios: {
    inputDataSimple: null,
    inputDataAdvance: CloneObject(AxiosRequestConfigType),
    inputDataRaw: CloneObject(RawOptions),
  },
  pickData: {
    inputDataSimple: [
      {
        label: "query",
        description: "jmespath or jsonata query to pick data",
        type: "string",
        element: "textarea",
        value: "",
      },
    ],
    inputDataAdvance: null,
    inputDataRaw: CloneObject(RawOptions),
  },
  formatData: {
    inputDataSimple: [
      {
        label: "template",
        description:
          "render string template based on input data from last step",
        type: "string",
        element: "textarea",
        value: "",
      },
    ],
    inputDataAdvance: null,
    inputDataRaw: CloneObject(RawOptions),
  },
  formatTemplate: {
    inputDataSimple: [
      {
        label: "filePath",
        description: "path of the template file",
        type: "string",
        element: "input",
        value: "",
      },
    ],
    inputDataAdvance: [
      {
        label: "filePath",
        description: "path of the template file",
        type: "string",
        element: "input",
        value: "",
      },
      {
        label: "outputDataFormat",
        description: "render output format for template file",
        type: "string",
        element: "select",
        value: "string",
        options: ["string", "number", "boolean", "object"],
      },
    ],
    inputDataRaw: CloneObject(RawOptions),
  },
  pickAndVerify: {
    inputDataSimple: [
      {
        label: "query",
        description: "jmespath or jsonata query to pick data",
        type: "string",
        element: "textarea",
        value: "",
      },
      {
        label: "expected",
        description: "expected value",
        type: "any",
        element: "textarea",
        value: "",
      },
      {
        label: "toBe",
        description: "compare value with expected value",
        type: "string",
        element: "select",
        options: CloneObject(ToBeType),
        value: "equal",
      },
    ],
    inputDataAdvance: null,
    inputDataRaw: CloneObject(RawOptions),
  },
  verify: {
    inputDataSimple: [
      {
        label: "expected",
        description: "expected value",
        type: "any",
        element: "textarea",
        value: "",
      },
    ],
    inputDataAdvance: [
      {
        label: "expected",
        description: "expected value",
        type: "any",
        element: "textarea",
        value: "",
      },
      {
        label: "toBe",
        description: "compare value with expected value",
        type: "$ToBe",
        element: "select",
        options: CloneObject(ToBeType),
        value: "equal",
      },
    ],
    inputDataRaw: CloneObject(RawOptions),
  },
  pickStep: {
    inputDataSimple: [
      {
        label: "stepNumber",
        description: "to pick output data from specific step",
        type: "number",
        element: "input",
        value: "",
      },
    ],
    inputDataAdvance: null,
    inputDataRaw: CloneObject(RawOptions),
  },
  addStep: {
    inputDataSimple: null,
    inputDataAdvance: StepOptionsType,
    inputDataRaw: CloneObject(RawOptions),
  },
  log: {
    inputDataSimple: null,
    inputDataAdvance: null,
    inputDataRaw: null,
  },
};

export function GetActionInput(actionName: string): ActionInput | null {
  const action = ACTIONS_INPUT[actionName];
  if (!action) return null;
  return {
    inputDataSimple: CloneObject(action.inputDataSimple),
    inputDataAdvance: CloneObject(action.inputDataAdvance),
    inputDataRaw: CloneObject(action.inputDataRaw),
  };
}
