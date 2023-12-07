import { gql } from "@apollo/client";

// users: [User]

// me: User
export const QUERY_ME = gql`
  {
    me {
      breeds {
        _id
        notes {
          _id
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
    breeds {
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
  query getBreeds() {
    breeds(group: $group) {

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
