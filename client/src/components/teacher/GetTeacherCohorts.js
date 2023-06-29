import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.js";

const GET_COHORTS_URL = "/get_teacher_cohorts";

const GetTeacherCohorts = ({ showCohortNames, showStudentNames, renderLayout }) => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const teacherId = auth.id;

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);

  const getCohorts = async () => {
    try {
      if (!auth || !auth.id) {
        console.log("Unauthorized access");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(`${GET_COHORTS_URL}/${teacherId}`, {
        headers,
        withCredentials: true,
      });

      setCohorts(response.data.cohorts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCohorts();
  }, []);

  const handleCohortClick = (cohortName) => {
    if (selectedCohort === cohortName) {
      setSelectedCohort(null);
    } else {
      setSelectedCohort(cohortName);
    }
  };

  return (
    <div>
      {renderLayout({
        showCohortNames,
        showStudentNames,
        cohorts,
        selectedCohort,
        handleCohortClick,
      })}
    </div>
  );
};

export default GetTeacherCohorts;
