/**
 * Trailer.js
 * Shows the trailer for a movie
 */
import axios from "axios";
import { api_key, base_url } from "../../utils/api_key";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import TrailerIframe from "../atoms/TrailerIframe";
import H3 from "../atoms/H3";

/**
 * Trailer
 * @returns {JSX.Element}
 */
const Trailer = (props) => {

    // Get the movie ID from the URL params
    const { id } = useParams();

    // State variable to store the trailer data
    const [trailerData, setTrailerData] = useState()

    /**
     * Get the data when the component loads
     */
    useEffect(() => {
        // URL for the API endpoint
        const url = base_url + `/${props.media}/${id}/videos?` + api_key;
        // Fetch the trailer data
        axios
            .get(url)
            .then((response) => checkTrailer(response.data))
            .catch((error) => console.log(error));
    }, [id, props.media])

    /**
     * Checks if the trailer exists and is on youtube
     * @param data
     */
    const checkTrailer = (data) => {
        // This syntax stops the error
        if(data.results[0] !== undefined) {
            if(data.results[0].site === "YouTube") setTrailerData(data)
        }
    }

    // JSX

    return (
      <section>
        {trailerData && (<>
            <H3>Trailer</H3>
            <TrailerIframe
                src={`https://www.youtube.com/embed/${trailerData.results[0].key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
        </>)}
      </section>
    );
}

export default Trailer;
