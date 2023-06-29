import { useState } from "react";
import GetTeacherCohorts from "../../components/teacher/GetTeacherCohorts";
import GetAssignments from "../../components/teacher/GetAssignments";
import assignWorkStyles from "../../css/assignWork.module.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";

const locales = {
  "en-Us": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AssignWork = () => {
  const renderAssignmentsLayout = ({
    assignments,
    selectedAssignment,
    handleAssignmentClick,
  }) => (
    <div className={assignWorkStyles["view-assignments-container"]}>
      <div className={assignWorkStyles["choose-class-container"]}>
        <h2>Assignments:</h2>
        <ul>
          {assignments.map((assignment, index) => (
            <li
              key={index}
              onClick={() => handleAssignmentClick(assignment.assignmentName)}
              style={{ cursor: "pointer" }}
            >
              {assignment.assignmentName}
            </li>
          ))}
        </ul>
      </div>
      {selectedAssignment && (
        <div className={assignWorkStyles["questions-container"]}>
          <h2>Questions:</h2>
          <ul>
            {assignments
              .find(
                (assignment) => assignment.assignmentName === selectedAssignment
              )
              .questions.map((question, index) => (
                <li key={index}>
                  <p>Question: {question.question}</p>
                  <p>Choices: {question.choices}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderTeacherCohortsLayout = ({
    showCohortNames,
    showStudentNames,
    cohorts,
    selectedCohort,
    handleCohortClick,
  }) => (
    <div className={assignWorkStyles["cohort-flex-container"]}>
      <div className={assignWorkStyles["cohort-list"]}>
        <h3>Choose Classes</h3>
        {showCohortNames && (
          <ul>
            {cohorts.map((cohort) => (
              <li
                key={cohort.cohortName}
                onClick={() => handleCohortClick(cohort.cohortName)}
                style={{ cursor: "pointer" }}
              >
                {cohort.cohortName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showStudentNames && selectedCohort && (
        <div>
          <h2>Selected Cohort:</h2>
          <ul>
            {cohorts
              .find((cohort) => cohort.cohortName === selectedCohort)
              .students.map((student, index) => (
                <li key={index}>
                  {student.firstName} {student.lastName}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className={assignWorkStyles["assign-work-flex-container"]}>
        <GetTeacherCohorts
          renderLayout={renderTeacherCohortsLayout}
          showCohortNames={true}
          showStudentNames={false}
        />
        <div className={assignWorkStyles["assignment-list-container"]}>
          {<GetAssignments renderLayout={renderAssignmentsLayout} />}
        </div>
        <div className={assignWorkStyles["calendar-container"]}>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 350, width: 350, margin: "50px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignWork;
