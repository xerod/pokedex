import { gql, useQuery } from "@apollo/client";
import { Flex, Box, Text, Grid, Progress } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { HiOutlineInformationCircle } from "react-icons/hi";

type IStatsPanelProps = {
  color: string;
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
      };
    }
  ];
};

const StatsPanel: React.FC<IStatsPanelProps> = ({ stats, color }) => {
  const statList = {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "special-attack": "sp.atk",
    "special-defense": "sp.def",
    speed: "spd",
  };

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, minmax(0, 1fr))",
        md: "repeat(2, minmax(0, 1fr))",
      }}
      columnGap={12}
      rowGap={4}
    >
      {stats.map((data) => (
        <Box key={data.stat.name}>
          <Flex alignItems="center">
            <Text textTransform="uppercase" fontWeight="medium">
              {statList[data.stat.name]}
            </Text>
            <Text ml="1" fontSize="xs" color="gray.400">
              {data.base_stat}
            </Text>
          </Flex>
          <Progress
            size="sm"
            mt="2"
            borderRadius="full"
            max={200}
            value={data.base_stat}
            colorScheme={color}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default StatsPanel;
