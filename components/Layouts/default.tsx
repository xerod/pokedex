import { Flex, Box } from "@chakra-ui/layout";
import ClientOnly from "components/ClientOnly";

type ILayoutProps = {
  bg?: string;
  children: React.ReactNode;
};

const DefaultLayout: React.FC<ILayoutProps> = ({ bg, children }) => {
  return (
    <Flex
      bg={bg ? bg : "gray.50"}
      justifyContent="center"
      minH="100vh"
      overflow="hidden"
    >
      <Box
        pt="4"
        maxW={{ base: "full", sm: "md", md: "xl", lg: "2xl" }}
        w="full"
        mb="20"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default DefaultLayout;
