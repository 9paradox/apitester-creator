import {
  Box,
  Button,
  Drawer,
  Stack,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDownload } from "@tabler/icons-react";
import { useSteps } from "../Store";
import { useState } from "react";
import { sendAnalytics } from "../Analytics";

const tempFilename = "testcase-" + new Date().getTime();

export interface ExportDrawerProps {
  opened: boolean;
  onClose: () => void;
}

function ExportDrawer({ opened, onClose }: ExportDrawerProps) {
  const [title, setTitle] = useState("");
  const [filename, setFilename] = useState(tempFilename);
  const [loading, setLoading] = useState(false);

  const { buildJsonTestcase } = useSteps();

  function handelDownload() {
    setLoading(true);
    const jsonTestcase = buildJsonTestcase(title);

    downloadJSON(jsonTestcase, filename);
    setLoading(false);
    notifications.show({
      title: "Testcase exported successfully",
      message: "Testcase '" + filename + ".test.json' exported successfully",
      color: "green",
      autoClose: 3000,
      icon: <IconDownload size={20} />,
      withBorder: true,
    });

    sendAnalytics({
      category: "Export",
      action: "download testcase",
    });

    onClose();
  }

  function downloadJSON(jsonData: unknown, filename: string) {
    const jsonContent = JSON.stringify(jsonData, null, 2);
    const dataURL = `data:application/json;charset=utf-8,${encodeURIComponent(
      jsonContent
    )}`;

    const anchorElement = document.createElement("a");
    anchorElement.href = dataURL;
    anchorElement.download = filename + ".test.json";

    anchorElement.style.display = "none";
    document.body.appendChild(anchorElement);

    anchorElement.click();

    document.body.removeChild(anchorElement);
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Export testcase"
      position="right"
    >
      <Stack>
        <Textarea
          placeholder="testcase title"
          label="Title"
          withAsterisk
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          placeholder="testcase-filename"
          label="Filename"
          withAsterisk
          rightSection={<JsonFileText />}
          rightSectionWidth={90}
          value={filename}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "-");
            setFilename(e.target.value);
          }}
        />
        <Button
          mt="sm"
          leftIcon={<IconDownload size={14} />}
          color="green"
          disabled={filename === "" || title === ""}
          onClick={handelDownload}
          loading={loading}
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
