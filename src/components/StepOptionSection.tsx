import {
  Card,
  ScrollArea,
  Text,
  Stack,
  Input,
  SegmentedControl,
} from "@mantine/core";

function StepOptionSection() {
  return (
    <Card shadow="xs" radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Text fw={500}>TestCase Steps</Text>
      </Card.Section>
      <SegmentedControl
        fullWidth
        radius="md"
        data={[
          { label: "Simple", value: "simple" },
          { label: "Advance", value: "advance" },
        ]}
      />
      <ScrollArea
        h="calc(100% - 120px)"
        mt="lg"
        offsetScrollbars
        type="hover"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
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

export default StepOptionSection;
