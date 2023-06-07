import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Badge,
  Card,
  Group,
  Input,
  Text,
  Center,
  Stack,
  Box,
} from "@mantine/core";
import { IconMoodEmpty, IconSearch } from "@tabler/icons-react";
import useStyles from "../CustomStyles";

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
  const { classes } = useStyles();
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
      <Droppable droppableId="action-list">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            h="calc(100% - 120px)"
            mt="lg"
            className={classes.scrollArea}
          >
            {!ACTIONS && <NoActions />}

            {ACTIONS &&
              ACTIONS.map((action) => (
                <ActionCard
                  index={ACTIONS.indexOf(action) + 1}
                  key={action.name}
                  name={action.name}
                  description={action.description}
                  type={action.type}
                  color={action.color}
                />
              ))}
          </Box>
        )}
      </Droppable>
    </Card>
  );
}

interface ActionCardProps {
  index: number;
  name: string;
  description: string;
  type: string;
  color: string;
}

function ActionCard({
  name,
  description,
  type,
  color,
  index,
}: ActionCardProps) {
  return (
    <Draggable draggableId={"actions-item-" + name} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow="xs"
          radius="md"
          m={16}
        >
          <Group position="apart" mb="xs">
            <Text>{name}</Text>
            <Badge color={color} variant="light" size="sm">
              {type}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </Card>
      )}
    </Draggable>
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
