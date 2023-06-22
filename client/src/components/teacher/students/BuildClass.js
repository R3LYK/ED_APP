import { useState } from "react";
import SaveStudent from "./SaveStudent";

const BuildClass = ({ selectedClassCode }) => {
  // This is the class code that the teacher selected
  const [className, setClassName] = useState("");
  const [studentFname, setStudentFName] = useState("");
  const [studentLname, setstudentLname] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleClassNameChange = (e) => {
    const value = e.target.value;
    setClassName(value);
  };

  const handleStudentFNameChange = (e) => {
    const value = e.target.value;
    setStudentFName(value);
  };

  const handlestudentLnameChange = (e) => {
    const value = e.target.value;
    setstudentLname(value);
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value;
    setStudentId(value);
  };

  const handleStudentEmailChange = (e) => {
    const value = e.target.value;
    setStudentEmail(value);
  };

  const handleStudentSubmit = () => {
    if (
      studentFname.trim() === "" ||
      studentLname.trim() === "" ||
      studentId.trim() === "" ||
      studentEmail.trim() === ""
    ) {
      setErrMsg("Field cannot be blank");
    } else {
      setStudentFName("");
      setstudentLname("");
      setStudentId("");
      setStudentEmail("");
      setErrMsg("");
    }
  };

  return (
    <div>
      <div className="name-class-container">
        <h4>Name class</h4>
        <input
          type="text"
          value={className}
          onChange={handleClassNameChange}
          placeholder="ex: 1st period"
        />
      </div>
      {/* This should take entire classes, but i'm unsure of the data structure available to most teachers.
            Having it like this allows me to set-up a rough backend. The controller will need to be tweaked though.*/}
      <div className="add-students-container">
        <form className="add-students-form">
          <h4>Add students</h4>
          <input
            type="text"
            value={studentFname}
            onChange={handleStudentFNameChange}
            placeholder="Lindon"
          />
          <input
            type="text"
            value={studentLname}
            onChange={handlestudentLnameChange}
            placeholder="Wei-Shi"
          />
          <input
            type="text"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="student-id"
          />
          <input
            type="text"
            value={studentEmail}
            onChange={handleStudentEmailChange}
            placeholder="student-email"
          />
          {errMsg && <p>{errMsg}</p>}
          <SaveStudent
            onStudentSubmit={handleStudentSubmit}
            selectedClassCode={selectedClassCode}
            className={className}
            studentFname={studentFname}
            studentLname={studentLname}
            studentId={studentId}
            studentEmail={studentEmail}
          />
        </form>
      </div>
    </div>
  );
};

export default BuildClass;
