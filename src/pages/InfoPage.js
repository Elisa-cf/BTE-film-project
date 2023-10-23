/**
 * InfoPage.js
 * Displays all the info about 1 item
 */
import axios from "axios";
import { api_key, base_url } from "../utils/api_key";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import formatDate from '../utils/formatDate'

import WhereToWatch from '../components/molecules/WhereToWatch'
import Trailer from '../components/molecules/Trailer'
import FilmInformation from '../components/molecules/FilmInformation'
import Carousel from '../components/molecules/Carousel'

import MainContainer from "../components/atoms/MainContainer";
import H1 from "../components/atoms/H1"
import P from "../components/atoms/P"
import InfoTitleBar from "../components/atoms/InfoTitleBar";
import InfoImage from "../components/atoms/InfoImage"
import Box from "../components/atoms/Box"
import Credits from "../components/molecules/Credits";

/**
 * InfoPage
 * @returns {JSX.Element}
 */
const InfoPage = (props) => {

    // Get the film ID from the router params
    const { id } = useParams();

    // State variable to store the general film data
    const [filmData, setFilmData] = useState();

    // State variable to store where to watch data
    const [watchData, setWatchData] = useState();

    // State variable to store similar movies
    const [similarFilmData, setSimilarFilmData] = useState();

    const [credits, setCredits] = useState();
    
  
    // API Calls
    useEffect(()=> {

        // Get the general film data from the API when the page loads, use the id from the params
        axios
            .get(base_url + `/${props.media}/${id}?` + api_key)
            .then(response => setFilmData(response.data))
            .catch(error => console.log(error))

        // Get the where to watch data
        axios
            .get(base_url + `/${props.media}/${id}/watch/providers?` + api_key)
            .then(response => setWatchData(response.data.results))
            .catch(error => console.log(error))

        // Get the where to watch data
        axios
            .get(base_url + `/${props.media}/${id}/similar?` + api_key)
            .then(response => setSimilarFilmData(response.data.results))
            .catch(error => console.log(error))
        
        axios
            .get(base_url + `/${props.media}/${id}/credits?` + api_key)
            .then(response => setCredits(response.data))
            .catch(error => console.log(error))
    }, [id, props.media])

    // JSX Rendering

    return (
      <MainContainer>
        {/* Only display the information once the data has arrived */}
        {filmData && (
          <>
            <InfoTitleBar>
              <H1>{filmData.title || filmData.name}</H1>
              <span>
                {filmData.vote_average < 10
                  ? filmData.vote_average.toFixed(1)
                  : filmData.vote_average}
              </span>
            </InfoTitleBar>
            <P>Released: {formatDate(filmData.release_date)}</P>
            {filmData.backdrop_path && <InfoImage
              src={`http://image.tmdb.org/t/p/original${filmData.backdrop_path}`}
              alt={filmData.title}
            />}
            {filmData.overview && <P>{filmData.overview}</P>}
            <Box>
                <FilmInformation filmData={filmData} credits={credits} />
                <div>
                    <WhereToWatch watchData={watchData} />
                    <Trailer media={props.media} />
                    <Credits credits={credits} />
                </div>
            </Box>
          </>
        )}

        <Carousel data={similarFilmData} media={props.media} />
      </MainContainer>
    );
}
export default InfoPage