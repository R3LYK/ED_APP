import React, { useState } from "react";
import GetTeacherCohorts from "../../components/teacher/GetTeacherCohorts";
import GetAssignments from "../../components/teacher/GetAssignments";

const AssignWork = () => {
  const [getAssignmentsClicked, setGetAssignmentsClicked] = useState(false);

  const handleGetAssignmentsClick = () => {
    setGetAssignmentsClicked(true);
  };

  return (
    <div>
      <h2>Choose class</h2>
       <GetTeacherCohorts showCohortNames={true} showStudentNames={false} /> 
      <button onClick={handleGetAssignmentsClick}>Get Assignments</button>
      {getAssignmentsClicked && (
        <GetAssignments showAssignmentNames={true} onGetAssignments={true} showQuestions={true} />
      )}
    </div>
  );
};

export default AssignWork;
