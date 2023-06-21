import "../css/nav.css"
import { NavLink } from "react-router-dom";

function TeacherDashNav() {
  return (
    <nav className="nav">
      <NavLink to="/" activeclassname="active">
        Home
      </NavLink>
      <ul>
        <li>
          <NavLink to="/about" activeclassname="active">
            Dashboard
          </NavLink>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default TeacherDashNav;
