export interface Action {
  index: number;
  name: string;
  description: string;
  type: string;
  color: string;
}

export interface Step {
  action: string;
  inputData: unknown;
}

export interface StepItem extends Step {
  id: string;
  actionItem: Action;
  selected: boolean;
}

export enum DragList {
  actionList = "action-list",
  stepList = "step-list",
}
