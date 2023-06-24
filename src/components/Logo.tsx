import apitester_creator_logo from "../assets/apitester-creator-logo.svg";

import { Image } from "@mantine/core";

const Logo = () => {
  return (
    <Image
      width={120}
      height={60}
      fit="contain"
      src={apitester_creator_logo}
      alt="logo"
      sx={(theme) => {
        return {
          filter:
            theme.colorScheme === "dark"
              ? "opacity(0.6) invert(1)"
              : "opacity(0.6)",
        };
      }}
    />
  );
};

export default Logo;
