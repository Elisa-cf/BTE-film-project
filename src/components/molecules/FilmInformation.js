/**
 * FilmInformation.js
 * Calls the subcomponent FilmInformationItem for each thing like genre, rating, blah
 */
import {useState, useEffect} from 'react'
import { uid } from 'uid'
import FilmInformationItem from './FilmInformationItem'
import formatDate from "../../utils/formatDate";
import convertLanguageCode from "../../utils/convertLanguageCode";
import Bubble from "../atoms/Bubble";
import BubbleContainer from "../atoms/BubbleContainer";
import TD from '../atoms/TD'
import H3 from "../atoms/H3";
import P from "../atoms/P"

/**
 * Film Information component
 * @param props
 * @returns {JSX.Element}
 */
const FilmInformation = (props) => {

    // State to store the director
    const [director, setDirector] = useState();

    // Find the director from the api call for cast and crew
    useEffect(() => {
        if(props.credits) {
            let crew = props.credits.crew.find((person) => person.job === "Director" )
            if(crew) setDirector(crew.name)
        }
    }, [props.credits])


    return (<section>
        <H3>More Information</H3>
        <table>
            <tbody>
                {props.filmData['title'] ? <FilmInformationItem title={"Title:"} text={props.filmData['title']} /> : null}
                {props.filmData['original_title'] ? <FilmInformationItem title={"Original Title:"} text={props.filmData['original_title']} /> : null}
                {props.filmData['tagline'] ? <FilmInformationItem title={"Tagline:"} text={props.filmData['tagline']} /> : null}
                {props.filmData['status'] ? <FilmInformationItem title={"Status:"} text={props.filmData['status']} /> : null}
                {props.filmData['release_date'] ? <FilmInformationItem title={"Release Date:"} text={formatDate(props.filmData['release_date'])} /> : null}
                {props.filmData['homepage'] ? <FilmInformationItem title={"Website:"} text={props.filmData['homepage']} link={true}/> : null}
                {props.filmData['runtime'] ? <FilmInformationItem title={"Runtime:"} text={`${props.filmData["runtime"]} minutes`} /> : null}
                {props.filmData['vote_average'] >= 0 ? <FilmInformationItem title={"Rating:"} text={`${props.filmData['vote_average']}/10`} /> : null}
                {props.filmData['vote_count'] > 0 ? <FilmInformationItem title={"Votes:"} text={`${props.filmData['vote_count']}`} /> : null}
                {props.filmData['budget'] > 0 ? <FilmInformationItem title={"Budget:"} text={`$${props.filmData['budget']}`} /> : null}
                {props.filmData['revenue'] > 0 ? <FilmInformationItem title={"Revenue:"} text={`$${props.filmData['revenue']}`} /> : null}
                {props.filmData['original_language'] ? <FilmInformationItem title={"Original Language:"} text={convertLanguageCode(props.filmData["original_language"])} /> : null}
                {director ? <FilmInformationItem title={'Director:'} text={director} /> : null}
                <tr>
                    <TD><P><b>Genre Tags:</b></P></TD>
                    <TD><BubbleContainer>{props.filmData.genres.map((genre) => <Bubble key={uid()}>{genre.name}</Bubble>)}</BubbleContainer></TD>
                </tr>
            </tbody>
        </table>
    </section>
    )
}

export default FilmInformation