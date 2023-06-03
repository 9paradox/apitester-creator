import {
  createStyles,
  Header,
  Container,
  Group,
  Text,
  ActionIcon,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

const useStyles = createStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));

export function AppHeader() {
  const { classes } = useStyles();
  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Text c="cyan.5" fw={500} fz="xl">
          apitester creator
        </Text>
        <Group spacing={5} position="right">
          <ActionIcon
            component="a"
            color="dark"
            href="https://github.com/9paradox/apitester"
          >
            <IconBrandGithub size={20} />
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}

export default AppHeader;
