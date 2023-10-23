/**
 * Credits.js
 * Displays a flexbox with up to 8 cast members
 */
import { uid } from 'uid';
import P from "../atoms/P";
import CastImageContainer from "../atoms/CastImageContainer";
import H3 from "../atoms/H3";
import CastImage from "../atoms/CastImage";
import CastMember from "../atoms/CastMember";

/**
 * Credits
 * @param props
 * @returns {JSX.Element}
 */
const Credits = (props) => {
  return (
    <>
      <H3>Cast:</H3>
      <CastImageContainer>
        {props.credits && props.credits.cast.slice(0, 8).map((person) => (
            <CastMember key={uid()}>

                {/* Only attempt to get a profile if the url exists, to prevent 404's */}
                {person.profile_path && <CastImage
                width="100%"
                src={`http://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                onError={(e) =>
                  (e.target.src = `http://via.placeholder.com/102x152/dddddd/?text=${person.name}`)
                }
                />}

                {/* If there is no profile */}
                {!person.profile_path && <CastImage
                    width="100%"
                    src={`http://via.placeholder.com/102x152/dddddd/?text=${person.name}`}
                    alt={person.name}
               />}

              <P>{person.name}</P>
            </CastMember>
          ))}
      </CastImageContainer>
    </>
  );
};
export default Credits;


