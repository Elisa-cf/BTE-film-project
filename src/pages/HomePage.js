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

    // Setup a state variable to store the search results
    const [searchData, setSearchData] = useState([])
    const [tvData, setTvData] = useState([])
    const [popularData, setPopularData] = useState([])
    const [toggleTV, setToggleTV] = useState(false)
    const [message, setMessage] = useState('')

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
            .then(response => setSearchData([...response.data.results]))
            .catch(error => console.log(error))
        axios
            .get(base_url + '/search/tv?query=' + encoded + '&' + api_key)
            .then((response) => setTvData([...response.data.results]))
            .catch((error) => console.log(error));

    } 

    // Get the data for trending movies of the day
    useEffect(() => {
        axios
            .get(base_url + '/trending/all/day?' + api_key)
            .then(response => setPopularData(response.data.results))
            .catch(error => console.log(error))
    }, [])

    console.log(popularData)
    // JSX
    return (
        <MainContainer>

            <HomeImage />
            {/* The search component for finding a movie */}
            <Search searchHandler={searchHandler} />

            { message !== '' && <MessageBox msg={message} />}
            {/* TODO improve this */}
            {((searchData.length > 0) || (tvData.length > 0)) && <FilterContainer>
                {!toggleTV && <P>Found {searchData.length} results:</P>}
                {toggleTV && <P>Found {tvData.length} results:</P>}
                <Button onClick={() => setToggleTV(!toggleTV)}>{toggleTV ? 'Show Films' : 'Show TV Series'}</Button>
            </FilterContainer>}


            {/* Display each result on a card once we have the results data, if there is no data show the carousel */}
            <ResultCardContainer>
                {!toggleTV && searchData.map(item => <SearchResultCard key={uid()} item={item} media='movie'/>)}
                {toggleTV && tvData.map(item => <SearchResultCard key={uid()} item={item} media='tv'/>)}
            </ResultCardContainer>

            {/* Display Carousel of popular movies */}
            <Carousel data={popularData} />
        </MainContainer>
    );
}
export default HomePage