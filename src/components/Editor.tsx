import { Container, Grid, rem, Box } from "@mantine/core";
import ActionSection from "./ActionSection";
import TestCaseSection from "./TestCaseSection";
import StepOptionSection from "./StepOptionSection";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useAtom } from "jotai";
import { ActionsStore, StepsStore } from "../Store";
import { DragList, StepItem } from "../Types";

export function Editor() {
  const [actions] = useAtom(ActionsStore);
  const [steps, setSteps] = useAtom(StepsStore);

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source, destination);
    if (!destination) return;

    if (destination.droppableId == DragList.actionList) return;

    if (
      source.droppableId == DragList.actionList &&
      destination.droppableId == DragList.stepList
    ) {
      const action = actions[source.index];

      const newStep: StepItem = {
        id: action.name + "-" + steps.length + "-" + new Date().getTime(),
        actionItem: action,
        action: action.name,
        selected: false,
        inputData: undefined,
      };

      const newSteps = [...steps];

      newSteps.splice(destination.index, 0, newStep);

      setSteps([...newSteps]);

      return;
    }

    if (
      source.droppableId == DragList.stepList &&
      destination.droppableId == DragList.stepList
    ) {
      const newSteps = [...steps];
      const [removed] = newSteps.splice(source.index, 1);
      newSteps.splice(destination.index, 0, removed);
      setSteps([...newSteps]);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : "#f4f9fd",
      })}
    >
      <Container size="100rem" h="calc(100vh - 60px - 60px)" pt={60}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid grow justify="center" gutter="lg">
            <Grid.Col span={1} style={{ minHeight: rem(80) }}>
              <ActionSection />
            </Grid.Col>
            <Grid.Col span={3} style={{ minHeight: rem(120) }}>
              <TestCaseSection />
            </Grid.Col>
            <Grid.Col span={2}>
              <StepOptionSection />
            </Grid.Col>
          </Grid>
        </DragDropContext>
      </Container>
    </Box>
  );
}

export default Editor;
