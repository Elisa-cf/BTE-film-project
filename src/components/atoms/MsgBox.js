import styled from "styled-components";

const MsgBox = styled.div`
  display: flex;
  place-content: center;
  margin: 20px 0;
  
  p {
    background: ${props => props.theme.colors.MessageBoxBackground};
    color: ${props => props.theme.colors.Paragraph};
    border: 1px ${props => props.theme.colors.BorderColor} solid;
    border-radius: 4px;
    padding: 5px 20px;
  }
`

export default MsgBox