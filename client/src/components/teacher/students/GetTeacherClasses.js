import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import React, { useEffect } from "react";

const GET_TEACHER_CLASSES_URL = "/teacher";

const GetTeacherClasses = ({ onTeacherClassChange }) => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const userId = auth.id;
  console.log("userId:", userId);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching teacher classes");
      try {
        if (!accessToken || !userId) {
          console.log("Unauthorized access");
          return;
        }

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(`${GET_TEACHER_CLASSES_URL}/${userId}`, { headers, withCredentials: true });
        onTeacherClassChange(response.data.classCodes); // Assuming the response data has a "teacherClass" property
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [accessToken, userId]);

  return <div>{/* Display the teacher classes here */}</div>;
};

export default GetTeacherClasses;
