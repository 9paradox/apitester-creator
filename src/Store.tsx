import { atom } from "jotai";
import { Action, StepItem } from "./Types";

const ACTIONS: Action[] = [
  {
    index: 0,
    name: "get",
    description: "Perform GET http request.",
    type: "action",
    color: "blue",
  },
  {
    index: 1,
    name: "post",
    description: "Perform POST http request.",
    type: "action",
    color: "blue",
  },
  {
    index: 2,
    name: "axios",
    description: "Perform http request based on AxiosRequestConfig.",
    type: "action",
    color: "blue",
  },
  {
    index: 3,
    name: "pickAndVerify",
    description:
      "Perform json query to pick data from last step and do a test assert.",
    type: "verification",
    color: "green",
  },
  {
    index: 4,
    name: "verify",
    description: "verify expected against actual",
    type: "verification",
    color: "green",
  },
  {
    index: 5,
    name: "pickData",
    description: "Perform json query to pick data from last step",
    type: "action",
    color: "blue",
  },
  {
    index: 6,
    name: "log",
    description: "Last steps will be logged to a file",
    type: "other",
    color: "gray",
  },
];

const actions = atom<Action[]>(ACTIONS);
export const ActionsStore = atom((get) => get(actions));

export const StepsStore = atom<StepItem[]>([]);

export const SelectedStepStore = atom<StepItem | null>(null);
