/**
 * NavBar.js
 * Navbar for all pages
 */
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Nav from "../atoms/Nav";
import NavHeading from "../atoms/NavHeading";
import NavLogo from "../atoms/NavLogo";
import Button from "../atoms/Button";
import ThemeContext from "../../contexts/ThemeContext";
/**
 * Navbar component
 * @returns {JSX.Element}
 */
const NavBar = () => {

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    // Store the theme preference in local storage
    const themeHandler = () => {
        localStorage.setItem('darkMode', `${!darkMode}`);
        setDarkMode(!darkMode)
    }

    return (
      <Nav>
          <div>
              <NavLogo src="/Logo_cinema.png" />
              <Link to="/">
                <NavHeading>Film Hero</NavHeading>
              </Link>
          </div>
          <Button onClick={themeHandler}>{darkMode ? 'Light' : 'Dark'}</Button>
      </Nav>
    );
}

export default NavBar;