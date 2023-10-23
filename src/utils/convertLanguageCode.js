/**
 * Formats the 2 character langauge code to its name
 * @param dateString
 * @returns {string}
 */
import languageCodes from '../assets/languageCodes'

const convertLanguageCode = (code) => {
    const result = languageCodes.find(item => item.code === code)
    return result.name
}

export default convertLanguageCode