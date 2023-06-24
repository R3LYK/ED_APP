import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <nav className="nav">
        <Navbar />
      </nav>
      <h1>Mr. Pettitt's science app</h1>
      <span className="home-link">
        <Link to="/teacher_dashboard">TeacherDashboard</Link>
      </span>
      <span className="home-link">
        <Link to="/StudentDashboard">StudentDashboard</Link>
      </span>
      <span>
        <Link to="/TeachDash">TeachDash</Link>
      </span>
    </div>
  );
}

export default Home;
