// Crystal clear = #DCEDE9
// Tricorn Black = #2F2F2F
// Halcyon Green = #9BAAA3
// Inverness Green = #576238
// Glitzy Gold = #D7A02B

import styled from "styled-components";
import { Button, Link } from "@material-ui/core";

export const GreenButton = styled(Button)`
  background-color: #576238;
  :hover {
    background-color: #3b4225;
  }
  margin: 2%;
`;

export const BlackLink = styled(Link)`
  color: #2f2f2f;
`;
