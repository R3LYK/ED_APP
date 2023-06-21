import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/teacherDashboard.css";
import CreateAssignment from "../components/teacher/quizCreation/CreateAssignment";

const TeacherDashboard = () => {
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  const handleBoxClick = () => {
    setShowCreateAssignment(true);
  };

  if (showCreateAssignment) {
    return <CreateAssignment />;
  }

  return (
    <div className="container-2">
      <div className="main-flex-container">
        <Link to="/TeacherDashboard/CreateClasses" className="flex-grid-item">
          <h3>Add classes or students</h3>
          <p>Create classes, add or remove students.</p>
        </Link>

        <div className="flex-grid-item" onClick={handleBoxClick}>
          <h3>Create assignments</h3>
          <p>Create assignments</p>
        </div>

        <div className="flex-grid-item">
          <h3>Assign assignments</h3>
          <p>
            Add or remove assignments, quizzes, tests, or lessons to entire
            classes or individual students. View newly created or already
            existing assignments.
          </p>
        </div>

        <div className="flex-grid-item">
          <h3>View student progress</h3>
          <p>
            View student progress with assignments, see what they need help
            with, what they've been studying, and other data.
          </p>
        </div>

        <div className="flex-grid-item">
          <h3>View student grades</h3>
          <p>Quick view of student grades by class or individual</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
