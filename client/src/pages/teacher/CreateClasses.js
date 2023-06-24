import React, { useState } from "react";
import "../../css/createClasses.css";
import GetClassData from "../../components/teacher/classCodes/GetClassData";
import SubmitButton from "../../components/teacher/classCodes/StoreTeachClassCodes";
import AddNewClassCodeButton from "../../components/teacher/classCodes/AddNewClassCodeButton";
import GetTeacherClasses from "../../components/teacher/classCodes/GetTeacherClasses";
import BuildClass from "../../components/teacher/cohorts/BuildClass";

const CreateClasses = () => {
  //classCode states
  const [classType, setClassType] = useState("");
  const [classCode, setClassCode] = useState([]);
  const [customCode, setCustomCode] = useState("");
  const [isCodeSaved, setIsCodeSaved] = useState(false);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [selectedClassCode, setSelectedClassCode] = useState("");

  console.log(classCode);

  const handleTeacherClassChange = (teacherClasses) => {
    setTeacherClasses(teacherClasses);
  };

  const handleClassCodeChange = (e) => {
    const value = e.target.value;
    setSelectedClassCode(value);
    console.log("selectedClassCode:", selectedClassCode);
  };

  const handleClassTypeChange = (e) => {
    const value = e.target.value;
    setClassType(value);
  };

  const handleItemClick = (item) => {
    setClassCode([...classCode, item]);
  };

  const handleCustomCodeChange = (e) => {
    const value = e.target.value;
    setCustomCode(value);
  };

  const handleCustomCodeSubmit = () => {
    if (customCode) {
      const code = customCode.toString(); // Convert to string
      setClassCode([...classCode, code]);
      setCustomCode("");
    }
  };

  const handleClassCodeSaved = () => {
    setIsCodeSaved(true); // Update the state variable when the class code is saved
    setClassType(""); // Reset the classType to clear the list
    setClassCode([]); // Clear the classCode list
  };

  return (
    <div>
      <h1 className="lesson-plans-title">Create Classes</h1>
      <p>This is where teachers can create classes.</p>
      <p>And probably other stuff...</p>
      {/* I'm thinking this will eventually be tied to a flag on the user.
          It only needs to show up initially if they haven't selected 
          class codes yet. We will block all the functionality below this
          until they choose their classes. Then, we will give the option on
          the 'choose-class-type' to add additional, in case they need to add
          classes later. */}
      <div className="create-classes-flex-container">
        <div className="choose-class-type">
          <form className="create-classes-form">
            <label htmlFor="classType-input">Add your class code:</label>
            <div className="input-container">
              <select
                id="classType-input"
                value={classType}
                onChange={handleClassTypeChange}
              >
                {/* need to grab these from the backend and display dynamically
                    as the user's should be able to add thier own if they don't
                    already exist. */}
                <option value="">Select a class type</option>
                <option value="language_arts">Language Arts</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="social_studies">Social Studies</option>
              </select>
            </div>
          </form>
        </div>
        <div className="choose-class-type">
          <GetTeacherClasses onTeacherClassChange={handleTeacherClassChange} />
          <form className="choose-class-type-form">
            <label htmlFor="classType-input">Choose the class code</label>
            <div className="input-container">
              <select
                id="classType-input"
                value={selectedClassCode}
                onChange={handleClassCodeChange}
              >
                <option value="">Choose class code</option>
                {teacherClasses.map((classCode, index) => (
                  <option key={index} value={classCode}>
                    {classCode}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <BuildClass selectedClassCode={selectedClassCode}/>
      </div>

      {classType && (
        <>
          <GetClassData classType={classType} onItemClick={handleItemClick} />
          {!isCodeSaved &&
            classCode.length > 0 && ( // Render the classCode list only if it's not saved and classCode has items
              <div className="selected-classes-container">
                <h3>Selected Classes:</h3>
                <ul>
                  {classCode.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          {!isCodeSaved && ( // Render the SubmitButton component only if code is not saved
            <SubmitButton
              classCode={classCode}
              onClassCodeSaved={handleClassCodeSaved}
            />
          )}
          <div className="custom-code-container">
            <input
              type="text"
              value={customCode}
              onChange={handleCustomCodeChange}
            />
            <AddNewClassCodeButton
              classType={classType}
              customCode={customCode}
              text="Add New Code"
              onCustomCodeSubmit={handleCustomCodeSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateClasses;
