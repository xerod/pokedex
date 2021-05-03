import { Text, Box, Flex, Grid, GridItem, Button } from "@chakra-ui/react";
import ClientOnly from "components/ClientOnly";
import PokemonCard from "components/PokemonCard";
import { useEffect, useState } from "react";

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
    <>
      <ClientOnly>
        <Box>
          <Grid
            templateColumns={{
              base: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            }}
            gap={3}
            mb={6}
          >
            {myPokemon?.map((data) => (
              <GridItem colSpan={{ base: 2, md: 1 }} key={data.pokemon}>
                <PokemonCard name={data.pokemon} alias={data.name} />
                <Button onClick={() => releasePokemon(data.name)}>
                  Remove
                </Button>
              </GridItem>
            ))}
            {!myPokemon && <Text>You have no Pokemon</Text>}
          </Grid>
        </Box>
      </ClientOnly>
    </>
  );
};

export default MyPokemon;
