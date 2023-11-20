const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");
// UNCOMMENT FOR API
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// UNCOMMENT FOR API
// app.use(routes);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API is running on port ${PORT}!`);
      console.log(
        `GraphQL is running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
// UNCOMMENT FOR API
// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//   });
// });
