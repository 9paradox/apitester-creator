import {
  Card,
  ScrollArea,
  Text,
  Stack,
  Input,
  SegmentedControl,
  Center,
} from "@mantine/core";
import { IconClick } from "@tabler/icons-react";

function StepOptionSection() {
  return (
    <Card shadow="none" withBorder radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Text fw={500}>Step Options</Text>
      </Card.Section>
      <SegmentedControl
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
        <Stack p="md">
          <Input.Wrapper id="input-demo" withAsterisk label="URL">
            <Input id="input-demo" placeholder="url" />
          </Input.Wrapper>
        </Stack>
      </ScrollArea>
    </Card>
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
