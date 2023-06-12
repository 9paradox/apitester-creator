import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCopy,
  IconDots,
  IconDragDrop,
  IconTrash,
} from "@tabler/icons-react";
import useStyles from "../CustomStyles";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { SelectedStepStore, StepsStore } from "../Store";
import { DragList, StepItem } from "../Types";
import { useAtom } from "jotai";
import { useDisclosure } from "@mantine/hooks";

function TestCaseSection() {
  const [deleteStepModelOpened, setDeleteStepModel] = useDisclosure(false);
  const { classes } = useStyles();
  const [steps, setSteps] = useAtom(StepsStore);
  const [selectedStep, setSelectedStep] = useAtom(SelectedStepStore);

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

  function duplicateStep(step: StepItem) {
    const newStep: StepItem = {
      ...step,
    };

    newStep.id =
      step.actionItem.name + "-" + steps.length + "-" + new Date().getTime();

    newStep.selected = false;

    const newSteps = [...steps];
    newSteps.splice(steps.indexOf(step) + 1, 0, newStep);

    setSteps([...newSteps]);
  }

  function deleteStep() {
    if (selectedStep == null) return;

    const newSteps = steps.filter((s) => s.id !== selectedStep.id);
    setSteps([...newSteps]);
    setSelectedStep(null);
    setDeleteStepModel.close();
  }

  function handleMenuClick(action: string) {
    if (selectedStep == null) return;

    switch (action) {
      case "clone":
        duplicateStep(selectedStep);
        break;
      case "delete":
        setDeleteStepModel.open();
        break;
    }
  }

  return (
    <>
      <Modal
        opened={deleteStepModelOpened}
        onClose={setDeleteStepModel.close}
        title="Delete step"
      >
        <Text>Are you sure you want to delete this step?</Text>
        <Group mt="lg" spacing="xs" position="right">
          <Button
            variant="light"
            leftIcon={<IconTrash size={14} />}
            color="red"
            onClick={() => deleteStep()}
          >
            Delete
          </Button>
          <Button variant="light" onClick={() => setDeleteStepModel.close()}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Card shadow="none" withBorder radius="md" h="calc(100vh - 200px)" p="md">
        <Card.Section p="lg">
          <Text fw={500}>TestCase Steps</Text>
        </Card.Section>
        <Droppable droppableId={DragList.stepList}>
          {(provided, snapshot) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              h="calc(100% - 60px)"
              className={classes.scrollArea}
              sx={(theme) => ({
                boxShadow: snapshot.isDraggingOver
                  ? "0 0 10px 2px " + theme.colors.blue[6]
                  : "",
                transition: "box-shadow 0.4s ease",
              })}
            >
              {steps.length < 1 && <NoSteps />}
              {steps &&
                steps.map((step) => (
                  <StepCard
                    key={step.id}
                    index={steps.indexOf(step)}
                    step={step}
                    onCardClick={() => selectStep(step)}
                    onMenuItemClick={handleMenuClick}
                  />
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Card>
    </>
  );
}

interface StepCardProps {
  index: number;
  step: StepItem;
  onCardClick: () => void;
  onMenuItemClick: (action: string) => void;
}
function StepCard({
  index,
  step,
  onCardClick,
  onMenuItemClick,
}: StepCardProps) {
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
          onClick={(e) => {
            if (step.selected) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }

            onCardClick();
          }}
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
            <StepMenu onMenuItemClick={onMenuItemClick} />
          </Flex>
        </Card>
      )}
    </Draggable>
  );
}

interface StepMenuProps {
  onMenuItemClick: (action: string) => void;
}
function StepMenu({ onMenuItemClick }: StepMenuProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDots size="1.125rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconCopy size={14} />}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMenuItemClick("clone");
          }}
        >
          Duplicate
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMenuItemClick("delete");
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
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
