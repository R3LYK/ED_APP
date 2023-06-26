import React from "react";
import GetTeacherCohorts from "../../components/teacher/GetTeacherCohorts";
import classOverviewStyles from "../../css/classOverview.module.css";

const ClassOverview = () => {
  return (
    <div>
      <div className={classOverviewStyles["cohort-flex-container"]}>
        <h2>Teacher Cohorts:</h2>
        <ul>
          <GetTeacherCohorts showCohortNames={true} showStudentNames={true} />
        </ul>
      </div>
    </div>
  );
};

export default ClassOverview;
