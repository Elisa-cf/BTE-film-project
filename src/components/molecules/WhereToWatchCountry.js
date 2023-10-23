/**
 * WhereToWatchCountry.js
 * Allows the user to select which country they live in
 */
import countryCodes from "../../assets/countryCodes";
import { useState, useEffect } from 'react'
import { uid } from 'uid'
import H3 from "../atoms/H3";
import Select from "../atoms/Select";
import CountryContainer from "../atoms/CountryContainer"

/**
 * Where to watch country component
 * @param props
 * @returns {JSX.Element}
 */
const WhereToWatchCountry = (props) => {

    // Declare the state variable for the select
    const [selectValue, setSelectValue] = useState(props.country)

    // When the country finder updates in the parent, select the country automatically
    useEffect(() => setSelectValue(props.country), [props.country])

    /**
     * Handles the select element for choosing a country
     * @param e
     */
    const selectHandler = (e) => {
            setSelectValue(e.target.value)
            props.setCountry(e.target.value)
    }

    // JSX
    return (
        <>
            <H3>Where to watch</H3>
            <CountryContainer>
                <Select value={selectValue} onChange={selectHandler}>
                    {countryCodes.map(country => <option key={uid()} value={country.code}>{country.name}</option>)}
                </Select>
            </CountryContainer>
        </>
    )
}

export default WhereToWatchCountry
