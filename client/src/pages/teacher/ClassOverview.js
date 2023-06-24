import React from "react";
import GetTeacherCohorts from "../../components/teacher/GetTeacherCohorts";

const ClassOverview = () => {
  return (
    <div>
      <h2>Class Overview</h2>
      <div>
        <GetTeacherCohorts showCohortNames={true} showStudentNames={true} />
      </div>
    </div>
  );
};

export default ClassOverview;