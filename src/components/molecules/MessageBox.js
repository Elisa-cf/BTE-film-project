/**
 * MessageBox.js
 * Component which displays a message box to the user
 */

import MsgBox from "../atoms/MsgBox";

/**
 * MessageBox
 * @param msg the message to display
 * @returns {JSX.Element}
 */
const MessageBox = ({msg}) => {
    return(
        <MsgBox>
            <p>{msg}</p>
        </MsgBox>
    )
}

export default MessageBox