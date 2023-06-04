import {
  Avatar,
  Badge,
  Card,
  Center,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconDragDrop } from "@tabler/icons-react";

const ACTIONS = [
  {
    name: "get",
    description: "Perform GET http request.",
    type: "action",
    color: "blue",
  },
  {
    name: "post",
    description: "Perform POST http request.",
    type: "action",
    color: "blue",
  },
  {
    name: "axios",
    description: "Perform http request based on AxiosRequestConfig.",
    type: "action",
    color: "blue",
  },
  {
    name: "pickAndVerify",
    description:
      "Perform json query to pick data from last step and do a test assert. Perform json query to pick data from last step and do a test assert.",
    type: "verification",
    color: "green",
  },
  {
    name: "verify",
    description: "verify expected against actual",
    type: "verification",
    color: "green",
  },
  {
    name: "pickData",
    description: "Perform json query to pick data from last step",
    type: "action",
    color: "blue",
  },
  {
    name: "log",
    description: "Last steps will be logged to a file",
    type: "other",
    color: "gray",
  },
];

function TestCaseSection() {
  return (
    <Card shadow="xs" radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Text fw={500}>TestCase Steps</Text>
      </Card.Section>
      <ScrollArea
        h="calc(100% - 60px)"
        offsetScrollbars
        type="hover"
        scrollbarSize={8}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderRadius: theme.radius.md,
        })}
      >
        {!ACTIONS && <NoSteps />}
        {ACTIONS.map((action) => (
          <StepCardItem
            key={action.name}
            index={ACTIONS.indexOf(action) + 1}
            name={action.name}
            description={action.description}
            type={action.type}
            color={action.color}
            selected={action.name == "get"}
          />
        ))}
      </ScrollArea>
    </Card>
  );
}

interface StepCardProps {
  index: number;
  name: string;
  description: string;
  type: string;
  color: string;
  selected: boolean;
}

function StepCard({ name, description, type, color }: StepCardProps) {
  return (
    <Card shadow="xs" radius="md" m={16}>
      <Group position="apart" mb="xs">
        <Text>{name}</Text>
        <Badge color={color} variant="light">
          {type}
        </Badge>
      </Group>
      <Text size="sm" color="dimmed">
        {description}
      </Text>
    </Card>
  );
}

function StepCardItem({
  name,
  description,
  type,
  color,
  index,
  selected,
}: StepCardProps) {
  return (
    <Card
      shadow="xs"
      radius="md"
      m={16}
      sx={(theme) => ({
        border: selected ? "2px solid #228be6" : "none",
      })}
    >
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <Avatar size={48} radius="lg" color="gray.6" m={16}>
          #{index}
        </Avatar>
        <Stack align="flex-start" justify="space-between">
          <Text fw={500}>{name}</Text>
          <Badge color={color} variant="light" size="sm">
            {type}
          </Badge>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}

function NoSteps() {
  return (
    <Center
      h="calc(100vh - 400px)"
      sx={(theme) => ({
        border: "1px dashed #ccc",
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
