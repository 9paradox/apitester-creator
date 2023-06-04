import {
  Badge,
  ScrollArea,
  Card,
  Group,
  Input,
  Text,
  Center,
  Stack,
} from "@mantine/core";
import { IconMoodEmpty, IconSearch } from "@tabler/icons-react";

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

function ActionSection() {
  return (
    <Card shadow="xs" radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Text fw={500}>Actions</Text>
      </Card.Section>
      <Input
        icon={<IconSearch size={16} />}
        radius="md"
        variant="filled"
        placeholder="search for actions"
      />
      <ScrollArea
        h="calc(100% - 120px)"
        offsetScrollbars
        type="hover"
        mt="lg"
        scrollbarSize={8}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderRadius: theme.radius.md,
        })}
      >
        {!ACTIONS && <NoActions />}
        {ACTIONS &&
          ACTIONS.map((action) => (
            <ActionCard
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

interface ActionCardProps {
  name: string;
  description: string;
  type: string;
  color: string;
}

function ActionCard({ name, description, type, color }: ActionCardProps) {
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

function NoActions() {
  return (
    <Center
      h="calc(100vh - 600px)"
      sx={(theme) => ({
        margin: "20px",
        padding: "20px",
      })}
    >
      <Stack align="center">
        <IconMoodEmpty color="gray" size={40} />
        <Text size="sm" color="dimmed" inline mt={7}>
          No actions found
        </Text>
      </Stack>
    </Center>
  );
}

export default ActionSection;
