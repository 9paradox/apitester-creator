import { Container, Grid, rem, Box } from "@mantine/core";
import ActionSection from "./ActionSection";
import TestCaseSection from "./TestCaseSection";
import StepOptionSection from "./StepOptionSection";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export function Editor() {
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source, destination);
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : "#f4f9fd",
      })}
    >
      <Container size="100rem" h="calc(100vh - 60px - 60px)" pt={60}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid grow justify="center" gutter="lg">
            <Grid.Col span={1} style={{ minHeight: rem(80) }}>
              <ActionSection />
            </Grid.Col>
            <Grid.Col span={3} style={{ minHeight: rem(120) }}>
              <TestCaseSection />
            </Grid.Col>
            <Grid.Col span={2}>
              <StepOptionSection />
            </Grid.Col>
          </Grid>
        </DragDropContext>
      </Container>
    </Box>
  );
}

export default Editor;
