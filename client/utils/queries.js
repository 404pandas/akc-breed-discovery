import { gql } from "@apollo/client";

// users: [User]

// me: User
export const QUERY_ME = gql`
  {
    me {
      username
      breeds {
        _id
        breedName
        breedDescription
        yearAdded
        keywords
        height
        weight
        lifeExpectancy
        coatType
        coatLength
        colors
        markings
        breedImg
        groupNumber
        group {
          _id
          groupName
          groupNumber
          details
        }
      }
    }
  }
`;

// group(_id: ID!): Group
export const QUERY_GROUP = gql`
  query getGroup($groupId: ID!) {
    group(id: $groupId) {
      _id
      groupName
      groupNumber
      details
    }
  }
`;
// breed(_id: ID!): Breed
export const QUEERY_BREED = gql`
  query getBreed($breedId: ID!) {
    breed(id: $breedId) {
      _id
      breedName
      breedDescription
      yearAdded
      keywords
      height
      weight
      lifeExpectancy
      coatType
      coatLength
      colors
      markings
      breedImg
      notes
      groupNumber
      group {
        _id
        groupName
        groupNumber
        details
      }
    }
  }
`;

// groups: [Group]
export const QUERY_ALL_GROUPS = gql`
  query getAllGroups {
    groups {
      _id
      groupName
      groupNumber
      details
    }
  }
`;

// breeds: [Breed]
export const QUERY_ALL_BREEDS = gql`
  query getAllBreeds {
    allBreeds {
      _id
      breedName
      breedDescription
      yearAdded
      keywords
      height
      weight
      lifeExpectancy
      coatType
      coatLength
      colors
      markings
      breedImg
      notes
      groupNumber
      group {
        _id
        groupName
        groupNumber
        details
      }
    }
  }
`;

// breeds(group: ID): [Breed]
export const QUERY_BREEDS = gql`
  query getBreeds($group: ID!) {
    breeds(group: $group) {
      _id
      breedName
      breedDescription
      yearAdded
      keywords
      height
      weight
      lifeExpectancy
      coatType
      coatLength
      colors
      markings
      breedImg
      notes
      groupNumber
      group {
        _id
        groupName
        groupNumber
        details
      }
    }
  }
`;

// notes: [Note]
export const QUERY_ALL_NOTES = gql`
  query getAllNotes {
    notes {
      _id
      noteContent
      noteAuthor
      breed {
        _id
        breedName
      }
    }
  }
`;

// note(noteId: ID!): Note
export const QUERY_NOTE = gql`
  query getNote($noteId: ID!) {
    note(id: $noteId) {
      _id
      noteContent
      noteAuthor
      breed {
        _id
        breedName
      }
    }
  }
`;
