import React, { useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import useDataFetching from "../../hooks/useDataFetching";
import useAuth from "../../hooks/useAuth";
import classOverviewStyles from "../../css/classOverview.module.css";

const GET_COHORTS_URL = "/get_teacher_cohorts";

const ClassOverview = () => {
  const { auth } = useAuth();
  const userId = auth.id;

  const [selectedCohort, setSelectedCohort] = useState(null);
  const { data: response, isLoading, error } = useDataFetching(
    GET_COHORTS_URL,
    'GET',
    userId,
    {
      Authorization: `Bearer ${auth.accessToken}`,
      "Content-Type": "application/json",
    }
  );

  const cohorts = response && response.cohorts;

  const handleCohortClick = (cohortName) => {
    if (selectedCohort === cohortName) {
      setSelectedCohort(null);
    } else {
      setSelectedCohort(cohortName);
    }
  };

  return (
    <ErrorBoundary>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : cohorts && cohorts.length > 0 ? (
          <div className={classOverviewStyles["cohort-flex-container"]}>
            <div className={classOverviewStyles["cohort-list"]}>
              <h3>Teacher Cohorts</h3>
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
            </div>
            <div className={classOverviewStyles["cohort-displayed-list"]}>
              {selectedCohort && (
                <div>
                  <h2>Selected Cohort</h2>
                  <ul>
                    {cohorts
                      .find((cohort) => cohort.cohortName === selectedCohort)
                      .students.map((student) => (
                        <li key={student._id}>
                          {student.firstName} {student.lastName}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>No cohorts available.</div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ClassOverview;
