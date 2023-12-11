// Third-party modules
import { Link } from "react-router-dom";

// Local modules
// Auth for if/else navbar logic
import Auth from "../../../utils/auth";

// Component css
import "./style.css";

const Navbar = () => {
  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <a href='/' onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/groups'>Groups</Link>
        </li>
        <li>
          <Link to='/breeds'>Breeds</Link>
        </li>
        <li>
          <Link to='/me'>Dashboard</Link>
        </li>
      </ul>

      <nav>{showNav()}</nav>
    </header>
  );
};

export default Navbar;
