/**
 * Box.js
 * Styled Component for the genre bubbles
 */
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 50px;
  @media screen and (min-width:768px) {
    flex-direction: row;
    > * {
      width: 50%;
    }
  }
`

export default Box