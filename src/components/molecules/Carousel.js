/**
 * 
 * Shows a carousel of other movies
 * 
 */

import { Link } from 'react-router-dom'
import { uid } from 'uid'
import { useState, useEffect } from 'react'
import H3 from '../atoms/H3'
import ResultCardContainer from "../atoms/ResultCardContainer";
import SearchResultCard from "./SearchResultCard";


/**
 * Carousel component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const Carousel = (props) => {

    const [ newData, setNewData ] = useState([])

    useEffect(() => {
        if(!props.data) return;
            setNewData(props.data.map(item => {
                if(item.media_type) return item;
                item.media_type = props.media;
                return item;
            }))
    }, [props.data, props.media]);


    return (
        <>
            {props.media === 'tv' && <H3>Similar TV Series</H3>}
            {props.media === 'movie' && <H3>Similar Movies</H3>}
            {props.media === undefined && <H3>Popular Content</H3>}

            {newData && <ResultCardContainer>
                {newData.map(item =>
                    <Link key={uid()} to={`/${item.media_type}/${item.id}`}>
                        {/*<Item src={`http://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title}/>*/}
                        <SearchResultCard key={uid()} item={item} media={item.media_type}/>
                    </Link>
                )}
            </ResultCardContainer>}
        </>
    )
}

export default Carousel;