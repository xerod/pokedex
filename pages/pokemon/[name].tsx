import {
  Text,
  Box,
  Flex,
  Spinner,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tag,
  TagLabel,
  Grid,
  GridItem,
  Progress,
  Image,
  chakra,
  useTab,
  useStyles,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import DefaultLayout from "components/Layouts/default";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import typeColor from "utils/typeColor";
import {
  HiChartBar,
  HiInformationCircle,
  HiLightningBolt,
  HiOutlineChartBar,
  HiOutlineInformationCircle,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import React from "react";

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      status
      weight
      height
      base_experience
      location_area_encounters
      order
      species {
        url
        name
      }
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

const PokemonDetail: React.FC = () => {
  const router = useRouter();
  const [myPokemon, setMyPokemon] = useState([]);
  const [isCatched, setIsCatched] = useState(false);

  const imageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: router.query.name },
  });

  if (loading) {
    return (
      <>
        <Flex h="100vh" justifyContent="center" alignItems="center">
          <Spinner size="xl" speed="0.4s" />
        </Flex>
      </>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const pokemon = data.pokemon;

  const catchPokemon = (pokemon) => {
    const prevState = localStorage.getItem("my-pokemon-list");
    let list = [];

    if (prevState) {
      list = JSON.parse(prevState);
    }

    setIsCatched(Math.random() > 0.5);

    if (isCatched) {
      const name = prompt("Gotcha! let's give him a name");
      const index = list.findIndex((element) => element.name === name);
      console.log(index);

      if (!name || index !== -1) {
        !name && alert(`You need to give ${pokemon.name} a name`);

        index !== -1 &&
          alert(`There's another ${list[index].pokemon} under the same name`);
      } else {
        list.push({
          name: name,
          pokemon: pokemon.name,
        });
      }
    } else {
      alert(`Oops, ${pokemon.name} flee..`);
    }

    localStorage.setItem("my-pokemon-list", JSON.stringify(list));
    setMyPokemon(JSON.parse(localStorage.getItem("my-pokemon-list")));
  };

  const typeColorName = typeColor[data.pokemon.types[0].type.name];
  return (
    <DefaultLayout bg={`${typeColorName}.600`}>
      <Box mx="10">
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color={`${typeColorName}.50`}
            textTransform="capitalize"
          >
            {pokemon.name}
          </Text>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color={`${typeColorName}.400`}
            textTransform="capitalize"
          >
            #{pokemon.id}
          </Text>
        </Flex>
        {pokemon.types.map((type) => (
          <Tag
            key={type.type.name}
            size="sm"
            colorScheme={typeColor[type.type.name]}
            borderRadius="full"
            mr="1"
            shadow="base"
          >
            <TagLabel>{type.type.name}</TagLabel>
          </Tag>
        ))}

        <Image
          mx="auto"
          src={`${imageURL}${pokemon.id}.png`}
          boxSize={{ base: "40", lg: "60" }}
          objectFit="cover"
        />
        {/* <Button onClick={() => catchPokemon(pokemon)}>Catch</Button> */}
      </Box>
      <Box
        mt={-12}
        pt="12"
        px={{ base: "6", md: "20" }}
        h="100%"
        bg="white"
        borderTopRadius="2xl"
      >
        <Tabs
          bg="white"
          size="sm"
          isFitted={true}
          variant="soft-rounded"
          colorScheme={typeColorName}
        >
          <TabList
            border="1px"
            borderColor="gray.200"
            borderRadius="full"
            p="3"
          >
            <Tab color="gray.600" bg="gray.100" mr="3">
              <HiOutlineInformationCircle />
              <Text ml="1">About</Text>
            </Tab>
            <Tab color="gray.600" bg="gray.100" mr="3">
              <HiOutlineChartBar />
              <Text ml="1">Stats</Text>
            </Tab>
            <Tab color="gray.600" bg="gray.100" mr="3">
              <HiOutlineLightningBolt />
              <Text ml="1">Move</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel fontWeight="medium">
              <Grid
                maxW={{ base: "3xs" }}
                templateColumns="repeat(2, minmax(0, 1fr))"
                rowGap={4}
              >
                <GridItem>
                  <Text color="gray.400" mr="20" w="full">
                    Height
                  </Text>
                </GridItem>

                <GridItem>
                  <Text>{pokemon.height / 10} m</Text>
                </GridItem>

                <GridItem>
                  <Text color="gray.400" mr="20" w="full">
                    Weight
                  </Text>
                </GridItem>

                <GridItem>
                  <Text>{pokemon.weight / 10} kg</Text>
                </GridItem>

                <GridItem>
                  <Text color="gray.400" mr="20" w="full">
                    Species
                  </Text>
                </GridItem>

                <GridItem>
                  <Text>{pokemon.species.name}</Text>
                </GridItem>

                <GridItem>
                  <Text color="gray.400" mr="20" w="full">
                    Abilities
                  </Text>
                </GridItem>

                <GridItem>
                  {pokemon.abilities.map((data) => (
                    <Tag key={data.ability.name} size="sm" mr="1">
                      <TagLabel textTransform="capitalize">
                        {data.ability.name}
                      </TagLabel>
                    </Tag>
                  ))}
                </GridItem>
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid
                templateColumns={{
                  base: "repeat(1, minmax(0, 1fr))",
                  md: "repeat(2, minmax(0, 1fr))",
                }}
                columnGap={12}
                rowGap={4}
              >
                {pokemon.stats.map((data) => (
                  <Box key={data.stat.name}>
                    <Flex alignItems="center">
                      <Text textTransform="capitalize" fontWeight="medium">
                        {data.stat.name}
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
                      colorScheme={typeColorName}
                    />
                  </Box>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <p>four!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DefaultLayout>
  );
};

export default PokemonDetail;
