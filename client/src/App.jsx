import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// main graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// middleware attaches to JWT token for every request as 'authorization' header
const authLink = setContext((_, { headers }) => {
  // gets token from local storage
  const token = localStorage.getItem("id_token");
  // returns headers to context for httpLink to read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // sets up client to execute 'authLink' middleware prior to making request to GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* Components go here! */}
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
