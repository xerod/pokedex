import { gql, useQuery } from "@apollo/client";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import { Spinner } from "@chakra-ui/spinner";
import { HiOutlineInformationCircle } from "react-icons/hi";

type IAbilityPanelProps = {
  ability: string;
};

const GET_ABILITY_DETAIL = gql`
  query getAbility($ability: String!) {
    ability(ability: $ability) {
      response
    }
  }
`;

const AbilityPanel: React.FC<IAbilityPanelProps> = ({ ability }) => {
  const { data, loading, error } = useQuery(GET_ABILITY_DETAIL, {
    variables: { ability: ability },
  });

  if (loading) {
    return (
      <Box mt="6">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const description = data.ability.response.flavor_text_entries[0].flavor_text;
  return (
    <Box p="4" bg="gray.100" mt="4" borderRadius="lg">
      <Flex mb="2" fontSize="xl" color="gray.500" alignItems="center">
        <HiOutlineInformationCircle />
        <Text ml="1" fontSize="lg" textTransform="capitalize" fontWeight="bold">
          {ability.replace(/-/g, " ")}
        </Text>
      </Flex>
      {data && <Text font="gray.800">{description}</Text>}
    </Box>
  );
};

export default AbilityPanel;
