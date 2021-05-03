import {
  Flex,
  Box,
  Image,
  Text,
  Skeleton,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import typeColor from "utils/typeColor";

type IPokemonCardProps = {
  name: string;
};

const GET_POKEMON_DETAIL = gql`
  query getPokemonDetail($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
    }
  }
`;

export default function PokemonCard(props: IPokemonCardProps) {
  const imageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loaded && imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: props.name },
  });

  const formatPokemonID = (id: string) => {
    const pad = "000";
    return pad.substring(0, pad.length - id.length) + id;
  };

  if (loading) {
    return <Skeleton h="150px" />;
  }

  if (error) {
    console.log(error);
    return null;
  }

  const typeColorName = typeColor[data.pokemon.types[0].type.name];
  const pokemon = data.pokemon;
  return (
    <Box
      h="full"
      px="4"
      py="3"
      bgColor={`${typeColorName}.600`}
      rounded="xl"
      cursor="pointer"
      shadow="base"
      position="relative"
      overflow="hidden"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-2px)",
      }}
      _focus={{
        boxShadow: "outline",
        transform: "translateY(-2px)",
      }}
      style={{
        WebkitTransition: "box-shadow 250ms, transform 200ms",
        transition: "box-shadow 250ms, transform 200ms",
      }}
      onClick={() => router.push(`/pokemon/${pokemon.name}`)}
    >
      <Flex
        inset="0"
        position="absolute"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Image
          src={`${imageURL}${pokemon.id}.png`}
          opacity={{ base: "0.3", md: "0.2", lg: "1" }}
          boxSize={{ base: "40", lg: "28" }}
          objectFit="cover"
        />
      </Flex>
      <Box position="relative">
        <Text
          mb={-2}
          fontSize={{ base: "2xl", sm: "xl", md: "2xl" }}
          fontWeight="bold"
          color={`${typeColorName}.50`}
          textTransform="capitalize"
        >
          {pokemon.name.split("-")[0]}
        </Text>
        <Text
          mb={10}
          fontSize={{ base: "xl", md: "xl" }}
          fontWeight="bold"
          color={`${typeColorName}.400`}
        >
          #{formatPokemonID(pokemon.id.toString())}
        </Text>
        {data.pokemon.types.map((type) => (
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
      </Box>
    </Box>
  );
}
