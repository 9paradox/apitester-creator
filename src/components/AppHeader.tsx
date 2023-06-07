import {
  createStyles,
  Header,
  Container,
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBrandGithub, IconMoonStars, IconSun } from "@tabler/icons-react";

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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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
            size="lg"
            href="https://github.com/9paradox/apitester"
          >
            <IconBrandGithub size={20} />
          </ActionIcon>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.yellow[4]
                  : theme.colors.blue[6],
            })}
          >
            {colorScheme === "dark" ? (
              <IconSun size="1.2rem" />
            ) : (
              <IconMoonStars size="1.2rem" />
            )}
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}

export default AppHeader;
