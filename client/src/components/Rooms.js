import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ROOMS } from "../utils/queries";

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
                {room.roomNo} -{" "}
                {room.currentLease ? room.currentLease.tenant.name : "Vacant"}
              </h4>
            </div>
          ))}
    </div>
  );
}

export default Rooms;
