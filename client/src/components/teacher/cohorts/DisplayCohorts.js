const DisplayCohort = ({ cohorts, selectedCohort, handleCohortClick, displayFormat }) => {
    return (
      <ul>
        {cohorts.map((cohort) => (
          <li
            key={cohort.cohortName}
            onClick={() => handleCohortClick(cohort.cohortName)}
            style={{ cursor: "pointer" }}
          >
            {cohort.cohortName}
            {selectedCohort === cohort.cohortName && (
              <ul>
                {cohort.students.map((student, index) => (
                  <li key={index}>
                    {displayFormat === "full" && `${student.firstName} ${student.lastName}`}
                    {displayFormat === "first" && student.firstName}
                    {displayFormat === "last" && student.lastName}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };
  

export default DisplayCohort;
