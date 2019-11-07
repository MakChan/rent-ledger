import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import OpenIcon from "@atlaskit/icon/glyph/open";

import { GET_ROOMS } from "../utils/queries";

import { Loader } from "../components/Loader";
import {COLOR_PRIMARY} from "../utils/constants"

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

function Rooms() {
  const { data, loading } = useQuery(GET_ROOMS);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Rooms</h2>
      {loading ? (
        <Loader size="medium" />
      ) : (
        data &&
        data.rooms.map(room => (
          <Room key={room.roomNo} vacant={!room.currentLease}>
            <div style={{ display: "flex" }}>
              {room.currentLease ? (
                <h4 style={{ lineHeight: 'inherit' }}>
                  {room.currentLease.tenant.name}
                </h4>
              ) : (
                "Vacant"
              )}

              {room.currentLease && (
                <Link to={`/lease/${room.roomNo}/${room.currentLease._id}`}>
                  <OpenIcon primaryColor="#562aa5" />
                </Link>
              )}
            </div>

            <h3>{room.roomNo}</h3>
          </Room>
        ))
      )}
    </div>
  );
}

export default Rooms;
