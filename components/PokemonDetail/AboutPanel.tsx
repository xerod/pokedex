import { gql, useQuery } from "@apollo/client";
import {
  Flex,
  Box,
  Text,
  Grid,
  Progress,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { HiOutlineFire, HiOutlineLightningBolt } from "react-icons/hi";

type IAboutPanelProps = {
  weight: number;
  height: number;
  game: [
    {
      version: {
        name;
      };
    }
  ];
};

const AboutPanel: React.FC<IAboutPanelProps> = ({ game, height, weight }) => {
  return (
    <Flex direction={{ base: "column", sm: "row" }}>
      <Box w="full" mr="6">
        <Flex mt="6" mb="4" w="full" fontSize="2xl" color="gray.500">
          <HiOutlineFire />
          <Text ml="2" fontSize="xl" fontWeight="bold">
            Physics
          </Text>
        </Flex>
        <Flex borderRadius="lg" bg="gray.100" p="4" justifyContent="center">
          <Box textAlign="center" mr="8">
            <Text color="gray.400">Weight</Text>
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              {weight / 10} KG
            </Text>
          </Box>

          <Box textAlign="center">
            <Text color="gray.400">Height</Text>
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              {height / 10} M
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box w="full">
        <Flex mt="6" mb="4" w="full" fontSize="2xl" color="gray.500">
          <HiOutlineLightningBolt />
          <Text ml="1" fontSize="xl" fontWeight="bold">
            Game
          </Text>
        </Flex>
        {game.map(
          (data, key) =>
            key < 10 && (
              <Tag
                key={data.version.name}
                size="sm"
                mr="1"
                mb="1"
                variant="subtle"
              >
                <TagLabel>{data.version.name}</TagLabel>
              </Tag>
            )
        )}
        {game.length >= 10 && (
          <Tag size="sm" mr="1" mb="1" variant="subtle">
            <TagLabel>and more..</TagLabel>
          </Tag>
        )}
      </Box>
    </Flex>
  );
};

export default AboutPanel;
