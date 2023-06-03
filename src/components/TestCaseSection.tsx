import { Badge, Card, Group, ScrollArea, Text } from "@mantine/core";

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
      "Perform json query to pick data from last step and do a test assert.",
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
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderRadius: theme.radius.md,
        })}
      >
        {ACTIONS.map((action) => (
          <StepCard
            key={action.name}
            name={action.name}
            description={action.description}
            type={action.type}
            color={action.color}
          />
        ))}
      </ScrollArea>
    </Card>
  );
}

interface StepCardProps {
  name: string;
  description: string;
  type: string;
  color: string;
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

export default TestCaseSection;
