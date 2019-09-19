import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { GET_ROOMS } from "../utils/queries";

import { Loader } from "../components/Loader";

const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: ${props => (props.vacant ? "#f2f2f2" : "#f4edff")};

  & > h3 {
    margin-top: 0;
  }
`;

function Rooms({ userState }) {
  const { data, loading } = useQuery(GET_ROOMS, {
    variables: { landlordId: userState.user.landlord._id }
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Rooms</h2>
      {loading ? (
        <Loader size="medium" />
      ) : (
        data.rooms.map(room => (
          <Room key={room.roomNo} vacant={!room.currentLease}>
            {room.currentLease ? (
              <h4>{room.currentLease.tenant.name}</h4>
            ) : (
              "Vacant"
            )}
            <h3>{room.roomNo}</h3>
          </Room>
        ))
      )}
    </div>
  );
}

export default Rooms;
