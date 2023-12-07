import { gql } from "@apollo/client";

// users: [User]

// me: User
export const QUERY_ME = gql`
  {
    me {
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
        notes {
          _id
        }
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
  {
    breeds {
    }
  }
`;

// groups: [Group]
export const QUERY_ALL_GROUPS = gql`
  {
    groups {

    }
  }
`;

// breeds: [Breed]
export const QUERY_ALL_BREEDS = gql`
  {
    breeds {
    }
  }
`;

// breeds(group: ID): [Breed]
export const QUERY_BREEDS = gql`
  query getBreeds($groupNumber: Int) {
    breeds(groupNumber: $groupNumber) {
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
    }
  }
`;

// notes: [Note]
export const QUERY_ALL_NOTES = gql`
  {
    breeds {
    }
  }
`;

// note(noteId: ID!): Note
export const QUERY_NOTE = gql`
  {
    breeds {
    }
  }
`;
