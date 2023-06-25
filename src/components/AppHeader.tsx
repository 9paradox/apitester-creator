import {
  createStyles,
  Header,
  Container,
  Group,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import ReactGA from "react-ga";
import { IconBrandGithub, IconMoonStars, IconSun } from "@tabler/icons-react";
import Logo from "./Logo";
import { sendAnalytics } from "../Analytics";

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
  function handelColorScheme() {
    toggleColorScheme();

    sendAnalytics({
      category: "UI",
      action: "dark mode toggle",
      label: colorScheme == "dark" ? "light" : "dark",
    });
  }
  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Logo />
        <Group spacing={5} position="right">
          <ActionIcon
            component="a"
            color="dark"
            size="lg"
            href="https://github.com/9paradox/apitester"
            onClick={() => {
              ReactGA.event({
                category: "click",
                action: "apitester github",
              });
            }}
          >
            <IconBrandGithub size={20} />
          </ActionIcon>
          <ActionIcon
            onClick={handelColorScheme}
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
