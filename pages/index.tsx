import { Text, Box, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import ClientOnly from "components/ClientOnly";
import PokemonCard from "components/PokemonCard";
import { useCallback, useEffect, useRef, useState } from "react";

const GET_POKEMONS = gql`
  query PokemonList($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

export default function Home() {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [listItem, setListItem] = useState([]);
  const [noData, setNoData] = useState(false);

  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { limit: limit, offset: offset },
  });

  useEffect(() => {
    if (!loading && data) {
      setListItem((prevState) => [...prevState, ...data.pokemons.results]);
      if (data.pokemons.results.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    }
  }, [loading, data]);

  const loader = useRef(null);

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && data) {
        setOffset((old) => old + 20);
      }
    },
    [data]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(loadMore, options);

    if (loader && loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, loadMore]);

  if (error) {
    console.log(error);
  }

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
          <Text fontSize="4xl" fontWeight="bold" mb="4">
            Pokédex
          </Text>
          <Grid
            templateColumns={{
              base: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            }}
            gap={3}
            mb={6}
          >
            {listItem.map((pokemon) => (
              <GridItem colSpan={{ base: 2, md: 1 }} key={pokemon.name}>
                <PokemonCard name={pokemon.name} />
              </GridItem>
            ))}
          </Grid>

          <Flex
            ref={loader}
            h="70px"
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            {loading && <Spinner size="lg" speed="0.5s" />}
          </Flex>
          {noData && (
            <Text textAlign="center">There's no data anymore ...</Text>
          )}
        </Box>
      </Flex>
    </ClientOnly>
  );
}
