/**
 * NavHeading.js
 * Styled Component the Site Title
 */
import styled from "styled-components";

const NavHeading = styled.h2`
  margin: 0 10px;
  color: ${props => props.theme.colors.SiteTitle};
  font-weight: bold;
  font-size: 1.4rem;
  text-decoration: none;
  display: inline-block;

  &:hover {
    color: ${props => props.theme.colors.SiteTitleHover};
  }
  @media screen and (min-width:500px) {
    font-size: 1.6rem;
  }

  @media screen and (min-width:800px) {
    font-size: 1.8rem;
  }
`;

export default NavHeading;