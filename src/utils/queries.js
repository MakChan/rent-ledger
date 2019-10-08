import { gql } from "apollo-boost";

export const GET_ROOMS = gql`
  query {
    rooms {
      _id
      roomNo
      currentLease {
        _id
        rent
        current
        tenant {
          name
        }
      }
    }
  }
`;

export const GET_CURRENT_LEASES = gql`
  query {
    currentLeases {
      _id
      rent
      initialReading
      tenant {
        name
      }
      lastPayment {
        reading
        balance
      }
      room {
        roomNo
      }
    }
  }
`;
