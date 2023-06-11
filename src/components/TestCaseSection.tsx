import {
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { IconDragDrop } from "@tabler/icons-react";
import useStyles from "../CustomStyles";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { SelectedStepStore, StepsStore } from "../Store";
import { DragList, StepItem } from "../Types";
import { useAtom } from "jotai";

function TestCaseSection() {
  const { classes } = useStyles();
  const [steps, setSteps] = useAtom(StepsStore);
  const [, setSelectedStep] = useAtom(SelectedStepStore);

  function selectStep(step: StepItem) {
    const unselectedSteps = steps.map((s) => {
      s.selected = false;
      return s;
    });

    setSteps(unselectedSteps);

    const newSteps = steps.map((s) => {
      if (s.id === step.id) {
        s.selected = !s.selected;
      }
      return s;
    });
    setSelectedStep(step);
    setSteps([...newSteps]);
  }

  return (
    <Card shadow="none" withBorder radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Text fw={500}>TestCase Steps</Text>
      </Card.Section>
      <Droppable droppableId={DragList.stepList}>
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            h="calc(100% - 60px)"
            className={classes.scrollArea}
          >
            {steps.length < 1 && <NoSteps />}
            {steps &&
              steps.map((step) => (
                <StepCard
                  key={step.id}
                  index={steps.indexOf(step)}
                  step={step}
                  onCardClick={() => selectStep(step)}
                />
              ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Card>
  );
}

interface StepCardProps {
  index: number;
  step: StepItem;
  onCardClick: () => void;
}
function StepCard({ index, step, onCardClick }: StepCardProps) {
  return (
    <Draggable draggableId={step.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow="none"
          withBorder
          radius="md"
          m={16}
          onClick={onCardClick}
          sx={(theme) => ({
            boxShadow: step.selected
              ? `inset 0 0 0px 2px ${theme.colors.blue[3]}`
              : "",
            overflow: "visible",
          })}
        >
          <Flex
            mih={50}
            gap="md"
            justify="space-between"
            align="center"
            direction="row"
            wrap="nowrap"
          >
            <Avatar
              size={48}
              radius="lg"
              color={step.selected ? "blue.6" : "gray.6"}
              m={16}
            >
              #{index + 1}
            </Avatar>
            <Stack
              align="flex-start"
              justify="flex-start"
              spacing="sm"
              maw="70%"
              style={{ marginRight: "auto" }}
            >
              <Text fw={500}>{step.actionItem.name}</Text>
              <Badge
                color={step.actionItem.color}
                variant="light"
                size="xs"
                mb="auto"
              >
                {step.actionItem.type}
              </Badge>
              <Text fz="xs" color="dimmed">
                {step.actionItem.description}
              </Text>
            </Stack>
          </Flex>
        </Card>
      )}
    </Draggable>
  );
}

function NoSteps() {
  return (
    <Center
      h="calc(100vh - 335px)"
      sx={(theme) => ({
        border:
          theme.colorScheme === "dark"
            ? `1px dashed ${theme.colors.dark[3]}`
            : `1px dashed ${theme.colors.gray[4]}`,
        margin: "20px",
        padding: "20px",
      })}
    >
      <Stack align="center">
        <IconDragDrop color="gray" size={40} />
        <Text size="sm" color="dimmed" inline mt={7}>
          Drag and drop Actions here.
        </Text>
      </Stack>
    </Center>
  );
}

export default TestCaseSection;
