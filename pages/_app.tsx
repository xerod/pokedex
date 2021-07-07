import { ApolloProvider } from "@apollo/client/react/context";
import { CSSReset } from "@chakra-ui/css-reset";
import client from "provider/apolloClient";
import { Chakra } from "provider/chakra";
import theme from "theme";

function MyApp({ Component, pageProps }) {
  return (
    <Chakra theme={theme} cookies={pageProps.cookies}>
      <CSSReset />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Chakra>
  );
}
export default MyApp;
