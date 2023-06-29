import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.js";

const GET_ASSIGNMENTS_URL = "/get_assignemnts";

const GetAssignments = ({ renderLayout }) => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const teacherId = auth.id;

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getAssignments = async () => {
    console.log("getAssignments");
    console.log("teacherID: ", teacherId);
    console.log("accessToken: ", accessToken);
    console.log(GET_ASSIGNMENTS_URL);
    try {
      if (!auth || !auth.id) {
        console.log("Unauthorized access");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(`${GET_ASSIGNMENTS_URL}/${teacherId}`, {
        headers,
        withCredentials: true,
      });

      setAssignments(response.data.assignments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAssignments();
  }, []);

  const handleAssignmentClick = (assignmentName) => {
    if (selectedAssignment === assignmentName) {
      setSelectedAssignment(null);
    } else {
      setSelectedAssignment(assignmentName);
    }
  };

  return (
    <div>
      {renderLayout({
        assignments,
        selectedAssignment,
        handleAssignmentClick,
      })}
    </div>
  );
};

export default GetAssignments;
