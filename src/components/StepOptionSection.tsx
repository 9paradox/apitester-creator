import {
  Card,
  ScrollArea,
  Text,
  Stack,
  SegmentedControl,
  Center,
  Group,
  Box,
} from "@mantine/core";
import { IconCircleCheck, IconClick } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { StepsStore } from "../Store";
import { useState } from "react";
import DynamicForm from "./DynamicForm";
import { ActionInputType, Field, StepItem } from "../Types";

function StepOptionSection() {
  const [steps] = useAtom(StepsStore);

  const selectedStep = steps.find((s) => s.selected);
  const selectedTab =
    selectedStep?.selectedActionInput || ActionInputType.simple;

  const [optionTab, setOptionTab] = useState<ActionInputType>(
    () => selectedTab
  );

  function handleOptionChange(value: ActionInputType) {
    setOptionTab(value);
  }

  return (
    <Card shadow="none" withBorder radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Group position="apart">
          <Text fw={500}>Step Options - {selectedStep?.action}</Text>
        </Group>
      </Card.Section>
      <SegmentedControl
        disabled={!selectedStep}
        fullWidth
        radius="md"
        color="gray"
        data={[
          {
            label:
              selectedStep?.selectedActionInput == ActionInputType.simple ? (
                <TabName name="Simple" />
              ) : (
                "Simple"
              ),
            value: ActionInputType.simple,
            disabled: !selectedStep?.actionInput?.inputDataSimple,
          },
          {
            label:
              selectedStep?.selectedActionInput == ActionInputType.advance ? (
                <TabName name="Advance" />
              ) : (
                "Advance"
              ),
            value: ActionInputType.advance,
            disabled: !selectedStep?.actionInput?.inputDataAdvance,
          },
          {
            label:
              selectedStep?.selectedActionInput == ActionInputType.raw ? (
                <TabName name="Raw" />
              ) : (
                "Raw"
              ),
            value: ActionInputType.raw,
            disabled: !selectedStep?.actionInput?.inputDataRaw,
          },
        ]}
        value={optionTab}
        onChange={handleOptionChange}
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
        <StepOptionForm actionInputType={optionTab} />
      </ScrollArea>
    </Card>
  );
}

interface TabNameProps {
  name: string;
}
function TabName({ name }: TabNameProps) {
  return (
    <Center>
      <IconCircleCheck size="1rem" />
      <Box ml={10}>{name}</Box>
    </Center>
  );
}

interface StepOptionFormProps {
  actionInputType: ActionInputType;
}
function StepOptionForm({ actionInputType }: StepOptionFormProps) {
  const [steps, setSteps] = useAtom(StepsStore);

  const selectedStep = steps.find((s) => s.selected);

  if (!selectedStep) return <NoStepSelected />;

  function handelOnChange(values: Field[]) {
    const selectedStep = steps.find((s) => s.selected);
    const newSelectedStep = { ...selectedStep } as StepItem;

    newSelectedStep.selectedActionInput = actionInputType;

    if (!values) return;

    if (!newSelectedStep.actionInput) return;

    if (actionInputType == ActionInputType.simple) {
      newSelectedStep.actionInput.inputDataSimple = [...values];
    } else if (actionInputType == ActionInputType.advance) {
      newSelectedStep.actionInput.inputDataAdvance = [...values];
    } else if (actionInputType == ActionInputType.raw) {
      newSelectedStep.actionInput.inputDataRaw = [...values];
    }

    const newSteps = steps.map((s) => {
      if (s.id === newSelectedStep.id) {
        console.log(s.id);
        return newSelectedStep;
      }
      return s;
    });
    setSteps(newSteps);
  }

  function GetActionInput() {
    if (!selectedStep) return [];

    if (actionInputType == ActionInputType.simple) {
      return selectedStep.actionInput?.inputDataSimple ?? [];
    } else if (actionInputType == ActionInputType.advance) {
      return selectedStep.actionInput?.inputDataAdvance ?? [];
    } else if (actionInputType == ActionInputType.raw) {
      return selectedStep.actionInput?.inputDataRaw ?? [];
    }
    return [];
  }

  return (
    <Stack p="md">
      <DynamicForm
        id={selectedStep.id}
        fields={GetActionInput()}
        onChange={handelOnChange}
      />
    </Stack>
  );
}

function NoStepSelected() {
  return (
    <Center
      h="calc(100vh - 500px)"
      sx={() => ({
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
