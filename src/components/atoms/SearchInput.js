/**
 * SearchInput.js
 * Styled component for the search input field
 */
import styled from "styled-components";

const SearchInput = styled.input`
    width: 300px;
    padding: 10px;
    font-size: 15px;

    border: 1px ${props => props.theme.colors.BorderColor} solid;
    border-radius: 10px;

    color: ${props => props.theme.colors.InputFontColor};
    background: ${props => props.theme.colors.InputBackgroundColor};
  
    text-align: center;
    :focus::placeholder {
        color: transparent;
    }
  
    ::-webkit-input-placeholder {
      font-size: 16px;
    }

    @media screen and (min-width:1141px) {
        font-size: 16px;
    }

`

export default SearchInput;