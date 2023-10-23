/**
 * HomePage.js
 * Home page where the search and popular movies/tv are
 */
import { uid } from 'uid';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { api_key, base_url } from "../utils/api_key";

import HomeImage from "../components/molecules/HomeImage";
import Search from "../components/molecules/Search"
import SearchResultCard from "../components/molecules/SearchResultCard";
import Carousel from "../components/molecules/Carousel"
import MessageBox from "../components/molecules/MessageBox";
import MainContainer from "../components/atoms/MainContainer";
import ResultCardContainer from "../components/atoms/ResultCardContainer";
import FilterContainer from "../components/atoms/FilterContainer";
import Button from "../components/atoms/Button";
import P from '../components/atoms/P';

/**
 * Home page component
 * @returns {JSX.Element}
 */
const HomePage = () => {

    // Setup the state variables to store the movie data
    const [searchData, setSearchData] = useState([])
    const [movieData, setMovieData] = useState([])
    const [tvData, setTvData] = useState([])
    const [popularData, setPopularData] = useState([])

    // Setup the state variables to store user things
    const [searchFilter, setSearchFilter] = useState('All')
    const [message, setMessage] = useState('')
    const [hasSearched, setHasSearched] = useState(false)

    /**
     * Handler for when the user search for something
     * @param query
     */
    const searchHandler = (query) => {

        // Check to see if the user search box is empty, exit the function if it is
        if(query === '') {
            setMessage('Search query was empty')   // TODO Make this into something more useful
            return;
        }
        setMessage('');

        // Encode the search query to encodes the spaces, special characters etc
        const encoded = encodeURI(query);

        // Get the data the with axios
        axios
            .get(base_url + '/search/movie?query=' + encoded + '&' + api_key)
            .then(response => setMovieData([...response.data.results]))
            .catch(error => console.log(error))
        axios
            .get(base_url + '/search/tv?query=' + encoded + '&' + api_key)
            .then((response) => setTvData([...response.data.results]))
            .catch((error) => console.log(error));

        // Change the has searched flag to enable the useEffect below
        setHasSearched(true);
    }

    // Get the data for trending movies of the day
    useEffect(() => {
        axios
            .get(base_url + '/trending/all/day?' + api_key)
            .then(response => setPopularData(response.data.results))
            .catch(error => console.log(error))
    }, [])


    // Filters and sorts the data when it comes in
    useEffect(() => {

        // We need to add the type of media to have the correct link for the search results
        const movies = movieData.map(item => {
            item.media_type = 'movie'
            return item
        })
        const tv = tvData.map(item => {
            item.media_type = 'tv'
            return item
        })

        // Filter the data based on what the user has chosen
        let combinedData = [];
        if (searchFilter === 'All') combinedData = [...movies, ...tv];
        if (searchFilter === 'Movies') combinedData = [...movies];
        if (searchFilter === 'TV') combinedData = [...tv];

        // If there are no results, send the user a message
        if(hasSearched && combinedData.length === 0) setMessage('No results found')
        else setMessage('')

        // Sort the data by popularity to show the most relevant items first
        combinedData = combinedData.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));

        // Store the search result data in the state
        setSearchData(combinedData)

    }, [movieData, tvData, hasSearched, searchFilter])

    /**
     * filterButtonHandler
     * Switches between the filter mode when the user presses the button
     */
    const filterButtonHandler = () => {
        if(searchFilter === 'All') setSearchFilter('Movies')
        else if(searchFilter === 'Movies') setSearchFilter('TV')
        else setSearchFilter('All')
    }

    // JSX
    return (
        <MainContainer>

            <HomeImage />

            {/* The search component for finding a movie */}
            <Search searchHandler={searchHandler} />

            {/* Display the number of search results as well as the filter button */}
            {searchData.length > 0 && <FilterContainer>
                <P>Found {searchData.length} results:</P>
                <Button onClick={filterButtonHandler}>Filter: {searchFilter}</Button>
            </FilterContainer>}

            {/* If theres a message for the user, display it */}
            { message !== '' && <MessageBox msg={message} />}

            {/* Display each result on a card once we have the results data, if there is no data show the carousel */}
            <ResultCardContainer>
                {searchData && searchData.map(item => <SearchResultCard key={uid()} item={item} media={item.media_type}/>)}
            </ResultCardContainer>

            {/* Display Carousel of popular movies */}
            <Carousel data={popularData} />

        </MainContainer>
    );
}
export default HomePage