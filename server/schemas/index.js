const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
// exports typeDefs and resolvers to be used in server.js w/ ApolloServer (line 11 in server.js)
module.exports = { typeDefs, resolvers };
