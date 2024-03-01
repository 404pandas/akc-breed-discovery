import { gql } from "@apollo/client";

// login(email: String!, password: String!): Auth
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// addUser(username: String!, email: String!, password: String!): Auth
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// addNote(breed: ID!, noteContent: String!): Note
export const ADD_NOTE = gql`
  mutation addNote($breed: ID!, $noteContent: String!) {
    addNote(breed: $breed, noteContent: $noteContent) {
      _id
      breed
      noteContent
    }
  }
`;

// updateNote(_id: ID!, noteContent: String!): Note
export const UPDATE_NOTE = gql`
  mutation updateNote($_id: ID!, $noteContent: String!) {
    updateNote(_id: $_id, noteContent: $noteContent) {
      _id
      breed
      noteContent
    }
  }
`;

// deleteNote(_id: ID!): Note
export const DELETE_NOTE = gql`
  mutation deleteNote($_id: ID!) {
    deleteNote(_id: $_id) {
      _id
      breed
      noteContent
    }
  }
`;

// saveBreed(breedData: BreedInput!): User
export const SAVE_BREED = gql`
  mutation saveBreed($breedData: BreedInput!) {
    saveBreed(breedData: $breedData) {
      _id
    }
  }
`;

// removeBreed(breedId: ID!): User
export const REMOVE_BREED = gql`
  mutation removeBreed($breedId: ID!) {
    removeBreed(breedId: $breedId) {
      _id
    }
  }
`;
