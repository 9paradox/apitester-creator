import {
  Box,
  Button,
  Drawer,
  Stack,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { ExportDrawerProps } from "./Editor";
import { IconDownload } from "@tabler/icons-react";

function ExportDrawer({ opened, onClose }: ExportDrawerProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Export testcase"
      position="right"
    >
      <Stack>
        <TextInput
          placeholder="testcase-filename"
          label="Filename"
          withAsterisk
          rightSection={<JsonFileText />}
          rightSectionWidth={90}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "-");
          }}
        />
        <Textarea placeholder="testcase title" label="Title" withAsterisk />
        <Button
          mt="sm"
          variant="light"
          leftIcon={<IconDownload size={14} />}
          color="green"
        >
          Download
        </Button>
      </Stack>
    </Drawer>
  );
}

export default ExportDrawer;
function JsonFileText() {
  return (
    <Box
      sx={(theme) => {
        return {
          color:
            theme.colorScheme === "dark"
              ? theme.colors.gray[5]
              : theme.colors.dark[5],
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
          borderRadius: rem(3),
          paddingRight: 8,
          paddingLeft: 8,
        };
      }}
    >
      .test.json
    </Box>
  );
}
