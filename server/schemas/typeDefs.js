// TODO- finish building out after server and auth is functional
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    savedBreeds: [Breed]
  }

  type Breed {
    _id: ID!
    breedName: String
    breedDescription: String
    yearAdded: Int
    keywords: [String]
    height: Int
    weight: Int
    lifeExpectancy: Int
    coatType: [String]
    coatLength: [String]
    colors: [String]
    markings: [String]
    breedImg: String
    notes: String
    group: String
    groupNumber: Int
  }

  type Group {
    _id: ID!
    groupName: String
    groupNumber: Int
    details: String
    breedId: String
  }

  type Note {
    _id: ID!
    noteContent: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    group: Group
    groups: [Breed]
    breeds: [Breed]
    breed(breedId: ID!): User
    savedBreed(breedId: ID!): Group
    notes: [Note]
    note(noteId: ID!): Note
  }

  input BookInput {
    _id: ID!
    breedName: String
    breedDescription: String
    yearAdded: Int
    keywords: [String]
    height: Int
    weight: Int
    lifeExpectancy: Int
    coatType: [String]
    coatLength: [String]
    colors: [String]
    markings: [String]
    breedImg: String
    notes: String
    group: String
    groupNumber: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    deleteUser: User
    addNote(breed: ID!): Note
    updateNote(_id: ID!, noteContent: String!): Note
    deleteNote(noteId: ID!): Note
    saveBreed(breedData: BreedInput!): User
    removeBreed(breedId: ID!): User
  }
`;

module.exports = typeDefs;
