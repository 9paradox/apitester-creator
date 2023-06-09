import {
  Card,
  ScrollArea,
  Text,
  Stack,
  Input,
  SegmentedControl,
  Center,
  Button,
  Group,
} from "@mantine/core";
import { IconClick, IconCopy, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { SelectedStepStore, StepsStore } from "../Store";
import { StepItem } from "../Types";

function StepOptionSection() {
  const [steps, setSteps] = useAtom(StepsStore);
  const [selectedStep, setSelectedStep] = useAtom(SelectedStepStore);

  function cloneStep(step: StepItem) {
    const newStep: StepItem = {
      ...step,
    };

    newStep.id =
      step.actionItem.name + "-" + steps.length + "-" + new Date().getTime();

    newStep.selected = false;

    const newSteps = [...steps];
    newSteps.splice(steps.indexOf(step) + 1, 0, newStep);

    return newSteps;
  }

  function deleteStep(step: StepItem) {
    const newSteps = steps.filter((s) => s.id !== step.id);
    return newSteps;
  }

  function handleMenuClick(action: string) {
    if (selectedStep == null) return;
    switch (action) {
      case "clone":
        {
          const newSteps = cloneStep(selectedStep);
          console.log(newSteps);
          setSteps([...newSteps]);
          console.log(steps);
        }
        break;
      case "delete":
        {
          const newSteps = deleteStep(selectedStep);
          setSteps([...newSteps]);
          setSelectedStep(null);
        }
        break;
    }
  }
  return (
    <Card shadow="none" withBorder radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Group position="apart">
          <Text fw={500}>Step Options</Text>
          {selectedStep != null && (
            <Button.Group>
              <Button
                size="xs"
                variant="light"
                leftIcon={<IconCopy size={14} />}
                onClick={() => handleMenuClick("clone")}
              >
                Clone
              </Button>
              <Button
                size="xs"
                color="red"
                variant="light"
                leftIcon={<IconTrash size={14} />}
                onClick={() => handleMenuClick("delete")}
              >
                Delete
              </Button>
            </Button.Group>
          )}
        </Group>
      </Card.Section>
      <SegmentedControl
        disabled={!selectedStep}
        fullWidth
        radius="md"
        color="gray"
        data={[
          { label: "Simple", value: "simple" },
          { label: "Advance", value: "advance" },
          { label: "Other", value: "other" },
        ]}
      />
      <ScrollArea
        h="calc(100% - 120px)"
        mt="lg"
        offsetScrollbars
        type="hover"
        scrollbarSize={8}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[0],
          borderRadius: theme.radius.md,
        })}
      >
        {selectedStep == null && <NoStepSelected />}
        {selectedStep != null && <BasicOption />}
      </ScrollArea>
    </Card>
  );
}

function BasicOption() {
  return (
    <Stack p="md">
      <Input.Wrapper id="input-demo" withAsterisk label="URL">
        <Input id="input-demo" placeholder="url" />
      </Input.Wrapper>
    </Stack>
  );
}

function NoStepSelected() {
  return (
    <Center
      h="calc(100vh - 500px)"
      sx={(theme) => ({
        margin: "20px",
        padding: "20px",
      })}
    >
      <Stack align="center">
        <IconClick color="gray" size={40} />
        <Text size="sm" color="dimmed" inline mt={7}>
          Please select a step to continue
        </Text>
      </Stack>
    </Center>
  );
}

export default StepOptionSection;
