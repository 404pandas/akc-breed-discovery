import { gql } from "@apollo/client";

// login(email: String!, password: String!): Auth
export const LOGIN = gql`
  mutation login() {

  }
`;

// addUser(username: String!, email: String!, password: String!): Auth
export const ADD_USER = gql`
  mutation addUser() {

  }
`;

// editUser(username: String, email: String, password: String): User
export const EDIT_USER = gql`
  mutation edit() {

  }
`;

// deleteUser: User
export const DELETE_USER = gql`
  mutation deleteUser() {

  }
`;

// addNote(breed: ID!, noteContent: String!): Note
export const ADD_NOTE = gql`
  mutation addNote() {

  }
`;

// updateNote(_id: ID!, noteContent: String!): Note
export const UPDATE_NOTE = gql`
  mutation updateNote() {

  }
`;

// deleteNote(_id: ID!): Note
export const DELETE_NOTE = gql`
  mutation deleteNote() {

  }
`;

// saveBreed(breedData: BreedInput!): User
export const SAVED_BREED = gql`
  mutation saveBreed() {

  }
`;

// removeBreed(breedId: ID!): User
export const REMOVE_BREED = gql`
  mutation removeBreed() {

  }
`;
