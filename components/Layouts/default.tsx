import { Flex, Box } from "@chakra-ui/layout";
import ClientOnly from "components/ClientOnly";

export default function DefaultLayout({ children }) {
  return (
    <ClientOnly>
      <Flex bg="gray.50" justifyContent="center" minH="100vh">
        <Box
          pt="4"
          px={{ base: 4 }}
          maxW={{ base: "xs", sm: "md", md: "xl", lg: "5xl" }}
          w="full"
          mb="20"
        >
          {children}
        </Box>
      </Flex>
    </ClientOnly>
  );
}
