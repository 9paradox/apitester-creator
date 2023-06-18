import { atom } from "jotai";
import { Action, StepItem } from "./Types";
import { ACTIONS } from "./constants/ACTIONS";

const actions = atom<Action[]>(ACTIONS);

export const ActionsStore = atom((get) => get(actions));

export const StepsStore = atom<StepItem[]>([]);
