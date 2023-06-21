import "../css/nav.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <NavLink exact="true" to="/" activeclassname="active">
        Home
      </NavLink>
      <ul>
        <li>
          <NavLink exact="true" to="/about" activeclassname="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" to="/studentregister" activeclassname="active">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
