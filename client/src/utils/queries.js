import { gql } from "apollo-boost";

export const GET_ROOMS = gql`
  query getRooms($landlordId: String!) {
    rooms(_id: $landlordId) {
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
