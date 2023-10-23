/**
 * CastImage.js
 * Styled Component the Cast Image 
 */
import styled from "styled-components";

const CastImage = styled.img`
  border: 1px ${(props) => props.theme.colors.BorderColor} solid;
  border-radius: 3px;
  width: 80%;

  @media screen and (min-width: 700px) {
    width: 100%;
  }
`;

export default CastImage;
