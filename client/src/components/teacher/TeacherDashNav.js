import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

function TeacherDashNav() {
  const logout = useLogout();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const renderDashboardLink = () => {
    if (location.pathname === "/TeacherDashboard") {
      return (
        <NavLink exact="true" to="/TeacherDashboard" activeclassname="active">
          Dashboard
        </NavLink>
      );
    } else {
      return (
        <NavLink exact="true" to="/TeacherDashboard" activeclassname="active">
          Dashboard
        </NavLink>
      );
    }
  };

  return (
    <nav className="nav">
      {renderDashboardLink()}
      <ul>
        <li>
          <NavLink exact="true" to="/AssignmentGenerator" activeclassname="active">
            Create Assignments
          </NavLink>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            Sign Out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TeacherDashNav;
