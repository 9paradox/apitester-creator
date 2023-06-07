import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Menu,
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
  const { classes } = useStyles();
  return (
    <Card shadow="xs" radius="md" h="calc(100vh - 200px)" p="md">
      <Card.Section p="lg">
        <Text fw={500}>TestCase Steps</Text>
      </Card.Section>
      <Droppable droppableId="steps-list">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            h="calc(100% - 60px)"
            className={classes.scrollArea}
          >
            {!ACTIONS && <NoSteps />}
            {ACTIONS.map((action) => (
              <StepCard
                key={action.name}
                index={ACTIONS.indexOf(action) + 1}
                name={action.name}
                description={action.description}
                type={action.type}
                color={action.color}
                selected={action.name == "get"}
              />
            ))}
          </Box>
        )}
      </Droppable>
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
function StepCard({
  name,
  description,
  type,
  color,
  index,
  selected,
}: StepCardProps) {
  return (
    <Draggable draggableId={"steps-item-" + name} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow="xs"
          radius="md"
          m={16}
          sx={(theme) => ({
            border: selected ? "2px solid #228be6" : "none",
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
            <Avatar size={48} radius="lg" color="gray.6" m={16}>
              #{index}
            </Avatar>
            <Stack
              align="flex-start"
              justify="flex-start"
              spacing="sm"
              maw="70%"
              style={{ marginRight: "auto" }}
            >
              <Text fw={500}>{name}</Text>
              <Badge color={color} variant="light" size="xs" mb="auto">
                {type}
              </Badge>
              <Text fz="xs" color="dimmed">
                {description}
              </Text>
            </Stack>
            <StepMenu />
          </Flex>
        </Card>
      )}
    </Draggable>
  );
}

function StepMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDots size="1.125rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconCopy size={14} />}>Duplicate</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
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
