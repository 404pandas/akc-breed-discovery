// TODO- finish building out after server and auth is functional
const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String
    password: String
    savedBreeds: [Breed]
    notes: [Note]
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
    notes: String
    groupNumber: Int
    group: Group
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

  type Query {
    users: [User]
    me: User
    group(groupName: String): Group
    groups: [Group]
    breeds(group: ID!): [Breed]
    allBreeds: [Breed]
    breed(_id: ID!): Breed
    notes: [Note]
    note(_id: ID!): Note
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    deleteUser: User
    addNote(breed: ID!, noteContent: String!): Note
    updateNote(_id: ID!, noteContent: String!): Note
    deleteNote(_id: ID!): Note
    saveBreed(breedData: BreedInput!): User
    removeBreed(breedId: ID!): User
  }
`;

module.exports = typeDefs;
