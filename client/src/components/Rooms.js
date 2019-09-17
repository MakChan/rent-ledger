import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_ROOMS = gql`
  query getRooms($landlordId: String!) {
    rooms(_id: $landlordId) {
      roomNo
      lease {
        rent
        current
      }
    }
  }
`;

function Rooms({ userState }) {
  const { data, loading } = useQuery(GET_ROOMS, {
    variables: { landlordId: userState.user.landlord._id }
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Rooms</h2>
      {loading
        ? "Loading"
        : data.rooms.map(room => (
            <div key={room.roomNo}>
              <h4>
                {room.roomNo} - {room.lease ? room.lease.rent : "Vacant"}
              </h4>
            </div>
          ))}
    </div>
  );
}

export default Rooms;
