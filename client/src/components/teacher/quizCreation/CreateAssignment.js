import React, { useState, useEffect, useCallback } from "react";
import TeacherDashNav from "../TeacherDashNav";
import usePersistQuery from "../../../hooks/usePersistQuery";
import TextareaAutosize from "react-textarea-autosize";
import { formatQuestions } from "../../../utils/questionUtils";
import QuestionForm from "./QuestionForm.js";
import GetTeacherClasses from "../../teacher/GetTeacherClasses.js";
import { generateAssignmentQueryStructure } from "../../../query-constants/structuredGPTQuerys.js";

const CreateAssignment = () => {
  const [quizQuestions, setQuizQuestions] = useState("");
  const { responseData, handleQueryGPT } = usePersistQuery();

  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("multiple choice");
  const [formattedQuestions, setFormattedQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [teacherClasses, setTeacherClasses] = useState([]);
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const [selectedDimensionSEP, setSelectedDimensionSEP] = useState("");
  const [selectedDimensionCCC, setSelectedDimensionCCC] = useState("");
  const [selectedDimensionDCI, setSelectedDimensionDCI] = useState("");
  const [selectedQuestionBoundary, setSelectedQuestionBoundary] = useState("");
  const [selectedBoundaryTopic, setSelectedBoundaryTopic] = useState("");

  const setQuestionsToKeep = () => {
    // This is a dummy function that does nothing
    //except make everything work
  };

  const handleSelectedQuestionBoundaryChange = (e) => {
    const value = e.target.value;
    setSelectedQuestionBoundary(value);
    console.log("sqb", selectedQuestionBoundary);
  };

  const handleSelectedBoundaryTopicChange = (e) => {
    const value = e.target.value;
    setSelectedBoundaryTopic(value);
    console.log("sbt", selectedBoundaryTopic);
  };

  const handleNumOfQuestionsChange = (e) => {
    const value = e.target.value;
    setNumOfQuestions(value);
  };

  const handleQuestionTypeChange = (e) => {
    const value = e.target.value;
    setQuestionType(value);
    console.log("question type", questionType);
  };

  const handleTeacherClassChange = (teacherClasses) => {
    setTeacherClasses(teacherClasses);
  };

  const handleClassCodeChange = (e) => {
    const value = e.target.value;
    setSelectedClassCode(value);
    console.log("class code", selectedClassCode);
  };

  const scienceAndEngineeringPracticesArray = [
    "Asking questions",
    "Developing and using models",
    "Planning and carrying out investigations",
    "Analyzing and interpreting data",
    "Constructing explanations",
    "Engaging in argument from evidence",
    "Obtaining, evaluating, and communicating information",
  ];



  const questionBoundary = ["Patterns in the Periodic Table", "something else"];

  const boundaryTopic = [
    "Trends in atomic radius",
    "Trends in ionization energy",
    "Trends in electronegativity",
    "Trends in reactivity",
    "Valence Electrons and Chemical Properties",
    "Determining the number of valence electrons for an element",
    "Explaining how the number of valence electrons influences chemical bonding",
    "Predicting the reactivity of elements based on their valence electron configuration",
    "Electron Configuration and the Periodic Table",
    "Understanding the arrangement of electrons in energy levels and sublevels",
    "Identifying the electron configuration of elements using the periodic table",
    "Relating electron configuration to an element's position in the periodic table",
    "Relationships between Electron Arrangement and Element Properties",
    "Explaining the relationship between electron arrangement and atomic size",
    "Describing how electron arrangement affects ion formation",
    "Relating electron configuration to the chemical behavior of elements",
    "Using the Periodic Table to Predict Properties",
    "Using the periodic table to predict the properties of elements (e.g., reactivity, electronegativity, atomic radius)",
    "Comparing and contrasting the properties of elements within groups and periods of the periodic table",
    "Analyzing the periodic trends of properties based on the arrangement of elements in the periodic table",
  ];

  const crosscuttingConceptsArray = [
    "Patterns",
    "Cause and effect",
    "Scale, proportion, and quantity",
    "Systems and system models",
    "Energy and matter",
    "Structure and function",
    "Stability and change",
  ];

  const coreIdeas = [
    "Key ideas in physical sciences",
    "Key ideas in life sciences",
    "Key ideas in earth and space sciences",
    "Key ideas in engineering, technology, and applications of science",
  ];

  const handleSelectedDimensionSEPChange = (e) => {
    const value = e.target.value;
    setSelectedDimensionSEP(value);
    console.log("sep", selectedDimensionSEP);
  };

  const handleSelectedDimenstionCCCChange = (e) => {
    const value = e.target.value;
    setSelectedDimensionCCC(value);
    console.log("ccc", selectedDimensionCCC);
  };

  const handleSelectedDimenstionDCIChange = (e) => {
    const value = e.target.value;
    setSelectedDimensionDCI(value);
    console.log("dci", selectedDimensionDCI);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!quizQuestions) {
        setErrorMessage("Query cannot be empty");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const selectedNumOfQuestions = numOfQuestions;
      const selectedQuestionType = questionType;
      const classCode = selectedClassCode;

      const updatedQuizQuestions = generateAssignmentQueryStructure(
        selectedNumOfQuestions,
        classCode,
        selectedQuestionBoundary,
        selectedBoundaryTopic
      );

      handleQueryGPT({ prompt: updatedQuizQuestions });
      setShowQuestionForm(true);
    },
    [numOfQuestions, questionType, quizQuestions, handleQueryGPT]
  );

  useEffect(() => {
    if (responseData && responseData.reply) {
      const formattedQuestions = formatQuestions(
        responseData.reply
        //questionType
      );
      setFormattedQuestions(formattedQuestions);
    }
  }, [responseData]);

  return (
    <div className="teacher-lesson-plans-container">
      {!showQuestionForm && (
        <>
          <TeacherDashNav />
          <h1 className="lesson-plans-title">Teacher Lesson Plans</h1>
          <p>This is where teachers can create lesson plans.</p>
          <p>And probably other stuff...</p>
          <form className="gpt-form" onSubmit={handleSubmit}>
            <div>
              <GetTeacherClasses
                onTeacherClassChange={handleTeacherClassChange}
              />

              <label htmlFor="classType-input">Choose the class code</label>
              <div>
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
            </div>
            <div>
              <GetTeacherClasses
                onTeacherClassChange={handleTeacherClassChange}
              />
              <label htmlFor="classType-input">THIS IS THE NEXT THING</label>
              <div>
                <label htmlFor="questionBoundary-input">Question Scope</label>
                <div>
                  <br></br>
                  <h6>Question boundary</h6>
                  <select
                    id="questionBoundary-input"
                    value={selectedQuestionBoundary}
                    onChange={handleSelectedQuestionBoundaryChange}
                  >
                    <option value="">Question Scope</option>
                    {questionBoundary.map((questBound, index) => (
                      <option key={index} value={questBound}>
                        {questBound}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br></br>
                      <h6>Boundary topic</h6>
                      
              <div>sep
                <select
                  id="boundaryTopic-input"
                  value={selectedBoundaryTopic}
                  onChange={handleSelectedBoundaryTopicChange}
                >
                  <option value="">Boundary topic</option>
                  {boundaryTopic.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
                    <br></br>
                    <h6>SEP</h6>
              <div>
                <select
                  id="SEP-input"
                  value={selectedDimensionSEP}
                  onChange={handleSelectedDimensionSEPChange}
                >
                  <option value="">select</option>
                  {scienceAndEngineeringPracticesArray.map(
                    (practice, index) => (
                      <option key={index} value={practice}>
                        {practice}
                      </option>
                    )
                  )}
                </select>
              </div>
              <br></br>
              <h6>DCI</h6>

              <div>
                <select
                  id="DCI-input"
                  value={selectedDimensionDCI}
                  onChange={handleSelectedDimenstionDCIChange}
                >
                  <option value="">select</option>
                  {coreIdeas.map((core, index) => (
                    <option key={index} value={core}>
                      {core}
                    </option>
                  ))}
                </select>
              </div>
              <br></br>
              <h6>CCC</h6>

              <div>
                <select
                  id="CCC-input"
                  value={selectedDimensionCCC}
                  onChange={handleSelectedDimenstionCCCChange}
                >
                  <option value="">select</option>
                  {crosscuttingConceptsArray.map((concepts, index) => (
                    <option key={index} value={concepts}>
                      {concepts}
                    </option>
                  ))}
                </select>
              </div>
          
            </div>
            <label htmlFor="numOfQuestions-input">Number of Questions:</label>
            <div className="input-container">
              <select
                id="numOfQuestions-input"
                value={numOfQuestions}
                onChange={handleNumOfQuestionsChange}
              >
                {Array.from({ length: 50 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="questionType-input">Question Type:</label>
            <div className="input-container">
              <select
                id="questionType-input"
                value={questionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="multiple choice">Multiple Choice</option>
                <option value="true false">True or False</option>
                <option value="short answer">Short Answer</option>
                <option value="American college testing long form response">ACT form</option>
                <option value="fill in the blank">Fill in the Blank</option>
              </select>
            </div>

            <label htmlFor="quizQuestions-input">
              Create Tests or Assignments:
            </label>
            {/* TODO: Fix the issue with this re-rendering on every character input */}
            <div className="input-container">
              <TextareaAutosize
                placeholder="Generate Lesson Plan"
                id="quizQuestions-input"
                value={quizQuestions}
                onChange={(e) => setQuizQuestions(e.target.value)}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </>
      )}
      {showQuestionForm && (
        <QuestionForm
          questions={formattedQuestions}
          setFormattedQuestions={setFormattedQuestions}
          setQuestionsToKeep={setQuestionsToKeep}
          showCreateAssignment={showCreateAssignment}
          setShowCreateAssignment={setShowCreateAssignment}
        />
      )}
    </div>
  );
};

export default CreateAssignment;
