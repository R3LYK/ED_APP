import React, { useState } from 'react';
import GetExistClassCode from '../components/teacher/classCodes/GetExistClassCode';
import SubmitButton from '../components/teacher/classCodes/StoreTeachClassCodes';
import AddNewClassCodeButton from '../components/teacher/classCodes/AddNewClassCodeButton';

const CreateClasses = () => {

  //classCode states
  const [classType, setClassType] = useState('');
  const [classCode, setClassCode] = useState([]);
  const [customCode, setCustomCode] = useState('');
  const [isCodeSaved, setIsCodeSaved] = useState(false);
  //classStudent states

  console.log(classCode);

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
      setCustomCode('');
    }
  };

  const handleClassCodeSaved = () => {
    setIsCodeSaved(true); // Update the state variable when the class code is saved
    setClassType(''); // Reset the classType to clear the list
    setClassCode([]); // Clear the classCode list
  };
  

  return (
    <div>
      <h1 className="lesson-plans-title">Teacher Lesson Plans</h1>
      <p>This is where teachers can create lesson plans.</p>
      <p>And probably other stuff...</p>
      <form className="create-classes-form">
        <label htmlFor="classType-input">Number of Questions:</label>
        <div className="input-container">
          <select id="classType-input" value={classType} onChange={handleClassTypeChange}>
            <option value="">Select a class type</option>
            <option value="language_arts">Language Arts</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
            <option value="social_studies">Social Studies</option>
          </select>
        </div>
      </form>
      {classType && (
        <>
          <GetExistClassCode classType={classType} onItemClick={handleItemClick} />
          {!isCodeSaved && classCode.length > 0 && ( // Render the classCode list only if it's not saved and classCode has items
            <div>
              <h3>Selected Classes:</h3>
              <ul>
                {classCode.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <input type="text" value={customCode} onChange={handleCustomCodeChange} />
            <AddNewClassCodeButton
              classType={classType}
              customCode={customCode}
              text="Add New Code"
              onCustomCodeSubmit={handleCustomCodeSubmit}
            />
          </div>
          {!isCodeSaved && ( // Render the SubmitButton component only if code is not saved
            <SubmitButton classCode={classCode} onClassCodeSaved={handleClassCodeSaved} />
          )}
        </>
      )}
    </div>
  );
};

export default CreateClasses;
