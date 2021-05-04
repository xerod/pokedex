import { Text, Box, Flex, Grid, GridItem, Button, Tag } from "@chakra-ui/react";
import NextLink from "next/link";
import DefaultLayout from "components/Layouts/default";
import PokemonCard from "components/PokemonCard";
import { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiMinusCircle,
  HiOutlineLogout,
  HiOutlineMinusCircle,
  HiTrash,
} from "react-icons/hi";
import { GiLightBackpack } from "react-icons/gi";

const MyPokemon: React.FC = () => {
  const [myPokemon, setMyPokemon] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem("my-pokemon-list");
    if (list) {
      setMyPokemon(JSON.parse(list));
    }
  }, []);

  const releasePokemon = (name: string) => {
    let list = JSON.parse(localStorage.getItem("my-pokemon-list"));
    const index = list.findIndex((arr) => arr.name === name);

    list.splice(index, 1);
    localStorage.setItem("my-pokemon-list", JSON.stringify(list));

    if (list.length) {
      setMyPokemon(JSON.parse(list));
    } else {
      setMyPokemon([]);
    }
  };

  return (
    <DefaultLayout>
      <Box p="4">
        <Flex alignItems="center" color="gray.300" mb="6">
          <NextLink href="/">
            <Button variant="link" fontWeight="semibold" colorScheme="gray">
              <HiChevronLeft size={24} /> Home
            </Button>
          </NextLink>
        </Flex>
        <Text mb="4" fontSize="4xl" fontWeight="bold">
          My Pokémon
        </Text>
        <Box>
          <Grid
            templateColumns={{
              base: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            }}
            columnGap={3}
            rowGap={14}
            mb={6}
          >
            {myPokemon?.map((data) => (
              <GridItem height={24} key={data.pokemon}>
                <PokemonCard name={data.pokemon} alias={data.name} />
                <Button
                  mt="1"
                  w="full"
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  borderRadius="lg"
                  rightIcon={<HiOutlineLogout />}
                  onClick={() => releasePokemon(data.name)}
                >
                  Release
                </Button>
              </GridItem>
            ))}
          </Grid>
          {!myPokemon.length && (
            <Flex
              w="full"
              p="6"
              color="gray.600"
              justifyContent="center"
              bg="gray.100"
              borderRadius="lg"
            >
              <Flex flexDir="column" alignItems="center">
                <GiLightBackpack size={60} />
                <Text mt="4" color="gray.500">
                  There's no pokemon on your backpack 😞
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default MyPokemon;
