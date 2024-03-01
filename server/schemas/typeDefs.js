// TODO- finish building out after server and auth is functional'

const typeDefs = `
  type User {
    _id: ID
    username: String
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
    groupNumber: Int
    group: Group
    notes: [Note]
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
    noteAuthor: String
    breed: Breed
  }

  type Auth {
    token: ID!
    user: User
  }

  type DeleteNoteResponse {
    success: Boolean
    message: String
  }

  input AddNoteInput {
    breedId: ID!
    noteAuthor: String!
    noteContent: String!
  }

  input UpdateNoteInput {
    noteId: ID!
    breedID: ID!
    noteContent: String!
    userId: ID!
  }

  input BreedInput {
    breedId: ID!
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
    user(id: ID!): User
    me: User
    group(id: ID!): Group
    groups: [Group]
    allBreeds: [Breed]
    breed(id: ID!): Breed
    breeds(group: ID!): [Breed]
    allNotes: [Note]
    note(id: ID!): Note
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addNote(noteData: AddNoteInput!): Note
    updateNote(_id: ID!, breedId: ID, newNoteData: UpdateNoteInput!): Note
    deleteNote(breedId: ID!, noteId: ID!): Note
    saveBreed(breedData: BreedInput!): User
    removeBreed(breedId: ID!): User
  }
`;

module.exports = typeDefs;
