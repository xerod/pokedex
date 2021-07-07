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
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client/react/hooks";
import { gql } from "graphql-tag";

import DefaultLayout from "components/Layouts/default";
import { useRouter } from "next/router";
import { useState } from "react";
import typeColor from "utils/typeColor";
import {
  HiChevronLeft,
  HiOutlineChartBar,
  HiOutlineInformationCircle,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";
const AbilityPanel = dynamic(import("components/PokemonDetail/AbilityPanel"));
const StatsPanel = dynamic(import("components/PokemonDetail/StatsPanel"));
const AboutPanel = dynamic(import("components/PokemonDetail/AboutPanel"));

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      status
      weight
      height
      game_indices {
        version {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      stats {
        base_stat
        stat {
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

  const myLoader = ({ src, width, quality }) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}?w=${width}&q=${
      quality || 50
    }`;
  };

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
      const name = prompt("GOTCHA! let's give it a name");
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
      <Flex alignItems="center" color={`${typeColorName}.400`}>
        <NextLink href="/">
          <Button
            variant="link"
            fontWeight="semibold"
            colorScheme={typeColorName}
          >
            <HiChevronLeft size={24} /> Home
          </Button>
        </NextLink>
      </Flex>
      <Box mx="10" mt="6">
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

        <Flex w="full" justifyContent="center">
          <NextImage
            loader={myLoader}
            src={`${pokemon.id}.png`}
            layout="intrinsic"
            width={200}
            height={200}
            objectFit="cover"
          />
        </Flex>
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
          isLazy={true}
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
              <Text ml="1">Ability</Text>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel fontWeight="medium">
              <AboutPanel
                weight={pokemon.weight}
                height={pokemon.height}
                game={pokemon.game_indices}
              />
            </TabPanel>
            <TabPanel>
              <StatsPanel stats={pokemon.stats} color={typeColorName} />
            </TabPanel>
            <TabPanel>
              {pokemon.abilities.map((data) => (
                <AbilityPanel
                  key={data.ability.name}
                  ability={data.ability.name}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <motion.img
        width={50}
        height={50}
        drag
        draggable={true}
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        style={{
          cursor: "grab",
          position: "fixed",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "1rem",
          borderRadius: "999px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onDragTransitionEnd={() => catchPokemon(pokemon)}
        onClick={() => catchPokemon(pokemon)}
        src="/pokeball.svg"
      />
    </DefaultLayout>
  );
};

export default PokemonDetail;
