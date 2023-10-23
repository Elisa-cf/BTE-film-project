/**
 * FilmInformationItem.js
 * Draws a singular piece of information for the film
 */

import P from '../atoms/P'
import TD from '../atoms/TD'

/**
 * Film information item component
 * @param props
 * @returns {JSX.Element}
 */
const FilmInformationItem = (props) => {
    return (<tr>
            <TD><P><b>{props.title}</b></P></TD>
            {/* If there is a link prop, make the item into a link */}
            {props.link ? <TD><a href={props.text}><P>{props.text}</P></a></TD> : <TD><P>{props.text}</P></TD>}
        </tr>)
}

export default FilmInformationItem