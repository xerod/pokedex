import { extendTheme } from "@chakra-ui/react";

import colors from "./foundations/colors";
import breakpoints from "./foundations/breakpoints";

const overrides = {
  colors,
  breakpoints,
  initialColorMode: "light",
  useSystemColorMode: false,
};
export default extendTheme(overrides);
