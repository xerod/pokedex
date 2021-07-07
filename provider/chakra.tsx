import { ChakraProvider } from "@chakra-ui/react";
import {
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/color-mode";
export function Chakra({ cookies, children, theme }) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;
  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

export function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}
