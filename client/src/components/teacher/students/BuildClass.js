import { useState } from 'react';

const BuildClass = () => {
  const [className, setClassName] = useState('');
  const [classType, setClassType] = useState('');
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleClassNameChange = (e) => {
    setClassName(e.target.value);
  };

  const handleClassTypeChange = (e) => {
    setClassType(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleAddStudent = () => {
    const newStudent = {
      firstName,
      lastName,
      studentId,
    };

    setStudents([...students, newStudent]);
    setFirstName('');
    setLastName('');
    setStudentId('');
  };

  return (
    <div>
      <h2>Add Students</h2>
      <div>
        <label htmlFor="class-name-input">Class Name:</label>
        <input
          type="text"
          id="class-name-input"
          value={className}
          onChange={handleClassNameChange}
        />
      </div>
      <div>
        <label htmlFor="class-type-select">Class Type:</label>
        <select id="class-type-select" value={classType} onChange={handleClassTypeChange}>
          <option value="">Select a class type</option>
          <option value="language_arts">Language Arts</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
          <option value="social_studies">Social Studies</option>
        </select>
      </div>
      <div>
        <h3>Add Student:</h3>
        <div>
          <label htmlFor="first-name-input">First Name:</label>
          <input
            type="text"
            id="first-name-input"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="last-name-input">Last Name:</label>
          <input
            type="text"
            id="last-name-input"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="student-id-input">Student ID:</label>
          <input
            type="text"
            id="student-id-input"
            value={studentId}
            onChange={handleStudentIdChange}
          />
        </div>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
      <div>
        <h3>Class Information:</h3>
        <p>Class Name: {className}</p>
        <p>Class Type: {classType}</p>
        <h4>Students:</h4>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student.firstName} {student.lastName} ({student.studentId})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BuildClass;

