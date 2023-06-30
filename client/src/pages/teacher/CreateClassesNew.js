import React, { useState } from "react";
import createCohortStyles from "../../css/createClasses.module.css";
import GetClassData from "../../components/teacher/classCodes/GetClassData";
import SubmitCodeButton from "../../components/teacher/classCodes/StoreTeachClassCodes";
import AddNewClassCodeButton from "../../components/teacher/classCodes/AddNewClassCodeButton";
import GetTeacherClasses from "../../components/teacher/GetTeacherClasses";
import BuildClass from "../../components/teacher/cohorts/BuildClass";

import Accordion from "../../components/Accordion";

const CreateClasses = () => {
  //classCode states
  const [classType, setClassType] = useState("");
  const [classCode, setClassCode] = useState([]);
  const [customCode, setCustomCode] = useState("");
  const [isCodeSaved, setIsCodeSaved] = useState(false);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [selectedClassCode, setSelectedClassCode] = useState("");

  console.log("teacherClasses", teacherClasses);

  const handleTeacherClassChange = (teacherClasses) => {
    setTeacherClasses(teacherClasses);
  };

  const handleClassCodeChange = (value) => {
    setSelectedClassCode(value);
  };
  

  const handleClassTypeChange = (value) => {
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
    <div className={createCohortStyles["create-class-container"]}>
      <div className={createCohortStyles["flex-1"]}>
        <div>
          <form>
            <label htmlFor="classType-input">Add your class code:</label>
            <div>
            <Accordion title="Select a class type" content={["Language Arts", "Mathematics", "Science", "Social Studies"]} />

            </div>
          </form>
        </div>
        <div>
          <GetTeacherClasses onTeacherClassChange={handleTeacherClassChange} />
          <form>
            <label htmlFor="classType-input">Choose the class code</label>
            <div>
            <Accordion title="Choose the class code" content={teacherClasses} />

            </div>
          </form>
        </div>
        <BuildClass selectedClassCode={selectedClassCode} />
      </div>

      {classType && (
        <>
          <div className={createCohortStyles["flex-container"]}>
            <div className={createCohortStyles["flex-2"]}>
              <div className={createCohortStyles["code-description-container"]}>
                <p>
                  Select any class codes that apply to any of your classes.
                  These selections will help us determine the difficulty level
                  of questions to generate.
                </p>
              </div>
              <div className={createCohortStyles["code-items-container"]}>
                <ul className={createCohortStyles["code-items"]}>
                  <GetClassData
                    styles={createCohortStyles}
                    classType={classType}
                    onItemClick={handleItemClick}
                  />
                </ul>
              </div>
            </div>
            {!isCodeSaved && classCode.length > 0 && (
              <div className={createCohortStyles["selected-classes-container"]}>
                <span className={createCohortStyles["horizontal-line"]}></span>
                <div
                  className={
                    createCohortStyles["selected-classes-flex-container"]
                  }
                >
                  <h3>Selected Classes:</h3>
                  <ul>
                    {classCode.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div>
                    {!isCodeSaved && (
                      <SubmitCodeButton
                        styles={createCohortStyles}
                        classCode={classCode}
                        onClassCodeSaved={handleClassCodeSaved}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className={createCohortStyles["custom-code-container"]}>
              <span className={createCohortStyles["horizontal-line"]}></span>
              <h5>Don't see the code you're looking for? Add a new one!!</h5>
              <div className={createCohortStyles["custom-flex-container"]}>
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateClasses;
