import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/teacherDashboard.css";
import CreateAssignment from "../../components/teacher/quizCreation/CreateAssignment";

const TeacherDashboard = () => {
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  const handleCreateAssignmentClick = () => {
    setShowCreateAssignment(true);
  };

  if (showCreateAssignment) {
    return <CreateAssignment />;
  }

  return (
    <div className="container-2">
      <div className="main-flex-container">
        <Link to="/teacher_dashboard/create_classes" className="flex-grid-item">
          <h3>Add classes or students</h3>
          <p>Create classes, add or remove students.</p>
        </Link>

        <div className="flex-grid-item" onClick={handleCreateAssignmentClick}>
          <h3>Create assignments</h3>
          <p>Create assignments</p>
        </div>

        <Link to="/teacher_dashboard/assign_work"className="flex-grid-item">
          <h3>Assign assignments</h3>
          <p>
            Add or remove assignments, quizzes, tests, or lessons to entire
            classes or individual students. View newly created or already
            existing assignments.
          </p>
        </Link>
        <Link to="/teacher_dashboard/class_overview" className="flex-grid-item">
          <h3>View classes</h3>
          <p>
            View classes and students. Add or remove students from classes. View
            student progress, grades, and other information.
          </p>
        </Link>

        <div className="flex-grid-item">
          <h3>View student grades</h3>
          <p>Quick view of student grades by class or individual</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
