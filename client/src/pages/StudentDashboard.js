import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
      <p>This is where students can choose to create tests and assignments.</p>
      <p>And probably other stuff...</p>
      <span className="home-link">
        <Link to="/">Home</Link>
      </span>
      <div className="logout">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
