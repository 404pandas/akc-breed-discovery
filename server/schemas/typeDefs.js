const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    savedBreeds: [Breed]
  }

  type Breed {
    _id: ID!
  }

  type Group {
    _id: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    # TODO- build out
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    deleteUser: User
    # Todo- build out
  }
`;

module.exports = typeDefs;
