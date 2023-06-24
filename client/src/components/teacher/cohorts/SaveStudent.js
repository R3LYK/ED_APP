import axios from "../../../api/axios.js";
import useAuth from "../../../hooks/useAuth.js";
import { useState, useEffect } from "react";

const SUBMIT_STUDENT_URL = "/save_student";

const SaveStudent = ({
  onStudentSubmit,
  selectedClassCode,
  className,
  studentFname,
  studentLname,
  studentId,
  studentEmail,
}) => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const teacherId = auth.id;

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check if any of the fields are blank
  if (
    studentFname.trim() === "" ||
    studentLname.trim() === "" ||
    studentId.trim() === "" ||
    studentEmail.trim() === ""
  ) {
    // Set the error message
    setErrMsg("Field cannot be blank");
    return;
  }

    try {
      if (!auth || !auth.id) {
        console.log("Unauthorized access");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${SUBMIT_STUDENT_URL}/${teacherId}`,
        {
          cohortName: className.toLowerCase(),
          cohortCode: selectedClassCode.toLowerCase(),
          teacherId,
          students: [
            {
              firstName: studentFname.toLowerCase(),
              lastName: studentLname.toLowerCase(),
              studentId: studentId.toLowerCase(),
              email: studentEmail.toLowerCase(),
            },
          ],
        },
        { headers, withCredentials: true }
      );

      if (response.status === 201) {
        console.log("Student stored successfully!");
        // Reset the form or perform any other necessary actions
        onStudentSubmit(); // Call the onCustomCodeSubmit callback provided by the parent component
      } else {
        console.error("Failed to store student.");
      }
    } catch (error) {
      console.error("Error storing student:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (errMsg) {
      timer = setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [errMsg]);

  return (
    <div>
      <button onClick={handleSubmit}>Add Student</button>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};

export default SaveStudent;
