import { Text, Box, Flex, Spinner, Button } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import ClientOnly from "components/ClientOnly";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const QUERY = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      name
      sprites {
        front_default
      }
    }
  }
`;

const PokemonDetail: React.FC = () => {
  const router = useRouter();
  const [myPokemon, setMyPokemon] = useState([]);
  const [isCatched, setIsCatched] = useState(false);

  const { data, loading, error } = useQuery(QUERY, {
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

  return (
    <>
      <ClientOnly>
        <Box>
          <Text fontSize="4xl">{pokemon.name}</Text>

          <Button onClick={() => catchPokemon(pokemon)}>Catch</Button>
        </Box>
      </ClientOnly>
    </>
  );
};

export default PokemonDetail;
