// TODO- finish building out after server and auth is functional'

// breeds(group: ID!): [Breed]

const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedBreeds: [Breed]
  }

  type Breed {
    _id: ID
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
    groupNumber: Int
    group: Group
    note: Note
  }

  type Group {
    _id: ID
    groupName: String
    groupNumber: Int
    details: String
  }

  type Note {
    _id: ID
    noteContent: String
    user: User
    breed: Breed
  }

  type Auth {
    token: ID!
    user: User
  }

  input BreedInput {
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
    groupNumber: Int
  }

  type Query {
    users: [User]
    me: User
    group(id: ID!): Group
    groups: [Group]
    allBreeds: [Breed]
    breed(id: ID!): Breed
    breeds(group: ID!): [Breed]
    notes: [Note]
    note(id: ID!): Note
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    deleteUser: User
    addNote(breedId: ID!, noteContent: String!): Note
    updateNote(_id: ID!, noteContent: String!): Note
    deleteNote(_id: ID!): Note
    saveBreed(breedData: BreedInput!): User
    removeBreed(breedId: ID!): User
  }
`;

module.exports = typeDefs;
