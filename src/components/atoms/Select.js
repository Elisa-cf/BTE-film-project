/**
 * Select.js
 * Styled Component the select (used to select country)
 */
import styled from "styled-components";

const Select = styled.select`
    padding: 5px;
    margin: 0 10px;
    font-size: 15px;
    border-radius: 4px;
    color: ${props => props.theme.colors.InputFontColor};
    background: ${props => props.theme.colors.InputBackgroundColor};
`

export default Select