/**
 * ResultCard.js
 * Styled Component the Result card when a user searches
 */
import styled from "styled-components";

const ResultCard = styled.div`
    background: ${props => props.theme.colors.CardBackground};
    margin: 10px;
    border: 1px ${props => props.theme.colors.BorderColor} solid;
    border-radius: 4px;
    width: 300px;
    position: relative;
    text-align: left;
  
    img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }

    p {
        font-size: 14px;
        padding: 15px;
        color: ${props => props.theme.colors.Paragraph};
    }
    
    section {
        color: ${props => props.theme.colors.Heading};
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        background: ${props => props.theme.colors.CardBackground};
        width: 100%;
        transition: .5s ease;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    
    &:hover {
        section {
          opacity: 1;
        }
    }
    
    @media screen and (min-width:500px) {
        width: 260px;
    }
`

export default ResultCard;